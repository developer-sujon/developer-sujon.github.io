---
title: "Hisabnikash — Multi-Store Inventory & Installment Accounting SaaS"
slug: "hisabnikash"
tagline: "Online inventory management software providing multi-store stock tracking, customer installment ledgers, automated SMS alerts, and double-entry accounting"
company: "Shunno IT"
kicker: "Enterprise Inventory SaaS & FinTech Ledger · Shunno IT"
role: "Junior Software Engineer"
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
liveUrl: "https://hisabnikash.biz"
---

## 📌 Executive Summary

**Hisabnikash** ([https://hisabnikash.biz](https://hisabnikash.biz) / [http://hisabnikashbd.com](http://hisabnikashbd.com)) is an enterprise-grade cloud inventory management and retail accounting SaaS platform engineered at **Shunno IT**. It powers retail businesses, electronic appliance showrooms, and multi-branch distributors across Bangladesh.

The platform provides end-to-end retail operations—including real-time multi-branch stock tracking, barcode/POS checkout, customer installment (**কিস্তি / EMI**) repayment schedules with automated SMS alerts, supplier purchase orders, and double-entry financial reporting.

---

## 🏗️ System Architecture & Data Flow

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              HISABNIKASH SYSTEM ARCHITECTURE                           │
│                                                                                        │
│   [Cashier POS / Barcode Scanner]       [Store Admin / Web App]       [Customer]       │
│                │                                   │                       ▲           │
│                ▼                                   ▼                       │           │
│   ┌────────────────────────────────────────────────────────┐               │           │
│   │               Nginx Reverse Proxy & SSL                │               │           │
│   └──────────────────────────┬─────────────────────────────┘               │           │
│                              ▼                                             │           │
│   ┌────────────────────────────────────────────────────────┐               │           │
│   │              Nest.js Modular API Gateway               │               │           │
│   │   • Auth & Tenant Isolation (JWT, Store Context)       │               │           │
│   │   • Validation Pipes & DTO Transformation              │               │           │
│   └──────┬───────────────────┬───────────────────┬─────────┘               │           │
│          │                   │                   │                         │           │
│          ▼                   ▼                   ▼                         │           │
│   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐                │           │
│   │ POS & Sales   │   │ Inventory &   │   │ Installment & │                │           │
│   │ Module        │   │ Warehouse     │   │ EMI Engine    │                │           │
│   │ • Atomic Lock │   │ • Multi-Store │   │ • Schedules   │                │           │
│   │ • POS Invoices│   │ • Transfer In │   │ • Dues Matrix │                │           │
│   └──────┬────────┘   └──────┬────────┘   └──────┬────────┘                │           │
│          │                   │                   │                         │           │
│          ▼                   ▼                   ▼                         │           │
│   ┌────────────────────────────────────────────────────────┐               │           │
│   │       Double-Entry Financial Accounting Ledger         │               │           │
│   │       (Debit/Credit: Cash, Accounts Receivable, Sales) │               │           │
│   └──────────────────────────┬─────────────────────────────┘               │           │
│                              │                                             │           │
│              ┌───────────────┴───────────────┐                             │           │
│              ▼                               ▼                             │           │
│   ┌───────────────────────┐      ┌───────────────────────┐                 │           │
│   │ PostgreSQL / MongoDB  │      │ Redis + BullMQ Queue  │                 │           │
│   │ • ACID Transactions   │      │ • Midnight Due Cron   ├────► [SMS Gate]─┘           │
│   │ • Row-level Locking   │      │ • Stock Counter Cache │      (On-Net SMS)           │
│   └───────────────────────┘      └───────────────────────┘                             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Preventing Concurrent Stock Overselling (POS Race Conditions)
* **The Problem:** In high-volume retail stores, multiple cashiers sell limited inventory (e.g., clearance items or single-unit appliances) simultaneously. Standard uncoordinated `UPDATE stock = stock - qty` queries caused race conditions, leading to negative inventory and severe ledger mismatches.
* **The Solution:**
  * Implemented **Pessimistic Row-Level Locking** using PostgreSQL `SELECT ... FOR UPDATE` wrapped within strict database transactions.
  * During POS barcode scan and checkout confirmation, the inventory record for that SKU and store branch is locked exclusively for milliseconds during stock validation and invoice creation.
  * Combined with **Redis atomic counters (`DECRBY`)** for pre-checkout validation, ensuring zero oversold items under concurrent checkouts with sub-150ms total response time.

### 2. Customer Installment (কিস্তি / EMI) Engine & Automated Debt Collection
* **The Problem:** Many retail merchants in Bangladesh sell high-ticket goods (electronics, mobile phones, furniture) on monthly or weekly installment plans. Calculating dynamic aging receivables, handling irregular partial repayments, and tracking overdue penalties manually resulted in massive merchant revenue leakage.
* **The Solution:**
  * Engineered a deterministic **Amortization Ledger Engine** inside Nest.js.
  * When an installment sale is finalized, the system automatically builds an immutable schedule table tracking principal dues, interest components, and due dates.
  * Supported **FIFO partial payment allocation**: if a customer pays BDT 3,500 against an overdue schedule of BDT 5,000, the system automatically allocates the funds to the oldest overdue invoice first and re-calculates subsequent penalty balances.

### 3. Asynchronous SMS Due-Alert Dispatcher via Redis & BullMQ
* **The Problem:** Dispatching thousands of SMS payment reminders synchronously via telco HTTP APIs during store opening hours blocked backend threads and caused timeout failures.
* **The Solution:**
  * Implemented scheduled cron workers using `@nestjs/schedule` that execute daily at 00:00.
  * Scans upcoming installments across three horizons: **Upcoming (T-3 Days)**, **Due Today (T-0)**, and **Overdue (T+1)**.
  * Pushes individualized notification jobs to a **BullMQ Redis Queue** with rate-limiting, exponential backoff retries, and delivery tracking.
  * Slashed customer payment default rates by over **35%** for participating merchants.

### 4. Multi-Store Warehouse Transfers & In-Transit Inventory
* **The Problem:** Moving merchandise from a central warehouse in Dhaka to branch showrooms in Rajshahi or Khulna required tracking stock in transit without distorting store availability or financial valuation.
* **The Solution:**
  * Created a strict 3-state state machine: `TRANSFER_REQUESTED` -> `IN_TRANSIT` -> `RECEIVED_AND_VERIFIED`.
  * While `IN_TRANSIT`, stock is deducted from the source store and placed into a virtual *In-Transit Transit Ledger*, preventing either store from selling items until the receiving warehouse manager scans the physical barcodes.

### 5. Double-Entry Accounting Ledger
* **The Problem:** Simple income/expense trackers fail tax audits and cannot reliably represent accounts receivable or inventory depreciation.
* **The Solution:**
  * Implemented double-entry journal bookkeeping principles. Every sale creates equal debit and credit journal entries:
    * *Debit:* Cash / Bank / Customer Receivables (Asset).
    * *Credit:* Sales Revenue, Output Tax (Liability), and Cost of Goods Sold vs Inventory Asset.
  * Enabled real-time balance sheet, trial balance, and profit/loss statement generation with zero reconciliation discrepancies.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Backend Framework** | **Nest.js (Node.js & TypeScript)** | Modular domain architecture, clean dependency injection, built-in validation pipes, and enterprise maintainability. |
| **Frontend SPA** | **React 18 & Vite** | High-speed POS interface, thermal receipt printing integration, and instant client-side barcode lookup. |
| **Databases** | **PostgreSQL & MongoDB** | PostgreSQL for ACID financial transactions and relational inventory ledgers; MongoDB for flexible audit logs and activity history. |
| **Cache & Task Queue** | **Redis & BullMQ** | Fast distributed locking, pre-checkout stock cache, and resilient background SMS queueing. |
| **DevOps & Hosting** | **Docker & Linux VPS** | Containerized deployment with Nginx reverse proxy, SSL termination, and PM2 cluster process management. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **Why NestJS over plain Express for Hisabnikash?**
   * *Answer:* For enterprise SaaS with complex business logic (installments, multi-store stock, tax, double-entry ledgers), Express leads to spaghetti controllers. NestJS provides strict module boundaries (`InventoryModule`, `InstallmentModule`, `AccountingModule`), clean dependency injection, and testable domain services.
2. **How are POS race conditions handled when multiple terminals sell the last item?**
   * *Answer:* By using PostgreSQL pessimistic row locking (`SELECT stock FROM store_inventory WHERE sku = :id AND store_id = :storeId FOR UPDATE`). This blocks competing transactions until the active sale commits, preventing double-sell phenomena completely.
3. **How does the installment debt allocation work with partial payments?**
   * *Answer:* An automated FIFO waterfall engine applies partial payments to the oldest open installment record first, updating remaining principal and adjusting overdue status in a single atomic database transaction.
