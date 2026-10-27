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

## 📌 Executive Summary

**NetFee** ([https://netfeebd.com](https://netfeebd.com)) is a mission-critical, multi-tenant ISP billing and network subscriber management SaaS platform engineered at **Shunno IT**. It automates daily operations for hundreds of broadband internet service providers (ISPs) across Bangladesh.

The platform bridges commercial subscription billing with network edge routers. It orchestrates customer subscription lifecycles, online self-service payments via mobile wallets (bKash, Nagad), instant bandwidth throttle/unthrottle triggers, MAC reseller management, and automated disconnection cron workers directly interfacing with **MikroTik RouterOS API**.

---

## 🏗️ System Architecture & Edge Provisioning Flow

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 NETFEE SYSTEM ARCHITECTURE                             │
│                                                                                        │
│   [Broadband Subscriber]               [ISP Admin / Sub-Reseller]                      │
│            │                                       │                                   │
│            ▼ (Recharge Request / Portal)           ▼ (Dashboard & Client Management)   │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │               Nginx Reverse Proxy & SSL                │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              ▼                                                         │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │             Nest.js Core SaaS Backend Engine           │                           │
│   │   • Multi-Tenant ISP Isolation (Tenant Context)        │                           │
│   │   • Role-Based Access Control (Admin, Reseller, Staff) │                           │
│   │   • Billing & Subscription Lifecycle State Machine     │                           │
│   └──────┬───────────────────┬───────────────────┬─────────┘                           │
│          │                   │                   │                                     │
│          ▼                   ▼                   ▼                                     │
│   ┌───────────────┐   ┌───────────────┐   ┌────────────────────────┐                   │
│   │ Payment Ingest│   │ Reseller      │   │ Expiration Scheduler   │                   │
│   │ • bKash/Nagad │   │ Ledger Engine │   │ • Midnight Disconnect  │                   │
│   │ • Instant Webh│   │ • Commissions │   │ • 3-Day Warning SMS    │                   │
│   └──────┬────────┘   └──────┬────────┘   └──────┬─────────────────┘                   │
│          │                   │                   │                                     │
│          ▼                   ▼                   ▼                                     │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │              Redis Queue & Event Bus (BullMQ)          │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              │                                                         │
│              ┌───────────────┴───────────────┐                                         │
│              ▼                               ▼                                         │
│   ┌──────────────────────┐      ┌───────────────────────────────────┐                  │
│   │  SMS Notification    │      │  MikroTik RouterOS API Socket     │                  │
│   │  Worker (On-Net SMS) │      │  Engine (Direct TCP / TLS)        │                  │
│   └──────────┬───────────┘      └─────────────────┬─────────────────┘                  │
│              │                                    │                                    │
│              ▼                                    ▼ Sockets / API Port 8728            │
│   [Subscriber SMS Alert]             ┌─────────────────────────────┐                   │
│                                      │ Edge MikroTik CCR Routers   │                   │
│                                      │ • /queue/simple (Bandwidth) │                   │
│                                      │ • /ppp/secret (PPPoE Auth)  │                   │
│                                      │ • /ip/firewall/address-list │                   │
│                                      └─────────────────────────────┘                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. High-Concurrency MikroTik RouterOS Socket Communication
* **The Problem:** ISPs manage fleets of MikroTik routers (CCR, RB series) located across distributed geographic nodes. Sending uncoordinated synchronous API commands to routers during morning billing bursts caused connection pool exhaustion, socket timeouts, and router CPU spikes.
* **The Solution:**
  * Developed a persistent **MikroTik Socket Connection Pool** inside Nest.js with heartbeat health checks.
  * Packaged commands into an asynchronous **BullMQ Redis Queue**: when a payment is confirmed, an API task is enqueued with rate-limiting (e.g., maximum 15 concurrent socket operations per physical router).
  * Reduced router command execution latency to **< 1.2 seconds** while eliminating router CPU overload risks.

### 2. Instant Automated Reconnection & Disconnection Automation
* **The Problem:** When an ISP subscriber pays their monthly invoice at 11:00 PM via bKash or Nagad, they expect instant internet reactivation without waiting for human operator intervention. Non-paying users must also be automatically isolated precisely at 00:00 without disrupting active paying sessions.
* **The Solution:**
  * Created a deterministic **Subscription State Machine**: `ACTIVE` -> `EXPIRED` -> `GRACE_PERIOD` -> `DISABLED`.
  * *Recharge Flow:* Payment gateway webhooks trigger an atomic transaction: marks the invoice paid, advances the subscriber's expiry date by 30 days, and fires a MikroTik command to enable the PPPoE secret (`/ppp/secret/set disabled=no`) and refresh the dynamic firewall address list.
  * *Disconnect Flow:* Scheduled midnight cron workers identify expired accounts and move their IP into a walled-garden captive address list, rerouting HTTP traffic to a payment reminder page.

### 3. Multi-Tier Reseller Accounting & Commission Settlement
* **The Problem:** Large ISPs delegate bandwidth distribution to sub-resellers (e.g., MAC-based or bandwidth-based resellers). Calculating distributor margins, per-subscriber reseller cuts, and preventing resellers from creating users beyond their prepaid credit limit was a major accounting challenge.
* **The Solution:**
  * Built an immutable double-entry balance ledger for resellers.
  * Resellers maintain a prepaid virtual wallet: creating or renewing a 10 Mbps subscriber atomically debits the reseller's wallet balance.
  * If the reseller's balance is insufficient, the system rejects user creation, preventing unauthorized bandwidth leasing and financial leakage.

### 4. Resilient Expiration Alarms via Queued SMS Notifications
* **The Problem:** Subscribers frequently blamed ISPs for abrupt disconnects due to missed expiration dates. Sending bulk reminder SMS synchronously to thousands of users on the last day of the month led to gateway gateway timeouts and high billing expenses.
* **The Solution:**
  * Implemented automated reminder stages: **3 days prior**, **1 day prior**, and **on the day of expiration**.
  * Distributed SMS payloads across scheduled BullMQ workers with telco routing failover, guaranteeing 99.5% delivery success.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Backend Core** | **Nest.js & TypeScript** | Strict domain modularity (`RouterOSModule`, `BillingModule`, `PaymentModule`), dependency injection, and enterprise reliability. |
| **Frontend Management** | **React & Tailwind CSS** | Real-time subscriber status dashboards, invoice generation, and responsive mobile-friendly layouts. |
| **Edge Hardware Interface** | **MikroTik RouterOS API** | Direct TCP binary protocol communication (port 8728) for sub-second PPPoE and Simple Queue bandwidth provisioning. |
| **Database & Caching** | **PostgreSQL & Redis** | PostgreSQL for ACID billing transactions; Redis for session caching and router task queues. |
| **DevOps & Infrastructure** | **Docker, Linux VPS, Nginx, PM2** | High-availability server configuration with automated database backups and zero-downtime reloads. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **How do you communicate with MikroTik routers securely behind private networks or NATs?**
   * *Answer:* Routers with public static IPs connect directly via TLS-encrypted RouterOS API port 8729. For routers behind CGNAT or local ISP uplinks, NetFee establishes persistent WireGuard or OpenVPN tunnels back to the cloud controller.
2. **How is bandwidth actually controlled on the router?**
   * *Answer:* By dynamically manipulating `/queue/simple` for static IP clients or setting the `profile` parameter on `/ppp/secret` for PPPoE connections, configuring `max-limit` upload/download rates (e.g., `10M/10M`).
3. **What happens if the payment gateway webhook fires twice for the same transaction?**
   * *Answer:* Strict idempotency verification: incoming transaction IDs (`trxId`) are checked against an atomic unique constraint in PostgreSQL. If the transaction has already been ingested, the webhook returns HTTP 200 immediately without extending subscription validity twice.
