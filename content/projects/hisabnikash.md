---
title: "Hisabnikash — Multi-Store Inventory & Installment Accounting"
slug: "hisabnikash"
tagline: "Cloud inventory and accounting software with multi-branch stock tracking, customer installment ledgers, automated SMS alerts, and double-entry bookkeeping"
company: "Shunno IT"
kicker: "Enterprise Inventory SaaS & FinTech Ledger · Shunno IT"
role: "Lead Full-Stack Architect & Core Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Inventory & POS SaaS"
metrics:
  - label: "Architecture"
    value: "Modular NestJS"
    sub: "Domain-driven backend modules"
  - label: "Accounting"
    value: "Double-Entry"
    sub: "Balanced debit and credit journal"
  - label: "Inventory Sync"
    value: "Multi-Store"
    sub: "Warehouse and branch tracking"
  - label: "Due Alerts"
    value: "Automated SMS"
    sub: "Daily BullMQ cron reminders"
tags:
  - "Nest.js"
  - "React"
  - "TypeScript"
  - "Node.js"
  - "MongoDB"
  - "Mongoose"
  - "Redis"
  - "BullMQ"
  - "SMS Gateway"
  - "Docker"
liveUrl: "http://hisabnikashbd.com"
---

## Overview

**Hisabnikash** ([http://hisabnikashbd.com](http://hisabnikashbd.com)) is a cloud inventory management and retail accounting platform built at **Shunno IT**. It is actively used by electronics distributors, retail chains, and commercial showrooms across Bangladesh to manage daily sales, stock movement, and customer credit.

At **Shunno IT**, I led the full-stack architecture and development of the platform. I designed the modular NestJS backend, built the double-entry accounting schema, implemented multi-branch inventory tracking, created the customer installment (**কিস্তি / EMI**) calculation engine, and integrated automated SMS reminders for overdue payments.

---

## Core System Architecture

Retail inventory and financial ledgers require high data accuracy so that stock levels and cash balances never drift:

* **Modular Domain Architecture (NestJS):** The backend is cleanly structured into independent domain modules (`Inventory`, `Sales`, `Installments`, `Ledger`, and `Notifications`). This makes adding new features or adjusting business rules straightforward without breaking existing logic.
* **Double-Entry Financial Ledger:** Every business event—such as a cash sale, a partial down-payment, supplier purchases, or customer returns—creates balanced debit and credit entries in the database. This gives business owners audit-proof financial statements.
* **Multi-Branch Inventory Sync:** Central warehouses track stock distributed across regional branch stores. The system supports barcode lookups, stock transfer slips between branches, and low-stock alerts.
* **Asynchronous Alert Pipelines:** Daily background cron jobs identify upcoming and overdue customer installments, automatically queuing personalized SMS reminders through local telco gateways.

---

## Practical Engineering Challenges & Solutions

### 1. Accurate Multi-Branch Stock Tracking
* **Problem:** In busy retail stores, two cashiers at different branches could sell the same item or product variant simultaneously if stock updates are delayed, leading to negative stock counts.
* **Solution:**
  * Used MongoDB multi-document session transactions with atomic `$inc` checks on checkout.
  * Stock updates and cashier receipts commit together atomically. If an item runs out of stock mid-transaction, the cashier interface informs the user immediately instead of creating inventory errors.

### 2. Flexible Customer Installment (EMI) Scheduling
* **Problem:** Retailers selling electronics (refrigerators, smartphones, televisions) often sell products on weekly or monthly installments. Customers have custom payment schedules, partial down payments, late fees, and interest calculations that standard invoice tools cannot handle.
* **Solution:**
  * Built a dedicated installment engine that calculates amortization schedules upon sale.
  * Supported custom installment intervals (weekly, bi-weekly, or monthly).
  * Automatically matched incoming payments against the oldest outstanding installments and recalculated remaining principal in real time.

### 3. Automated SMS Reminders for Outstanding Dues
* **Problem:** Sending SMS reminders manually to hundreds of installment customers every morning took store managers hours of tedious phone work.
* **Solution:**
  * Set up a daily midnight cron job using **BullMQ** and **Redis**.
  * The worker identifies accounts with installments due within 48 hours or overdue balances, formats personalized SMS text with remaining amounts, and dispatches them via local telco SMS APIs with automatic retries.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Backend** | NestJS, TypeScript, Node.js | Modular business logic, REST APIs, and auth middleware. |
| **Database** | MongoDB, Mongoose | Double-entry journal ledgers, sales receipts, customer records, and product catalogs. |
| **Background Jobs** | BullMQ, Redis | Scheduled installment checks, automated SMS dispatches, and reports. |
| **Frontend** | React, Tailwind CSS | Fast point-of-sale (POS) cashier interface and admin dashboards. |
| **DevOps** | Docker, Linux VPS, Nginx | Containerized microservices, reverse proxying, and SSL setup. |

---

## Key Results

* **Complete Inventory Visibility:** Business owners track stock across multiple physical locations without manual end-of-day counts.
* **Audit-Proof Accounting:** Double-entry journal entries ensure financial reports always match real bank and cash drawer amounts.
* **Improved Cash Collection:** Automated SMS alerts helped merchants collect installment dues on time without manual phone calls.
