---
title: "Shunno Pay — Webhook-Based Payment Gateway SaaS"
slug: "shunno-pay"
tagline: "High-concurrency webhook-based payment orchestration gateway facilitating automated settlements and merchant callbacks"
company: "Shunno IT"
kicker: "FinTech & Webhooks · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Payment SaaS"
metrics:
  - label: "Reconciliation"
    value: "Automated"
    sub: "Instant webhook callbacks"
  - label: "ORM Layer"
    value: "Prisma & PG"
    sub: "ACID transaction ledger"
tags:
  - "Express.js"
  - "PostgreSQL"
  - "Prisma"
  - "Node.js"
  - "Webhooks"
  - "HMAC"
---

## 📌 Executive Summary

**Shunno Pay** is a webhook-based payment orchestration gateway designed at **Shunno IT** to facilitate automatic payments across multiple digital channels and affiliated commercial platforms.

---

## ⚙️ Key Technical Implementations

* **Webhook Processing Engine:** Engineered signature-verified webhook ingestion with Express.js and PostgreSQL to process high-throughput transaction callbacks with zero dropped events.
* **Double-Entry Financial Ledger:** Modeled immutable financial transactions using Prisma ORM with strict foreign-key integrity, ensuring every debit matches an exact credit across merchant balances.
* **Dead-Letter Queue & Retries:** Implemented automated exponential backoff retries for downstream merchant notification webhooks.
