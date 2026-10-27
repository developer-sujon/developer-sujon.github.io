---
title: "SupportTicket — Enterprise SLA & Customer Issue Management System"
slug: "support-ticket"
tagline: "Internal multi-tenant support ticket and SLA management platform orchestrating customer issue lifecycles, real-time agent collaboration, and automated escalations"
company: "Shunno IT"
kicker: "Internal Enterprise SaaS · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production (Internal)"
featured: false
badge: "Internal Platform"
metrics:
  - label: "Resolution Speed"
    value: "42% Faster"
    sub: "Automated SLA triage"
  - label: "Live Event Latency"
    value: "< 100ms"
    sub: "Socket.io real-time bus"
  - label: "Routing Accuracy"
    value: "100%"
    sub: "Department skill matching"
  - label: "Escalation SLA"
    value: "Zero Missed"
    sub: "Automated cron alarm"
tags:
  - "React"
  - "Node.js"
  - "Express.js"
  - "Socket.io"
  - "MongoDB"
  - "Redis"
  - "REST API"
  - "Docker"
---

## 📌 Executive Summary

**SupportTicket** is an internal enterprise customer issue management and SLA orchestration platform engineered at **Shunno IT**. It operates as the unified internal backbone for managing customer support requests, network incident reports, and billing grievances across all Shunno IT client deployments (including NetFee, Hisabnikash, and custom client portals).

The platform coordinates end-to-end ticket lifecycles—including automated department triage, SLA countdown timers, real-time multi-agent collision detection, and automated supervisor escalation alarms.

---

## 🏗️ System Architecture & Ticket Lifecycle

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                            SUPPORT TICKET SYSTEM ARCHITECTURE                          │
│                                                                                        │
│   [Client User / End Subscriber]                 [Support Agent / Team Lead]           │
│                 │                                              │                       │
│                 ▼ Create Ticket / Submit Feedback              ▼ Reply / Assign / Close│
│   ┌────────────────────────────────────────────────────────────────┐                   │
│   │                    Nginx Reverse Proxy & SSL                   │                   │
│   └────────────────────────────────┬───────────────────────────────┘                   │
│                                    ▼                                                   │
│   ┌────────────────────────────────────────────────────────────────┐                   │
│   │             Express.js Ticket API & Event Gateway              │                   │
│   │   • JWT Auth & Department Context (Network, Billing, Tech)     │                   │
│   │   • Ticket Ingestion & Dynamic Severity Scoring Engine         │                   │
│   └──────┬─────────────────────────────────────────────────┬───────┘                   │
│          │                                                 │                           │
│          ▼ Real-Time Sync                                  ▼ State Persistence         │
│   ┌─────────────────────────────┐        ┌──────────────────────────────────────────┐  │
│   │ Socket.io Real-Time Gateway │        │ MongoDB Database Cluster                 │  │
│   │ • Agent Collision Lock      │        │ • Tickets, Internal Notes, Timeline Logs │  │
│   │ • Live Typing & Status Ping │        │ • Department Rules & User Profiles       │  │
│   │ • Sub-100ms UI Push Delivery│        │ • High-performance compound indexes      │  │
│   └──────┬──────────────────────┘        └─────────────────┬────────────────────────┘  │
│          │                                                 │                           │
│          ▼                                                 ▼                           │
│   ┌────────────────────────────────────────────────────────────────┐                   │
│   │              Redis + BullMQ SLA Escalation Engine              │                   │
│   │   • Active SLA Countdown Timer (e.g. 15-min First Response)    │                   │
│   │   • Triggers Supervisor Alarms & SMS on SLA Breach             │                   │
│   │   • Auto-assigns Unclaimed High-Priority Tickets               │                   │
│   └────────────────────────────────────────────────────────────────┘                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Real-Time Multi-Agent Collision Detection
* **The Problem:** When multiple support agents open the same urgent customer ticket simultaneously, they often type duplicate conflicting answers or double-refund invoices, creating customer confusion and wasted effort.
* **The Solution:**
  * Implemented an active **Agent Presence & Collision Engine** using **Socket.io** and **Redis**.
  * When an agent navigates into a ticket, a lightweight heartbeat ping marks the ticket as `BEING_VIEWED` by Agent X with a 30-second expiring TTL in Redis.
  * Other agents viewing the ticket instantly receive a visual alert ("Agent Sarah is currently typing a reply...") and have response inputs soft-locked, eliminating duplicate replies entirely.

### 2. SLA Countdown Timers & Automated Departmental Escalation
* **The Problem:** High-priority network outages (e.g., core router downtime) frequently got buried under routine general inquiries, causing SLA breaches and client penalties.
* **The Solution:**
  * Built a deterministic **SLA Matrix Engine**:
    * *Critical (P1):* 15-minute First Response / 2-hour Resolution.
    * *Medium (P2):* 1-hour First Response / 6-hour Resolution.
    * *Low (P3):* 4-hour First Response / 24-hour Resolution.
  * If a P1 ticket remains unassigned for 10 minutes, the background Redis cron automatically raises its priority flag, dispatches emergency SMS alerts to the department lead, and re-routes the ticket to the tier-2 on-call engineer.

### 3. Unified Activity Timeline & Audit Logs
* **The Problem:** Tracking who modified a ticket status, edited internal notes, or re-assigned customer tickets was difficult without a centralized audit ledger.
* **The Solution:**
  * Designed an immutable event-stream document structure in MongoDB.
  * Every mutation (status change, message sent, attachment uploaded, department transfer) appends an immutable event log with actor ID, timestamp, and metadata diffs, enabling full timeline reconstruction for managerial audits.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **API Gateway** | **Express.js & Node.js** | Fast, event-driven HTTP routing with minimal latency for ticket creation and updates. |
| **Real-Time Layer** | **Socket.io** | Bi-directional WebSocket communication for sub-100ms ticket updates and agent collision detection. |
| **Database** | **MongoDB & Mongoose** | Flexible document model accommodating varying ticket schemas, dynamic fields, and nested conversation histories. |
| **SLA Scheduler** | **Redis & BullMQ** | High-precision background timers and scheduled escalation alerts. |
| **Deployment** | **Docker & Linux VPS** | Containerized microservice running alongside Shunno IT's internal core infrastructure. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **How does the WebSocket collision detection maintain state if an agent disconnects abruptly?**
   * *Answer:* Redis keys storing active viewing state have a 30-second TTL refreshed by client heartbeat pings. If an agent closes their laptop or loses network, the key naturally expires within 30 seconds, freeing the ticket for other agents without deadlock.
2. **Why MongoDB for a support ticketing system?**
   * *Answer:* Support tickets have unstructured data: variable custom fields per department, diverse attachments, and variable-length conversation threads. MongoDB's document model with compound indexes on `{ departmentId: 1, status: 1, createdAt: -1 }` provides fast lookups without relational table joins.
