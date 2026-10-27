---
title: "Shunno Pay — Webhook-Based Payment Gateway"
slug: "shunno-pay"
tagline: "Webhook-based payment orchestration service connecting mobile financial wallets, automated settlements, and secure merchant callbacks"
company: "Shunno IT"
kicker: "FinTech & Payment Orchestration · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production (Internal)"
featured: false
badge: "Internal Platform"
metrics:
  - label: "Security"
    value: "HMAC SHA-256"
    sub: "Timing-safe raw buffer verification"
  - label: "Transactions"
    value: "Prisma ACID"
    sub: "Atomic wallet & ledger commits"
  - label: "Queue Engine"
    value: "BullMQ"
    sub: "Exponential backoff retries"
  - label: "Payment Rails"
    value: "bKash & Nagad"
    sub: "Automated wallet integrations"
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

**Shunno Pay** is an internal payment gateway and webhook orchestration service built at **Shunno IT**. It serves as the common payment bridge connecting our SaaS platforms (such as NetFee and Hisabnikash) and e-commerce client apps with upstream mobile financial services like **bKash** and **Nagad**.

The primary technical goal was reliability: ensuring incoming payment webhooks are securely verified, duplicate payment notifications never double-credit customer balances, and merchant callbacks are reliably delivered even during downstream server hiccups.

---

## Architecture & How It Works

Handling money transactions requires zero-trust security and atomic database writes:

* **Timing-Safe Signature Verification:** Inbound webhook payloads from payment providers are checked against their raw byte buffers using HMAC SHA-256 with timing-safe comparison to prevent forged callbacks.
* **Idempotency Barriers:** Each transaction has a unique provider reference. If a mobile money provider retries sending a webhook due to a slow internet connection, our system detects the duplicate in Redis/PostgreSQL and ignores the second attempt.
* **Atomic Ledger Updates:** Customer wallet credits and accounting entries run inside interactive Prisma `$transaction` blocks. Either both the customer balance and invoice record update successfully, or the entire transaction rolls back cleanly.
* **Reliable Outbound Callbacks:** Once a payment is confirmed, the notification to the merchant store is queued via **BullMQ** with exponential backoff retries, ensuring the merchant system receives the confirmation even if their server is temporarily restarting.

---

## Practical Engineering Challenges & Solutions

### 1. Accurate HMAC Signature Verification on Raw Payloads
* **Problem:** Payment APIs calculate their security signature over the exact raw body bytes they sent. When standard Express middleware (`express.json()`) parses the body, it changes whitespace and reorders JSON keys, causing signature checks to fail randomly.
* **Solution:**
  * Configured Express body-parser to preserve the unparsed raw binary buffer on the request object (`req.rawBody`).
  * Performed HMAC SHA-256 computation over the raw buffer before any JSON parsing occurred, eliminating signature mismatches.

### 2. Preventing Double-Credit on Webhook Retries
* **Problem:** Mobile money gateways frequently re-send successful transaction webhooks 2 or 3 times if they don't get an immediate response within a few seconds. If processed naively, a user who paid $10 could end up credited with $20 or $30.
* **Solution:**
  * Implemented an idempotency check in Redis using the provider's unique `transactionId`.
  * Checked if the transaction was already processed or currently processing.
  * Safely returned an HTTP 200 to acknowledge the gateway while discarding duplicate processing.

### 3. Graceful Callback Delivery to Merchant Stores
* **Problem:** Sometimes a merchant's store server goes down for 30 seconds for a deployment right when a customer finishes paying. If our webhook callback fails once, the customer's order remains unpaid.
* **Solution:**
  * Used **BullMQ** with an exponential backoff schedule (retrying after 5s, 15s, 1m, 5m, etc.).
  * Provided an admin retry dashboard where operators can manually inspect failed callbacks and re-trigger them with a single click.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Backend API** | Node.js, Express.js | Inbound webhook endpoints and merchant settlement APIs. |
| **Security** | Crypto, HMAC SHA-256 | Timing-safe signature checks on raw byte buffers. |
| **Database** | PostgreSQL, Prisma ORM | Transaction ledgers, merchant accounts, and payment history. |
| **Queues & Cache** | Redis, BullMQ | Idempotency locks and outbound callback retries. |
| **DevOps** | Docker, Nginx | Containerized microservice deployment on Linux VPS. |

---

## Key Results

* **Zero Financial Discrepancies:** Idempotency checks and atomic transactions prevented duplicate credits and ledger drift.
* **Reliable Callbacks:** Exponential backoff queues ensured merchant systems never lost confirmation notifications.
* **Secure Webhooks:** Raw-buffer HMAC validation stopped forged payment requests completely.
