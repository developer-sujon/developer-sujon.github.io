---
title: "NetFee — Enterprise ISP Billing SaaS & MikroTik Bandwidth Engine"
slug: "netfee"
tagline: "Automated internet service provider billing platform with real-time MikroTik RouterOS provisioning, automated disconnects, and payment gateway integration"
company: "Shunno IT"
kicker: "ISP SaaS & Network Automation · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "ISP SaaS"
metrics:
  - label: "Provisioning Latency"
    value: "< 1.2s"
    sub: "MikroTik RouterOS API sync"
  - label: "Billing Automation"
    value: "100%"
    sub: "Auto disconnect & recharge"
  - label: "System Uptime"
    value: "99.9%"
    sub: "High-availability Linux VPS"
  - label: "SMS Reliability"
    value: "99.5%"
    sub: "BullMQ queue with auto-retry"
tags:
  - "Nest.js"
  - "React"
  - "Node.js"
  - "PostgreSQL"
  - "MikroTik RouterOS API"
  - "Redis"
  - "BullMQ"
  - "Socket.io"
  - "SMS Gateway"
  - "Docker"
liveUrl: "https://netfeebd.com"
---

## Overview

**NetFee** ([https://netfeebd.com](https://netfeebd.com)) is a mission-critical, multi-tenant ISP billing and network subscriber management SaaS platform engineered at **Shunno IT**. It automates daily operations for hundreds of broadband internet service providers (ISPs) across Bangladesh.

The platform bridges commercial subscription billing with physical network edge routers. It orchestrates customer subscription lifecycles, self-service online payments via mobile wallets (bKash, Nagad), instant bandwidth throttle/unthrottle triggers, MAC reseller management, and automated disconnection cron workers directly interfacing with the **MikroTik RouterOS API**.

---

## Architectural Principles & Network Automation

NetFee integrates billing accounting with direct router management:

* **Persistent Socket Connection Pool:** Nest.js maintains monitored TCP socket connections to distributed MikroTik routers, executing commands in sub-1.2 seconds without exhausting router CPU.
* **Subscription State Machine:** Subscribers transition automatically through deterministic states (`ACTIVE` -> `EXPIRED` -> `GRACE_PERIOD` -> `DISABLED`), triggering corresponding router queue and firewall rule adjustments.
* **Multi-Tier Reseller Accounting:** Sub-resellers and distributor partners operate through isolated prepaid virtual wallets, preventing unauthorized bandwidth leasing and enforcing credit limits.
* **Automated Customer Alert Lifecycle:** Scheduled BullMQ background workers dispatch staged SMS reminders prior to expiration and immediately upon payment confirmation.

---

## Key Engineering Challenges & Solutions

### 1. High-Concurrency MikroTik RouterOS Socket Management
* **Challenge:** ISPs manage fleets of MikroTik routers (CCR, RB series) located across distributed geographic nodes. Sending uncoordinated synchronous API commands during morning billing bursts caused connection pool exhaustion, socket timeouts, and router CPU spikes.
* **Solution:**
  * Developed a persistent **MikroTik Socket Connection Pool** inside Nest.js with heartbeat health checks.
  * Packaged commands into an asynchronous **BullMQ Redis Queue**: when a payment is confirmed, an API task is enqueued with rate-limiting (maximum 15 concurrent socket operations per physical router).
  * Reduced router command execution latency to **< 1.2 seconds** while eliminating router CPU overload risks.

### 2. Instant Automated Reconnection & Disconnection Automation
* **Challenge:** When a subscriber pays their monthly invoice at late night via bKash or Nagad, they expect instant internet reactivation without waiting for human operator intervention. Non-paying users must also be isolated precisely at midnight without disrupting active paying sessions.
* **Solution:**
  * *Recharge Flow:* Payment gateway webhooks trigger an atomic transaction: marks the invoice paid, advances the subscriber's expiry date by 30 days, and fires a MikroTik command to enable the PPPoE secret (`/ppp/secret/set disabled=no`) and refresh the dynamic firewall address list.
  * *Disconnect Flow:* Scheduled midnight cron workers identify expired accounts and move their IP into a walled-garden captive address list, rerouting HTTP traffic to a payment reminder page.

### 3. Multi-Tier Reseller Accounting & Commission Settlement
* **Challenge:** Large ISPs delegate bandwidth distribution to sub-resellers. Calculating distributor margins, per-subscriber reseller cuts, and preventing resellers from creating users beyond their prepaid credit limit was a major accounting challenge.
* **Solution:**
  * Built an immutable double-entry balance ledger for resellers.
  * Resellers maintain a prepaid virtual wallet: creating or renewing a 10 Mbps subscriber atomically debits the reseller's wallet balance.
  * If the reseller's balance is insufficient, the system rejects user creation, preventing unauthorized bandwidth leasing and financial leakage.

### 4. Resilient Expiration Alarms via Queued SMS Notifications
* **Challenge:** Subscribers frequently blamed ISPs for abrupt disconnects due to missed expiration dates. Sending bulk reminder SMS synchronously to thousands of users on the last day of the month led to gateway timeouts and delivery failures.
* **Solution:**
  * Implemented automated reminder stages: **3 days prior**, **1 day prior**, and **on the day of expiration**.
  * Distributed SMS payloads across scheduled BullMQ workers with telco routing failover, guaranteeing a **99.5% delivery success rate**.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Backend Core** | Nest.js, Node.js, TypeScript | Modular domain services (`RouterOSModule`, `BillingModule`, `PaymentModule`). |
| **Frontend Portal** | React, Tailwind CSS | Real-time subscriber dashboard, billing reports, and reseller management. |
| **Hardware Interface** | MikroTik RouterOS API | Direct TCP binary protocol communication (port 8728) for PPPoE and bandwidth control. |
| **Database & Cache** | PostgreSQL, Redis | PostgreSQL for ACID billing transactions; Redis for session caching and router task queues. |
| **DevOps & Hosting** | Docker, Linux VPS, Nginx, PM2 | High-availability server configuration with automated backups and rolling reloads. |

---

## Measurable Production Impact

* **< 1.2s Provisioning:** Instant router synchronization upon online payment confirmation.
* **100% Billing Automation:** Eliminated manual operator intervention for recharges and disconnections.
* **99.9% System Uptime:** High reliability across hundreds of ISP network deployments.
