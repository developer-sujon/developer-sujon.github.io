---
title: "Shunno Pay — Webhook-Based Payment Gateway SaaS"
slug: "shunno-pay"
tagline: "High-concurrency webhook-based payment orchestration gateway facilitating automated settlements, HMAC signatures, and merchant callbacks"
company: "Shunno IT"
kicker: "FinTech & Payment Orchestration · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production (Internal)"
featured: false
badge: "Internal Platform"
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

## Overview

**Shunno Pay** is a high-reliability, webhook-based payment orchestration gateway engineered at **Shunno IT**. It serves as the financial payment backbone connecting downstream consumer platforms (including Shunno IT SaaS products, affiliated e-commerce merchants, and billing systems) with upstream mobile financial services (bKash, Nagad) and banking rails.

The core engineering objective was to build an ultra-reliable payment settlement engine capable of verifying and ingesting asynchronous payment webhooks, eliminating transaction race conditions, enforcing double-entry ledger bookkeeping, and dispatching signed merchant callbacks with zero dropped events.

---

## Architectural Principles & Payment Pipeline

The gateway operates on a zero-trust, asynchronous settlement pipeline:

* **Timing-Safe Signature Verification:** Inbound HTTP webhook payloads are validated against raw byte buffers using HMAC SHA-256 with timing-safe comparison, preventing forged payment callbacks.
* **Distributed Idempotency Barrier:** Transactions are guarded by dual-layer idempotency tokens in Redis and PostgreSQL, ensuring duplicate provider retries never double-credit customer balances.
* **ACID Double-Entry Ledger:** All financial movements execute within interactive Prisma transactions (`$transaction`), updating merchant wallets and transaction journals in an atomic commit.
* **Resilient Outbound Callbacks:** Downstream merchant notifications are queued with exponential backoff schedules and Dead-Letter Queue (DLQ) failover.

---

## Key Engineering Challenges & Solutions

### 1. Cryptographic HMAC Signature Verification on Raw Payloads
* **Challenge:** Upstream payment providers transmit a signature in the HTTP header computed over the raw request body. If standard body-parsing middleware (`express.json()`) normalizes JSON keys or alters whitespace before verification, signature checks fail unpredictably.
* **Solution:**
  * Configured Express to preserve the unparsed raw binary buffer on the request object (`req.rawBody`).
  * Executed `crypto.createHmac('sha256', secret).update(req.rawBody).digest('hex')` using timing-safe comparison (`crypto.timingSafeEqual`) to eliminate timing-attack vulnerabilities.
  * Webhook validation completes in **< 18ms**, allowing the gateway to respond with HTTP 200 immediately to prevent provider webhook retries.

### 2. Preventing Double-Credit Exploits (Distributed Idempotency)
* **Challenge:** Mobile financial providers frequently retry webhooks when network latency occurs. If unhandled, double-crediting occurs, allowing users to receive twice the purchased credits or subscription duration.
* **Solution:**
  * Enforced a dual-layer idempotency barrier:
    * *Layer 1 (Fast In-Memory):* Stored transaction tokens (`trxId`) in **Redis** with an atomic `SET NX EX 86400` lock. Duplicate webhooks arriving within milliseconds are immediately acknowledged and discarded.
    * *Layer 2 (Relational ACID):* Declared a strict unique constraint on `transactions.provider_trx_id` in PostgreSQL. Any duplicate insertion attempt that bypasses Redis is caught by database unique violation errors and safely rolled back.

### 3. Double-Entry Accounting Ledger with Prisma ORM
* **Challenge:** Modifying a simple `merchant_balance` column directly via `balance = balance + amount` creates irrecoverable accounting discrepancies if database crashes occur midway or if audit reconciliation is required.
* **Solution:**
  * Modeled an immutable double-entry journal system using Prisma:
    * Every transaction generates matching debit and credit entries inside an interactive `prisma.$transaction()` block.
    * *Debit:* Bank Clearing Account (Asset increase).
    * *Credit:* Merchant Wallet (Liability increase) + Gateway Fee (Revenue).
  * Balances are dynamically verifiable by summing journal line items, guaranteeing 100% mathematical auditability.

### 4. Resilient Merchant Callbacks with Dead-Letter Queue
* **Challenge:** When downstream merchant servers go offline or experience brief downtime, webhook notifications fail. Without automated retries, merchant databases remain un-notified, leaving orders in "pending" status.
* **Solution:**
  * Pushed outbound merchant notifications to an isolated **BullMQ Queue**.
  * Configured exponential backoff retry schedules (10s, 30s, 2m, 10m, 1h) with a maximum of 5 attempts.
  * Failed notifications after 5 attempts automatically transition to a **Dead-Letter Queue (DLQ)** with manual operator re-trigger capability, achieving a **99.7% delivery success rate**.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Gateway Service** | Express.js, Node.js | Lightweight, high-throughput event-loop performance for raw webhook streaming and crypto verification. |
| **ORM & Database** | Prisma ORM, PostgreSQL | Type-safe database queries, atomic interactive transactions (`$transaction`), and relational constraints. |
| **Queue & Caching** | Redis, BullMQ | Sub-2ms distributed idempotency locks, resilient retry queues, and dead-letter queue isolation. |
| **Security Layer** | Node.js Crypto (HMAC SHA-256) | Timing-safe cryptographic signature validation and webhook integrity protection. |
| **Deployment** | Docker, Linux VPS, Nginx, PM2 | Containerized microservice running behind Nginx with SSL termination and PM2 monitoring. |

---

## Measurable Production Impact

* **< 18ms Ingestion:** Rapid webhook response eliminating provider retry loops.
* **Zero Financial Drift:** 100% double-entry audit accuracy across merchant balances.
* **99.7% Callback Delivery:** Automated retries and DLQ failover preventing lost payment notifications.
