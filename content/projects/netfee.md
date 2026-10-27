---
title: "NetFee — ISP Billing SaaS & MikroTik Bandwidth Engine"
slug: "netfee"
tagline: "Automated internet service provider billing platform with real-time MikroTik RouterOS provisioning, payment gateway integration, and automated disconnects"
company: "Shunno IT"
kicker: "ISP SaaS & Network Automation · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "ISP SaaS"
metrics:
  - label: "Networking"
    value: "MikroTik"
    sub: "RouterOS API socket pool"
  - label: "Billing"
    value: "Automated"
    sub: "Self-service recharges & disconnects"
  - label: "Backend"
    value: "Nest.js"
    sub: "MongoDB & Redis cache"
  - label: "Alerts"
    value: "BullMQ"
    sub: "Scheduled SMS reminders with retries"
tags:
  - "Nest.js"
  - "React"
  - "Node.js"
  - "MongoDB"
  - "Mongoose"
  - "MikroTik RouterOS API"
  - "Redis"
  - "BullMQ"
  - "Socket.io"
  - "SMS Gateway"
  - "Docker"
liveUrl: "https://netfeebd.com"
---

## Overview

**NetFee** ([https://netfeebd.com](https://netfeebd.com)) is a multi-tenant ISP billing and subscriber management platform built at **Shunno IT**. It automates daily operations for broadband internet service providers (ISPs) across Bangladesh.

The software connects business billing with physical network equipment. It handles customer PPPoE and static IP subscriptions, online customer recharges via mobile wallets (bKash, Nagad), instant bandwidth speed adjustments, sub-reseller commissions, and automated disconnection cron jobs that talk directly to the **MikroTik RouterOS API**.

---

## Architecture & How It Works

Managing hundreds of client routers with thousands of subscribers requires reliable socket connections and predictable billing state transitions:

* **Persistent Socket Connection Pool:** The NestJS backend manages active TCP socket connections to distributed MikroTik routers, executing commands to enable, disable, or adjust subscriber profiles without overloading router CPUs.
* **Subscription State Machine:** Subscribers move automatically through clear states (`ACTIVE` → `EXPIRED` → `GRACE_PERIOD` → `DISABLED`). When a state changes, the system updates the customer's firewall rule or IP pool on the router in real time.
* **Reseller Wallet System:** Sub-resellers and local cable operators have isolated prepaid wallets, preventing unauthorized bandwidth distribution beyond their prepaid balances.
* **Scheduled SMS Pipeline:** BullMQ workers send automated payment reminders before package expiration dates and confirmation SMS messages once paid.

---

## Practical Engineering Challenges & Solutions

### 1. Managing Sockets to Hundreds of Remote MikroTik Routers
* **Problem:** Opening a new TCP socket connection to a MikroTik router for every single customer check took several seconds and quickly hit connection limits on client routers.
* **Solution:**
  * Implemented a connection pooling layer in Node.js.
  * Reused authenticated sockets for consecutive commands and grouped batch queries together.
  * Added health checks and automatic reconnection logic when network links between routers and our servers drop temporarily.

### 2. High-Volume Billing Day Automation
* **Problem:** On the 1st of every month, thousands of customer subscriptions expire at once. Running thousands of router API commands simultaneously caused CPU spikes on client routers and timed out database queries.
* **Solution:**
  * Distributed the expiration checks into a rate-limited **BullMQ** queue with Redis.
  * Commands to routers were throttled into small batches per router, preventing router reboots and keeping the web interface responsive.

### 3. Immediate Reconnection on Payment
* **Problem:** When an expired user pays their monthly bill online at night, they expect their internet to turn back on instantly without waiting for an ISP technician to wake up.
* **Solution:**
  * Integrated bKash and Nagad payment webhooks.
  * When payment clears, the backend updates the database, removes the user from the "Disabled" address list on the MikroTik router, and re-enables their full bandwidth profile in under 2 seconds.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Backend** | NestJS, TypeScript, Node.js | Modular business logic, subscriber auth, and API routes. |
| **Networking** | MikroTik RouterOS API, TCP Sockets | Direct router management for PPPoE and Hotspot users. |
| **Database** | MongoDB, Mongoose, Redis | Subscriber records, invoices, and session caching. |
| **Queues** | BullMQ | Rate-limited router commands and staged SMS alerts. |
| **Frontend** | React, Tailwind CSS | Admin dashboard, cashier portal, and customer payment page. |

---

## Key Results

* **Hands-Free Operation:** Automated recharges and disconnections eliminate manual administrative work for ISP operators.
* **Stable Network Connections:** Pooled socket connections avoid overloading client routers during peak billing cycles.
* **Reliable Payments:** Seamless mobile wallet integration lets subscribers pay and reconnect anytime, 24/7.
