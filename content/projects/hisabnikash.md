---
title: "Hisabnikash — Multi-Store Inventory & Installment Accounting SaaS"
slug: "hisabnikash"
tagline: "Online inventory management software providing multi-store stock tracking, customer installment ledgers, and automated SMS alerts"
company: "Shunno IT"
kicker: "Inventory SaaS & Accounting · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Inventory SaaS"
metrics:
  - label: "Store Ledgers"
    value: "Multi-Store"
    sub: "Real-time stock sync"
  - label: "Installments"
    value: "Automated"
    sub: "SMS & due tracking"
tags:
  - "Nest.js"
  - "React"
  - "Node.js"
  - "PostgreSQL"
  - "MongoDB"
  - "Redis"
  - "SMS Gateway"
liveUrl: "https://hisabnikash.biz"
---

## 📌 Executive Summary

**Hisabnikash** (`https://hisabnikash.biz`) is an enterprise-grade cloud inventory and retail accounting SaaS platform engineered at **Shunno IT**. It provides end-to-end retail operations management—including real-time multi-branch stock replenishment, customer installment tracking with automated reminder SMS gateways, barcode scanning, and double-entry financial reporting.

---

## ⚙️ Key Technical Implementations

* **Nest.js Backend & Clean Architecture:** Built a modular NestJS API supporting multi-tenant tenant isolation, role-based access control (RBAC), and transactional stock balance recalculation.
* **Customer Installment Engine:** Designed scheduled background tasks with Redis to compute daily aging accounts receivable, trigger automated installment due alerts via SMS, and calculate overdue penalties.
* **Real-time Inventory Ledger:** Prevented concurrent overselling across multiple sales registers using atomic database locks and Redis caching.
