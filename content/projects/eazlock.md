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
tags:
  - "Next.js 15"
  - "TypeScript"
  - "Cron Scheduler"
  - "Command Queues"
  - "Turborepo"
  - "Tailwind CSS"
  - "PostgreSQL"
githubUrl: "https://github.com/yupsis/eazlock-monorepo"
---

## 📌 Executive Summary

**Eazlock** is an enterprise device security and installment management platform designed for consumer electronics retailers and micro-lending institutions. It enables automatic enforcement of scheduled smartphone EMI payments by sending tamper-proof cryptographic lock and unlock signals to enrolled hardware devices.

---

## ⚙️ Core Architecture & Worker Pipeline

* **`DevicePendingCommandProcessor` & `DevicePendingConsumer`:**
  - Devices frequently go offline (airplane mode, SIM swaps, power off). Direct synchronous commands fail under real-world conditions.
  - Engineered an asynchronous pending command queue with exponential backoff and heartbeat polling.
  - When a device reconnects, pending payloads are validated, dispatched, and acknowledged with zero command duplication.
* **Cron-Scheduler App:**
  - Automated midnight cron jobs that calculate overdue interest, trigger SMS/Push notifications, and execute gradual hardware feature restrictions (e.g. locking outgoing calls before full device lockdown).
* **Multi-Tenant Admin Dashboard (`apps/web-admin`):**
  - Next.js dashboard for merchants to onboard devices, track GPS status, configure payment gateways (SSLCommerz, bKash, Nagad), and monitor collection analytics.
