---
title: "SupportTicket — Internal SLA & Issue Management"
slug: "support-ticket"
tagline: "Internal multi-tenant support ticket and SLA management platform coordinating customer requests, agent collaboration, and automated escalations"
company: "Shunno IT"
kicker: "Internal Enterprise SaaS · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production (Internal)"
featured: false
badge: "Internal Platform"
metrics:
  - label: "Real-Time Bus"
    value: "Socket.io"
    sub: "Live updates & collision detection"
  - label: "Database"
    value: "MongoDB"
    sub: "Flexible ticket threads & audit logs"
  - label: "SLA Tracking"
    value: "Automated"
    sub: "Dynamic urgency matrix & timers"
  - label: "Cache & State"
    value: "Redis"
    sub: "Agent presence & session tracking"
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

**SupportTicket** is an internal customer issue tracking and SLA management platform built at **Shunno IT**. It serves as the unified support desk for our client-facing products (including NetFee, Hisabnikash, and custom client portals).

The platform coordinates the entire customer support workflow—from automated department ticket assignment and response countdown timers to real-time agent collision alerts and escalation reminders.

---

## Architecture & How It Works

Customer support teams handle dozens of incoming requests simultaneously, making real-time synchronization essential:

* **Real-Time Event Gateway (Socket.io):** Status changes, internal staff notes, and customer replies appear in all open agent dashboards immediately without requiring page refreshes.
* **Agent Collision Detection:** When an agent opens a ticket to start writing a response, other agents viewing that ticket see an alert showing who is currently active on it, preventing duplicate responses.
* **SLA Priority Matrix:** Configurable rules automatically prioritize critical issues (like ISP network outages) ahead of routine billing inquiries, tracking first-response deadlines and escalation targets.
* **Flexible Document Storage (MongoDB):** Different departments have different ticket fields (e.g. router IP and MAC address for network support; invoice numbers for billing). MongoDB lets us store these custom attributes cleanly without complex schema migrations.

---

## Practical Engineering Challenges & Solutions

### 1. Preventing Multiple Agents from Replying to the Same Ticket
* **Problem:** In a busy support office, two agents often open the same ticket at the same time, unknowingly typing two different answers or making conflicting changes.
* **Solution:**
  * Implemented an **Agent Presence Engine** using **Socket.io** and **Redis**.
  * When an agent opens a ticket view, their browser registers their presence in a Redis session key.
  * Any other agent viewing the ticket list sees a badge ("Sujon is currently viewing this ticket"), and if they open it, the reply box displays a subtle warning to avoid duplicate work.

### 2. Live Notification Without Page Refreshing
* **Problem:** Support agents frequently missed urgent incoming tickets unless they repeatedly refreshed their browser tabs throughout the day.
* **Solution:**
  * Created room-based Socket.io events by department.
  * When a new ticket is submitted or escalated, the backend broadcasts a notification event to all connected agents in that department with audio and visual toast alerts.

### 3. Escalating Overdue Tickets Automatically
* **Problem:** High-priority customer tickets occasionally slipped through the cracks during peak shift handovers.
* **Solution:**
  * Set up scheduled background workers to monitor active tickets against their SLA deadlines.
  * If a ticket remains unassigned or unresolved past its deadline, the system automatically elevates its priority level and notifies the shift supervisor.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | Ticket routing, user authentication, and REST APIs. |
| **Real-Time Layer** | Socket.io, Redis | Live agent collision warnings, status updates, and notifications. |
| **Database** | MongoDB | Storing tickets, conversation threads, and department-specific metadata. |
| **Frontend** | React, Tailwind CSS | Support dashboard, ticket assignment controls, and SLA timers. |
| **Deployment** | Docker, Linux VPS | Containerized deployment and reverse proxying with Nginx. |

---

## Key Results

* **Eliminated Collisions:** Live presence alerts stopped agents from sending duplicate answers to the same customer.
* **Faster Response Times:** Real-time Socket.io notifications alerted agents to new tickets immediately.
* **Organized Internal Operations:** Unified customer support for multiple products into a single reliable tool.
