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
liveUrl: "https://eazlock.com"
---

## Overview

**Eazlock** ([https://eazlock.com](https://eazlock.com)) is an enterprise IoT device locking and consumer electronics installment (EMI) financing platform built for **Yupsis**. It enables device financiers, smartphone distributors, and retail merchants to automate the financial lifecycle of retail loans by communicating with enrolled hardware devices (Android smartphones, tablets, IoT appliances).

If a consumer misses their scheduled installment deadline, Eazlock automatically executes staged hardware restrictions—ranging from on-screen payment warnings and notification sounds to outgoing call blocks and total device lockout—restoring full functionality the instant payment is confirmed via digital payment gateways.

---

## Architectural Principles & Command Queue Pipeline

The platform orchestrates hardware state changes over unreliable mobile cellular networks:

* **Asynchronous Command Buffering:** Commands never assume devices are immediately reachable. If a device is powered off or in airplane mode, payloads persist in stateful pending queues until a cryptographically authenticated heartbeat signal arrives.
* **Idempotency & Sequence Numbering:** Monotonically increasing command sequence numbers guarantee that delayed or replayed network packets cannot override current hardware states.
* **Automated Grace Period Matrix:** High-precision cron workers evaluate customer repayment statuses daily at midnight, gradually escalating enforcement actions to maximize collection rates without abrupt customer disruption.
* **Cryptographic Tamper Protection:** Commands undergo digital signature verification using public-key cryptography, preventing client-side proxy tampering or spoofed unlock signals.

---

## Key Engineering Challenges & Solutions

### 1. Guaranteeing Zero Dropped Commands for Disconnected Devices
* **Challenge:** Borrowers facing default frequently power off their phones, switch on airplane mode, or remove their SIM cards. Direct synchronous HTTP push commands fail with network timeouts. When the phone eventually reconnects weeks later, stale or out-of-order commands caused inconsistent states (e.g., an unlock command executed before an older lock command).
* **Solution:**
  * Engineered the **`DevicePendingCommandProcessor`** and **`DevicePendingConsumer`** pipeline.
  * Every command is assigned an incrementing sequence number and stored in an immutable pending queue in PostgreSQL and Redis.
  * When a device sends its routine heartbeat ping, the consumer checks for pending commands in strict sequential order.
  * The command is only marked `COMPLETED` after the device returns a cryptographically signed acknowledgement (ACK), ensuring **100% command delivery reliability**.

### 2. Automated Staged Lock Progression (Grace Period Matrix)
* **Challenge:** Abruptly bricking a customer's phone on day 1 of a missed payment creates consumer backlash and legal friction.
* **Solution:**
  * Designed a progressive **3-Stage Enforcement State Machine**:
    * *Stage 1 (Days 1–3 - Grace Period):* Persistent on-screen payment reminders with direct one-click payment links.
    * *Stage 2 (Days 4–7 - Soft Restriction):* Outgoing calls and non-essential apps (social media, camera) are temporarily restricted while incoming calls and emergency numbers (999/911) remain fully functional.
    * *Stage 3 (Day 8+ - Hard Lockdown):* Device screen locks into kiosk mode, displaying only the merchant contact number and payment QR code.

### 3. Instant Automated Unlock on Payment Confirmation
* **Challenge:** When an overdue customer pays their installment late at night via mobile wallet, they demand immediate device restoration without waiting for customer care office hours.
* **Solution:**
  * Integrated payment gateway webhooks directly with the command queue.
  * Within **< 800ms** of payment settlement, the webhook triggers an atomic database update and pushes a high-priority `DEVICE_UNLOCK` command to the device, unlocking the hardware instantly.

### 4. Cryptographic Command Signing Against Reverse Engineering
* **Challenge:** Tech-savvy users attempted to intercept HTTP command payloads or spoof server responses using local VPN proxy tools to fake unlock signals.
* **Solution:**
  * Implemented public-key cryptography (Ed25519) combined with dynamic device nonce challenges.
  * The local device agent verifies the server's digital signature against a root public key embedded into the firmware partition.
  * Fake or replayed unlock payloads are instantly rejected by the device kernel.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Monorepo System** | Turborepo, TypeScript | Unified workspace sharing schemas, types, and logic between API, admin portal, and background cron services. |
| **Frontend Admin** | Next.js 15, Tailwind CSS | High-performance dashboard for merchant loan tracking, GPS logs, and device status management. |
| **Command Processing**| Node.js, Custom Queue Processor | Asynchronous queue with heartbeat poll reconciliation, guaranteeing zero command loss. |
| **Background Cron** | Node.js Task Scheduler | Automated midnight evaluations of EMI due dates, grace periods, and late penalty calculations. |
| **Database & Cache** | PostgreSQL, Redis | ACID transaction logs for financial repayments and Redis pub/sub for real-time device status pings. |

---

## Measurable Production Impact

* **99.99% Command Delivery:** Zero lost lock/unlock signals across thousands of enrolled devices.
* **< 800ms Auto-Unlock:** Instant hardware reactivation upon online payment confirmation.
* **100% Emergency Availability:** Unrestricted emergency dialer access (999/911) maintained at all times.
