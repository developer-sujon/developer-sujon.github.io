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

## Overview

**SupportTicket** is an internal enterprise customer issue management and SLA orchestration platform engineered at **Shunno IT**. It operates as the unified internal backbone for managing customer support requests, network incident reports, and billing inquiries across all Shunno IT client deployments (including NetFee, Hisabnikash, and custom client portals).

The platform coordinates end-to-end ticket lifecycles—including automated department triage, SLA countdown timers, real-time multi-agent collision detection, and automated supervisor escalation alarms.

---

## Architectural Principles & Ticket Lifecycle

The platform handles high-velocity customer communication across distributed support teams:

* **Real-Time Event Gateway:** Powered by **Socket.io**, changes to ticket status, internal agent notes, and customer replies propagate to all active dashboard sessions in sub-100ms.
* **Presence & Collision Detection:** Prevents multiple support agents from inadvertently answering or modifying the same customer ticket simultaneously.
* **Deterministic SLA Matrix:** Configurable SLA rules prioritize mission-critical network outages over standard inquiries, dynamically calculating first-response and resolution deadlines.
* **Flexible Document Schema:** Built on MongoDB, allowing tickets to store diverse custom metadata, department-specific fields, and nested conversation threads without complex migrations.

---

## Key Engineering Challenges & Solutions

### 1. Real-Time Multi-Agent Collision Detection
* **Challenge:** When multiple support agents open the same urgent customer ticket simultaneously, they often type duplicate conflicting answers or double-refund invoices, creating customer confusion and wasted effort.
* **Solution:**
  * Implemented an active **Agent Presence & Collision Engine** using **Socket.io** and **Redis**.
  * When an agent navigates into a ticket, a lightweight heartbeat ping marks the ticket as `BEING_VIEWED` by Agent X with a 30-second expiring TTL in Redis.
  * Other agents viewing the ticket instantly receive a visual alert ("Agent Sarah is currently viewing this ticket...") and have response inputs soft-locked, eliminating duplicate replies entirely.

### 2. SLA Countdown Timers & Automated Departmental Escalation
* **Challenge:** High-priority network outages (e.g. core router downtime) frequently got buried under routine general inquiries, causing SLA breaches and client penalties.
* **Solution:**
  * Built a deterministic **SLA Matrix Engine**:
    * *Critical (P1):* 15-minute First Response / 2-hour Resolution.
    * *Medium (P2):* 1-hour First Response / 6-hour Resolution.
    * *Low (P3):* 4-hour First Response / 24-hour Resolution.
  * If a P1 ticket remains unassigned for 10 minutes, the background Redis cron automatically raises its priority flag, dispatches emergency SMS alerts to the department lead, and re-routes the ticket to the tier-2 on-call engineer.

### 3. Unified Activity Timeline & Audit Logs
* **Challenge:** Tracking who modified a ticket status, edited internal notes, or re-assigned customer tickets was difficult without a centralized audit ledger.
* **Solution:**
  * Designed an immutable event-stream document structure in MongoDB.
  * Every mutation (status change, message sent, attachment uploaded, department transfer) appends an immutable event log with actor ID, timestamp, and metadata diffs, enabling full timeline reconstruction for managerial audits.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **API Gateway** | Express.js, Node.js | Event-driven HTTP routing with minimal latency for ticket creation and updates. |
| **Real-Time Layer** | Socket.io | Bi-directional WebSocket communication for sub-100ms ticket updates and agent collision detection. |
| **Database** | MongoDB, Mongoose | Flexible document model accommodating varying ticket schemas, dynamic fields, and nested conversation histories. |
| **SLA Scheduler** | Redis, BullMQ | High-precision background timers and scheduled escalation alerts. |
| **Deployment** | Docker, Linux VPS | Containerized microservice running alongside Shunno IT's internal core infrastructure. |

---

## Measurable Production Impact

* **42% Faster Ticket Resolution:** Automated departmental routing and real-time alerts accelerated issue turnaround.
* **Zero Collisions:** Eliminated duplicate replies and conflicting agent responses.
* **100% SLA Compliance:** Critical network incidents responded to within the 15-minute SLA window.
