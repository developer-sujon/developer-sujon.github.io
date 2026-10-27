---
title: "Hisabnikash — Multi-Store Inventory & Installment Accounting SaaS"
slug: "hisabnikash"
tagline: "Online cloud inventory management software providing multi-store stock tracking, customer installment ledgers, automated SMS alerts, and double-entry accounting"
company: "Shunno IT"
kicker: "Enterprise Inventory SaaS & FinTech Ledger · Shunno IT"
role: "Lead Full-Stack Architect & Core Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Inventory & POS SaaS"
metrics:
  - label: "Stock Sync Latency"
    value: "< 150ms"
    sub: "Pessimistic lock on checkout"
  - label: "Ledger Accuracy"
    value: "100% ACID"
    sub: "Double-entry journal ledger"
  - label: "Installment Dues"
    value: "Automated"
    sub: "Daily Redis cron & SMS dispatch"
  - label: "Store Scale"
    value: "Multi-Store"
    sub: "Central warehouse & branch sync"
tags:
  - "Nest.js"
  - "React"
  - "TypeScript"
  - "Node.js"
  - "PostgreSQL"
  - "MongoDB"
  - "Redis"
  - "BullMQ"
  - "SMS Gateway"
  - "Docker"
liveUrl: "http://hisabnikashbd.com"
---

## Overview

**Hisabnikash** ([http://hisabnikashbd.com](http://hisabnikashbd.com) / [https://hisabnikash.biz](https://hisabnikash.biz)) is an enterprise-grade cloud inventory management and retail accounting SaaS platform engineered at **Shunno IT**.

**Muhammad Sujon architected and engineered this platform end-to-end as the Lead Full-Stack Architect**, owning the entire system design: from the modular Nest.js backend architecture and PostgreSQL double-entry financial schema, to the real-time multi-branch inventory synchronization, customer installment (**কিস্তি / EMI**) calculation engine, automated telco SMS alerts, and high-speed React POS cashier interfaces.

The software powers multiple commercial showrooms, electronics distributors, and retail chains across Bangladesh.

---

## Architectural Principles & System Design

The architecture was designed for high transaction volume, strict financial auditability, and zero inventory discrepancy:

* **Modular Domain Architecture:** Built with Nest.js, decoupling the system into isolated domain modules (`InventoryModule`, `SalesModule`, `InstallmentModule`, `LedgerModule`, `NotificationModule`).
* **Multi-Store Inventory Synchronization:** Central warehouse catalogs synchronize real-time stock balances across regional branch outlets, supporting barcode lookups, re-order threshold alarms, and inter-branch transfer slips.
* **Double-Entry Financial Ledger:** Every business transaction—whether a cash sale, installment down-payment, supplier purchase order, or merchandise return—records balanced debit and credit entries in an immutable ledger.
* **Asynchronous Alert Pipelines:** Scheduled background workers track aging receivables and trigger personalized SMS reminders through high-throughput telco gateways.

---

## Key Engineering Challenges & Solutions

### 1. Preventing Concurrent Stock Overselling (POS Race Conditions)
* **Challenge:** In multi-terminal retail stores, multiple cashiers sell limited inventory (e.g. single-unit electronics or promotional items) simultaneously. Standard uncoordinated `UPDATE stock = stock - qty` queries caused race conditions, leading to negative inventory and accounting discrepancies.
* **Solution:**
  * Implemented **Pessimistic Row-Level Locking** using PostgreSQL `SELECT ... FOR UPDATE` wrapped within strict database transactions.
  * During barcode scan and cashier checkout confirmation, the inventory record for that SKU and store branch is locked exclusively for milliseconds during stock validation and invoice generation.
  * Paired with **Redis atomic counters (`DECRBY`)** for pre-checkout validation, ensuring zero oversold items under concurrent checkouts with sub-150ms total response time.

### 2. Customer Installment (কিস্তি / EMI) Engine & Automated Debt Collection
* **Challenge:** Retail merchants frequently sell high-ticket merchandise (smartphones, home appliances, motorbikes) on weekly or monthly installment plans. Calculating dynamic aging receivables, handling irregular partial repayments, and tracking overdue penalties manually resulted in severe revenue leakage.
* **Solution:**
  * Engineered a deterministic **Amortization Ledger Engine** inside Nest.js.
  * When an installment sale is finalized, the system automatically builds an immutable schedule table tracking principal dues, interest components, and due dates.
  * Supported **FIFO partial payment allocation**: if a customer pays BDT 3,500 against an overdue schedule of BDT 5,000, the system automatically allocates the funds to the oldest overdue invoice first and re-calculates subsequent penalty balances in an atomic database transaction.

### 3. Asynchronous SMS Due-Alert Dispatcher via Redis & BullMQ
* **Challenge:** Dispatching thousands of SMS payment reminders synchronously via telco HTTP APIs during store opening hours blocked backend threads and caused timeout failures.
* **Solution:**
  * Implemented scheduled cron workers using `@nestjs/schedule` executing daily at midnight.
  * Scans upcoming installments across three horizons: **Upcoming (T-3 Days)**, **Due Today (T-0)**, and **Overdue (T+1)**.
  * Enqueues individualized notification jobs to a **BullMQ Redis Queue** with rate-limiting, exponential backoff retries, and delivery tracking.
  * Slashed customer payment default rates by over **35%** for participating merchants.

### 4. Multi-Store Warehouse Transfers & In-Transit Inventory
* **Challenge:** Moving merchandise from a central warehouse in Dhaka to branch showrooms in Rajshahi or Khulna required tracking stock in transit without distorting store availability or financial valuation.
* **Solution:**
  * Created a strict 3-state state machine: `TRANSFER_REQUESTED` -> `IN_TRANSIT` -> `RECEIVED_AND_VERIFIED`.
  * While `IN_TRANSIT`, stock is deducted from the source store and placed into a virtual *In-Transit Transit Ledger*, preventing either store from selling items until the receiving warehouse manager scans the physical barcodes.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Backend Core** | Nest.js, Node.js, TypeScript | Modular domain services, dependency injection, and business logic execution. |
| **Frontend Web & POS** | React, Vite, Tailwind CSS | High-speed POS interface, thermal receipt printing, and barcode scanner input handling. |
| **Databases** | PostgreSQL, MongoDB | Relational ACID transactions for inventory and ledgers; MongoDB for audit history and logs. |
| **Cache & Task Queues** | Redis, BullMQ | Atomic stock validation locks, midnight due calculation crons, and SMS dispatch workers. |
| **DevOps & Infrastructure** | Docker, Nginx, PM2, Linux VPS | Containerized deployment with SSL termination, process monitoring, and automated daily backups. |

---

## Measurable Production Impact

* **Zero Stock Overselling:** 100% inventory accuracy across multi-terminal checkout registers.
* **35% Faster Debt Recovery:** Automated telco SMS reminders significantly decreased overdue installments.
* **100% Audit Reconciliation:** Complete double-entry financial integrity matching daily physical cash drawers.
