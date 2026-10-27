---
title: "Eazlock — IoT Device Locking & EMI Management"
slug: "eazlock"
tagline: "Automated device management and installment enforcement platform with background cron schedulers and command queues"
company: "Yupsis"
kicker: "IoT & Hardware EMI Security · Yupsis"
role: "Full Stack & Background Processing Engineer"
period: "2024 – Present"
status: "Production"
featured: true
badge: "IoT & FinTech"
metrics:
  - label: "Target Devices"
    value: "Android & IoT"
    sub: "Smartphones, tablets & appliances"
  - label: "Queue Engine"
    value: "Redis Queues"
    sub: "Persistent command buffers"
  - label: "Scheduler"
    value: "Cron Workers"
    sub: "Daily midnight grace-period checks"
  - label: "Monorepo"
    value: "Turborepo"
    sub: "Next.js dashboard & microservices"
tags:
  - "Next.js 15"
  - "TypeScript"
  - "Cron Scheduler"
  - "Command Queues"
  - "Turborepo"
  - "Tailwind CSS"
  - "PostgreSQL"
  - "Redis"
liveUrl: "https://eazlock.com"
---

## Overview

**Eazlock** ([https://eazlock.com](https://eazlock.com)) is an IoT device management and installment (EMI) financing platform built for **Yupsis**. It helps consumer electronics distributors and smartphone retailers manage financed devices safely.

If a customer misses an installment payment deadline, Eazlock automatically coordinates staged restrictions—such as on-screen payment reminders, sound alerts, outgoing call restrictions, or lock screens—and instantly restores normal device access the moment an online payment is confirmed through digital wallets or bank rails.

---

## Architecture & How It Works

Communicating with mobile devices across unstable cellular networks requires careful queue design:

* **Asynchronous Command Buffering:** We never assume a target phone is online right now. If a device is powered off, in airplane mode, or out of cellular coverage, commands wait safely in a stateful pending queue in Redis/PostgreSQL until the device reconnects.
* **Sequence Numbers & Idempotency:** Every command has a sequential version number. This prevents race conditions where an older "lock" command delayed by network latency arrives after a newer "unlock" command.
* **Automated Midnight Schedulers:** Cron workers run every midnight to check payment deadlines, advance accounts through grace periods, and dispatch reminders before initiating any device restrictions.
* **Signed Hardware Payloads:** Commands are cryptographically signed to ensure only authorized server instructions can alter the device state.

---

## Practical Engineering Challenges & Solutions

### 1. Handling Disconnected and Offline Devices
* **Problem:** Borrowers facing payment deadlines frequently turn off their phones or disconnect from mobile data. Standard HTTP push requests immediately fail with connection timeouts.
* **Solution:**
  * Built a `DevicePendingCommandProcessor` queue.
  * When a command is triggered, it persists with a `PENDING` state.
  * The enrolled device application periodically sends a lightweight heartbeat ping.
  * As soon as the heartbeat arrives, the server delivers pending commands in exact order and waits for cryptographic execution receipts.

### 2. Preventing Conflicting Command Replays
* **Problem:** If a customer pays their installment at 10:00 AM, the system sends an "UNLOCK" command. If a delayed "LOCK" command from the night before was still in transit over slow 2G data, executing it out of order could lock the phone right after the customer paid.
* **Solution:**
  * Assigned monotonically increasing sequence numbers and timestamps to every device state transition.
  * The device client drops any incoming command that carries a sequence number lower than or equal to its current state, ensuring only the latest instructions take effect.

### 3. Gradual Enforcement Without Abrupt Disruption
* **Problem:** Immediately locking a customer's phone on day one of a missed payment harms customer trust and increases support ticket volume.
* **Solution:**
  * Designed a flexible grace-period matrix:
    * **Day 1–3:** Gentle on-screen payment reminders and daily SMS alerts.
    * **Day 4–6:** Audible notification chimes and payment prompts during device wake.
    * **Day 7+:** Restrict outgoing non-emergency actions until payment confirmation.
  * Once the digital payment gateway confirms the installment, the system immediately dispatches the unlock instruction without manual staff intervention.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Backend & Queues** | Node.js, Redis, BullMQ | Command queues, heartbeat verification, and device state management. |
| **Database** | PostgreSQL, Prisma | Customer contracts, loan schedules, and device audit logs. |
| **Schedulers** | Node Cron, BullMQ | Midnight payment audits and automatic grace-period progression. |
| **Frontend & Admin** | Next.js 15, React 19, Tailwind CSS | Management dashboard for distributors and merchant stores. |
| **Monorepo** | Turborepo | Shared TypeScript interfaces and configs between API and dashboard. |

---

## Key Results

* **Zero Dropped Instructions:** Offline devices receive and execute pending commands safely the moment they reconnect.
* **Automated Payment Lifecycle:** Staged reminders and instant automatic unlocks reduce customer disputes and administrative workload.
* **Reliable Device Fleet Management:** Distributors monitor thousands of enrolled devices securely from a single dashboard.
