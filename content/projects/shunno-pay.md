---
title: "Shunno Pay — Webhook-Based Payment Gateway SaaS"
slug: "shunno-pay"
tagline: "High-concurrency webhook-based payment orchestration gateway facilitating automated settlements, HMAC signatures, and merchant callbacks"
company: "Shunno IT"
kicker: "FinTech & Payment Orchestration · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Payment SaaS"
metrics:
  - label: "Webhook Ingestion"
    value: "< 18ms"
    sub: "Async HMAC verification"
  - label: "Reconciliation"
    value: "100% Automated"
    sub: "Zero manual intervention"
  - label: "Ledger Accuracy"
    value: "Zero Drift"
    sub: "Prisma ACID transactions"
  - label: "Retry Success"
    value: "99.7%"
    sub: "Exponential backoff DLQ"
tags:
  - "Express.js"
  - "PostgreSQL"
  - "Prisma"
  - "Node.js"
  - "Redis"
  - "BullMQ"
  - "HMAC SHA-256"
  - "Docker"
---

## 📌 Executive Summary

**Shunno Pay** is a high-reliability, webhook-based payment orchestration gateway engineered at **Shunno IT**. It serves as the financial payment backbone connecting downstream consumer platforms (including Shunno IT SaaS products, affiliated e-commerce merchants, and billing systems) with upstream mobile financial services (MFS) and banking rails.

The core engineering objective was to build an ultra-reliable payment settlement engine capable of verifying and ingesting asynchronous payment webhooks, eliminating transaction race conditions, enforcing double-entry ledger bookkeeping, and dispatching signed merchant callbacks with zero dropped events.

---

## 🏗️ System Architecture & Payment Lifecycle

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              SHUNNO PAY SYSTEM ARCHITECTURE                            │
│                                                                                        │
│   [Upstream Bank / MFS Provider] (bKash, Nagad, Analock Mobile)                        │
│                 │                                                                      │
│                 ▼ Inbound Webhook (Raw Payload + HMAC Signature Header)                │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │               Nginx Reverse Proxy & SSL                │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              ▼                                                         │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │          Express.js Webhook Ingestion Gateway          │                           │
│   │   • Raw Body Preservation (Avoid JSON tamper for HMAC) │                           │
│   │   • Cryptographic Signature Verification (HMAC SHA256) │                           │
│   │   • Fast Idempotency Check via Redis (Sub-2ms)         │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              ▼ Enqueue Validated Transaction Payload                   │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │              Redis + BullMQ Transaction Queue          │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              │                                                         │
│                              ▼ Asynchronous Worker Processing                          │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │              Payment Reconciliation Engine             │                           │
│   │   • Prisma ORM Interactive Transaction ($transaction)  │                           │
│   │   • Immutable Ledger Entry: Debit Bank / Credit Merch  │                           │
│   │   • Fee Calculation & Platform Commission Split        │                           │
│   └──────┬─────────────────────────────────────────────────┘                           │
│          │                                                                             │
│          ├─────────────────────────────────────────────────┐                           │
│          ▼ Persist State                                   ▼ Dispatch Callback         │
│   ┌───────────────────────────────┐      ┌──────────────────────────────────┐          │
│   │ PostgreSQL Database           │      │ Outbound Merchant Dispatcher     │          │
│   │ • Unique Transaction Index    │      │ • Sign Callback with Secret      │          │
│   │ • Double-Entry Journal Rows   │      │ • Exponential Backoff Retries    │          │
│   └───────────────────────────────┘      │ • Dead-Letter Queue (DLQ)        │          │
│                                          └─────────────────┬────────────────┘          │
│                                                            │                           │
│                                                            ▼ Signed HTTP POST Callback │
│                                                  [Downstream Merchant]                 │
│                                                  (e.g., NetFee / Hisabnikash)          │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Cryptographic HMAC Signature Verification on Raw Payload
* **The Problem:** Upstream payment providers transmit a signature in the header computed over the raw HTTP request body. If standard body-parsing middleware (`express.json()`) normalizes JSON keys or alters whitespace before verification, signature checks fail unpredictably.
* **The Solution:**
  * Configured Express to preserve the unparsed raw binary buffer on the request object (`req.rawBody`).
  * Executed `crypto.createHmac('sha256', secret).update(req.rawBody).digest('hex')` using timing-safe comparison (`crypto.timingSafeEqual`) to eliminate timing-attack vulnerabilities.
  * Webhook validation completes in **< 18ms**, allowing the gateway to respond with HTTP 200 immediately to prevent provider webhook retries.

### 2. Preventing Double-Credit Exploits (Distributed Idempotency)
* **The Problem:** Network hiccups often cause mobile financial providers to fire duplicate webhooks for a single customer transaction. If unhandled, double-crediting occurs, allowing users to receive twice the purchased credits or subscription duration.
* **The Solution:**
  * Enforced a dual-layer idempotency barrier:
    * *Layer 1 (Fast In-Memory):* Stored transaction tokens (`trxId`) in **Redis** with an atomic `SET NX EX 86400` lock. Duplicate webhooks arriving within milliseconds are immediately acknowledged and discarded.
    * *Layer 2 (Relational ACID):* Declared a strict unique constraint on `transactions.provider_trx_id` in PostgreSQL. Any duplicate insertion attempt that bypasses Redis is caught by database unique violation errors and safely rolled back.

### 3. Double-Entry Accounting Ledger with Prisma ORM
* **The Problem:** Modifying a simple `merchant_balance` column directly via `balance = balance + amount` creates irrecoverable accounting discrepancies if database crashes occur midway or if audit reconciliation is required.
* **The Solution:**
  * Modeled an immutable double-entry journal system using Prisma:
    * Every transaction generates matching debit and credit entries inside an interactive `prisma.$transaction()` block.
    * *Debit:* Bank Clearing Account (Asset increase).
    * *Credit:* Merchant Wallet (Liability increase) + Shunno Pay Gateway Fee (Revenue).
  * Balances are dynamically verifiable by summing journal line items, guaranteeing 100% mathematical auditability.

### 4. Resilient Merchant Callbacks with Exponential Backoff & Dead-Letter Queue
* **The Problem:** When downstream merchant servers go offline or experience brief downtime, webhook notifications fail. Without automated retries, merchant databases remain un-notified, leaving orders in "pending" status.
* **The Solution:**
  * Pushed outbound merchant notifications to an isolated **BullMQ Queue**.
  * Configured exponential backoff retry schedules (10s, 30s, 2m, 10m, 1h) with a maximum of 5 attempts.
  * Failed notifications after 5 attempts are automatically transitioned to a **Dead-Letter Queue (DLQ)** with manual operator re-trigger capability, achieving a **99.7% delivery success rate**.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Gateway Service** | **Express.js & Node.js** | Lightweight, high-throughput event-loop performance ideal for raw HTTP webhook streaming and crypto verification. |
| **ORM & Database** | **Prisma ORM & PostgreSQL** | Type-safe database queries, atomic interactive transactions (`$transaction`), and robust relational constraints. |
| **Queue & Caching** | **Redis & BullMQ** | Sub-2ms distributed idempotency locks, resilient retry queues, and dead-letter queue isolation. |
| **Security Layer** | **Node.js Crypto (HMAC SHA-256)** | Timing-safe cryptographic signature validation and webhook integrity protection. |
| **Deployment** | **Docker & Linux VPS** | Containerized microservice running behind Nginx with SSL termination and PM2 process monitoring. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **Why timing-safe comparison (`crypto.timingSafeEqual`) is essential for webhooks?**
   * *Answer:* Standard string comparison (`a === b`) terminates early upon the first mismatched character. An attacker can measure microsecond differences in server response times to systematically deduce the valid HMAC signature. `timingSafeEqual` always compares every byte, preventing timing-leak vulnerabilities.
2. **How does Prisma ensure ACID integrity during financial settlements?**
   * *Answer:* By executing the payment ledger update inside `prisma.$transaction(async (tx) => { ... })`. If any sub-query fails (e.g., fee calculation or balance validation), all changes roll back to the previous snapshot, guaranteeing zero partial states.
3. **How do you handle merchant webhooks that fail repeatedly?**
   * *Answer:* Exponential backoff prevents overwhelming the recovering merchant server. If retries exhaust, jobs move to a Redis-backed Dead-Letter Queue (DLQ) where engineers can inspect error logs and trigger batch retries once the merchant service is back online.
