---
title: "Torongo Pay — Resilient Payment Orchestration & Transaction Monorepo"
slug: "torongo-pay"
tagline: "Scalable multi-provider payment gateway aggregator with cryptographic webhook signature verification and idempotent reconciliation"
company: "Yupsis"
kicker: "FinTech & Payment Orchestration · Yupsis"
role: "Backend & Systems Architect"
period: "2023 – 2024"
status: "Production"
featured: false
badge: "FinTech"
metrics:
  - label: "Success Rate"
    value: "99.98%"
    sub: "Idempotent payment routing"
  - label: "Reconciliation"
    value: "Automated"
    sub: "Instant webhook callbacks"
tags:
  - "Node.js"
  - "TypeScript"
  - "PostgreSQL"
  - "Drizzle ORM"
  - "Turborepo"
  - "Webhooks"
---

## 📌 Executive Summary

**Torongo Pay** is a unified payment gateway orchestration service engineered to abstract multiple payment aggregators (cards, mobile financial services, local MFS) behind a single idempotent API interface.

---

## 🔒 Engineering Highlights

* **Idempotency & Double-Charge Prevention:** Cryptographic request hashing prevents concurrent double deductions during network retries or flaky mobile data.
* **Webhook Hardening:** Signature verification, payload normalization, and persistent dead-letter queue auditing for failed merchant notifications.
