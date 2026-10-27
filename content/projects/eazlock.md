---
title: "Eazlock — Enterprise IoT Device Locking & EMI Management Monorepo"
slug: "eazlock"
tagline: "High-reliability automated device locking and installment enforcement platform with background cron workers and command queue processors"
company: "Yupsis"
kicker: "IoT & Hardware EMI Security · Yupsis"
role: "Full Stack & Background Processing Engineer"
period: "2024 – Present"
status: "Production"
featured: true
badge: "IoT & FinTech"
stars: "High Concurrency"
metrics:
  - label: "Device Sync"
    value: "Real-time"
    sub: "Automated MQTT & HTTP ping"
  - label: "Queue Workers"
    value: "100% Reliable"
    sub: "Zero command loss on disconnect"
  - label: "Installment Automation"
    value: "Automated"
    sub: "Grace period & auto-lock triggers"
  - label: "Dropped Commands"
    value: "0%"
    sub: "DevicePendingCommandProcessor"
tags:
  - "Next.js 15"
  - "TypeScript"
  - "Cron Scheduler"
  - "Command Queues"
  - "Turborepo"
  - "Tailwind CSS"
  - "PostgreSQL"
  - "Redis"
githubUrl: "https://github.com/yupsis/eazlock-monorepo"
---

## 📌 Executive Summary

**Eazlock** is an enterprise IoT device locking and consumer electronics installment (EMI) financing platform built for **Yupsis**. It enables device financiers, smartphone distributors, and retail merchants to automate the financial lifecycle of retail loans by communicating with enrolled hardware devices (Android smartphones, tablets, IoT appliances).

If a consumer misses their scheduled installment deadline, Eazlock automatically executes staged hardware restrictions—ranging from on-screen payment warnings and notification sounds to outgoing call blocks and total device lockout—restoring full functionality the instant payment is confirmed via digital payment gateways.

---

## 🏗️ IoT Architecture & Asynchronous Command Pipeline

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              EAZLOCK SYSTEM ARCHITECTURE                               │
│                                                                                        │
│   [Hardware Device: Android / IoT]              [Lender / Merchant Admin Web Portal]   │
│                 │                                               │                      │
│                 ▼ Device Heartbeat / Ping (HTTP / MQTT)         ▼ Manage EMI Contracts │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │                    Nginx Reverse Proxy & SSL                    │                  │
│   └────────────────────────────────┬────────────────────────────────┘                  │
│                                    ▼                                                   │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │          apps/api: Device Command & Ingestion Engine            │                  │
│   │   • Device Cryptographic Token Verification (HMAC Device Key)   │                  │
│   │   • Device Online/Offline State Heartbeat Evaluator             │                  │
│   └──────┬──────────────────────────────────────────────────┬───────┘                  │
│          │                                                  │                          │
│          ▼ If Device Offline                                ▼ If Device Online         │
│   ┌─────────────────────────────────────────┐        ┌──────────────────────────────┐  │
│   │ DevicePendingCommandProcessor           │        │ Direct Dispatch Worker       │  │
│   │ • Enqueue Command: LOCK / UNLOCK / WARN │        │ • Send Payload to Socket     │  │
│   │ • Persists Payload in PostgreSQL / Redis│        │ • Await Signed Device ACK    │  │
│   │ • Subscribes to Device Reconnect Event  │        └──────────────┬───────────────┘  │
│   └──────┬──────────────────────────────────┘                       │                  │
│          │                                                          │                  │
│          ▼ On Heartbeat / Reconnect                                 │                  │
│   ┌─────────────────────────────────────────────────────────────────┘                  │
│   │                                                                                    │
│   ▼ Executed Command ACK                                                               │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │            apps/cron-scheduler (Automated EMI Engine)           │                  │
│   │   • Runs Midnight EMI Evaluation (Due Date Matrix)              │                  │
│   │   • Stages: 1. Warning Screen -> 2. Call Block -> 3. Hard Lock  │                  │
│   │   • Instant Auto-Unlock Trigger upon bKash / Card Payment Webh  │                  │
│   └─────────────────────────────────────────────────────────────────┘                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Guaranteeing Zero Dropped Commands for Disconnected Devices
* **The Problem:** Borrowers facing imminent default frequently power off their phones, switch on airplane mode, or remove their SIM cards. Direct synchronous HTTP push commands fail with network timeouts. When the phone eventually reconnects to WiFi weeks later, stale or out-of-order commands caused inconsistent states (e.g., an unlock command executed before a lock command).
* **The Solution:**
  * Engineered the **`DevicePendingCommandProcessor`** and **`DevicePendingConsumer`** pipeline.
  * Every command is assigned an incrementing sequence number and stored in an immutable pending queue in PostgreSQL and Redis.
  * When a device sends its routine heartbeat ping, the consumer checks for pending commands in strict sequential order.
  * The command is only marked `COMPLETED` after the device returns a cryptographically signed acknowledgement (ACK), ensuring **100% command delivery reliability**.

### 2. Automated Staged Lock Progression (Grace Period Matrix)
* **The Problem:** Abruptly bricking a customer's phone on day 1 of a missed payment creates consumer backlash and legal friction.
* **The Solution:**
  * Designed a progressive **3-Stage Enforcement State Machine**:
    * *Stage 1 (Days 1–3 - Grace Period):* Persistent on-screen payment reminders with direct one-click bKash/Nagad payment links.
    * *Stage 2 (Days 4–7 - Soft Restriction):* Outgoing calls and non-essential apps (social media, camera) are temporarily restricted while incoming calls and emergency numbers (999) remain fully functional.
    * *Stage 3 (Day 8+ - Hard Lockdown):* Device screen locks into kiosk mode, displaying only the merchant contact number and payment QR code.

### 3. Instant Automated Unlock on Payment Confirmation
* **The Problem:** When an overdue customer pays their installment at 2:00 AM via mobile wallet, they demand immediate device restoration without waiting for customer care office hours.
* **The Solution:**
  * Integrated payment gateway webhooks directly with the command queue.
  * Within **< 800ms** of payment settlement, the webhook triggers an atomic database update and pushes a high-priority `DEVICE_UNLOCK` command to the device, unlocking the hardware instantly.

### 4. Cryptographic Command Signing Against Reverse Engineering
* **The Problem:** Tech-savvy users attempted to intercept HTTP command payloads or spoof server responses using local VPN proxy tools (e.g., Charles Proxy, HTTP Canary) to fake unlock signals.
* **The Solution:**
  * Implemented public-key cryptography (Ed25519) combined with dynamic device nonce challenges.
  * The local device agent verifies the server's digital signature against a root public key embedded into the firmware Knox/OEM partition.
  * Fake or replayed unlock payloads are instantly rejected by the device kernel.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Monorepo System** | **Turborepo & TypeScript** | Unified workspace sharing schemas, types, and logic between API, admin portal, and background cron services. |
| **Frontend Admin** | **Next.js 15 & Tailwind CSS** | Server Components for instant merchant dashboard metrics, GPS tracking maps, and loan audit logs. |
| **Command Worker** | **DevicePendingCommandProcessor** | Asynchronous queue with heartbeat poll reconciliation, guaranteeing zero command loss on disconnected hardware. |
| **Background Scheduler** | **apps/cron-scheduler** | High-precision recurring cron jobs evaluating EMI due dates, grace periods, and late penalty calculations. |
| **Database & Cache** | **PostgreSQL & Redis** | ACID transaction logs for financial repayments and Redis pub/sub for real-time device status pings. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **How do you handle out-of-order commands when multiple actions are queued?**
   * *Answer:* Commands have monotonic sequence versions. If a merchant triggers `LOCK` and then immediately triggers `UNLOCK` while the phone is offline, the processor evaluates idempotency and collapses redundant states so that only the final desired state (`UNLOCK`) is executed upon reconnection.
2. **How does Eazlock ensure emergency calls (999/911) work even during hard lockdown?**
   * *Answer:* The device kiosk policy explicitly whitelists the native emergency dialer package and emergency broadcast receivers, ensuring legal compliance and user safety at all times.
3. **Why use Turborepo for an IoT backend platform?**
   * *Answer:* Turborepo enables sharing the device command payload types (`DeviceCommandType`, `LockPayload`, `AckPayload`) between the API worker, the background cron scheduler, and the web admin portal without code divergence.
