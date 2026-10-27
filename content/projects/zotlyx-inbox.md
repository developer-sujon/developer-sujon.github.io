---
title: "Zotlyx Inbox — Open-Source Team Mailbox & AI Assistant"
slug: "zotlyx-inbox"
tagline: "Professional self-hosted team inbox and shared mailbox workspace built on Cloudflare Workers, Durable Objects, D1 SQLite, R2, and Workers AI"
company: "Open Source"
kicker: "Open-Source Cloudflare Architecture · Personal Project"
role: "Creator & Lead Maintainer"
period: "2024 – Present"
status: "Open Source"
featured: true
badge: "Open Source"
metrics:
  - label: "Mailbox Latency"
    value: "< 80ms"
    sub: "Edge Durable Object"
  - label: "AI Integration"
    value: "Workers AI"
    sub: "Mailbox-aware drafting"
  - label: "Deployment"
    value: "1-Click Deploy"
    sub: "Cloudflare Workers button"
  - label: "Storage Isolation"
    value: "D1 & R2"
    sub: "Dedicated per mailbox"
tags:
  - "Cloudflare Workers"
  - "Durable Objects"
  - "D1 SQLite"
  - "R2 Storage"
  - "Workers AI"
  - "React 19"
  - "React Router v7"
  - "Tailwind CSS"
  - "Zustand"
githubUrl: "https://github.com/developer-sujon/zotlyx-inbox"
liveUrl: "https://deploy.workers.cloudflare.com/?url=https://github.com/developer-sujon/zotlyx-inbox"
---

## Overview

**Zotlyx Inbox** ([GitHub Repository](https://github.com/developer-sujon/zotlyx-inbox)) is an open-source, self-hosted team inbox workspace engineered entirely on the Cloudflare edge ecosystem. It is designed for businesses, startup engineering teams, and customer support organizations that need to manage shared team addresses (e.g. `info@`, `support@`, `sales@`) without forwarding emails to personal inboxes or paying per-seat SaaS subscription fees.

Incoming mail routes directly through **Cloudflare Email Routing**, each individual mailbox executes within an isolated **Durable Object** backed by SQLite storage, binary attachments persist in **Cloudflare R2**, and contextual conversational AI assistance is powered by **Workers AI**.

---

## Architectural Principles & Edge Isolation

The application was designed to give teams complete ownership of their communication infrastructure within their own Cloudflare account:

* **Mailbox State Isolation (Durable Objects):** Every shared mailbox is represented by a dedicated Durable Object containing its own isolated SQLite database. This ensures zero data bleed between team departments and sub-80ms message reads.
* **Server-Sent Events (SSE) Live Sync:** Mailbox state transitions, thread replies, draft changes, and unread badges stream to connected frontend clients in real time via lightweight SSE connections without polling.
* **Contextual AI Assistance:** An integrated AI side panel searches conversation history, evaluates email threads, and drafts contextual replies directly using Cloudflare Workers AI.
* **One-Click Deploy Pipeline:** Fully packaged with a Cloudflare deploy button, automatically provisioning workers, D1 schemas, and R2 buckets on first initialization.

---

## Key Engineering Challenges & Solutions

### 1. Isolated Mailbox Architecture with Zero Noisy-Neighbor Impact
* **Challenge:** Traditional monolithic multi-tenant databases experience table lock contention when a high-traffic mailbox (e.g. automated alerts or marketing campaigns) receives thousands of emails simultaneously.
* **Solution:**
  * Adopted Cloudflare's Durable Objects architecture.
  * Each mailbox operates as an independent edge compute micro-actor with localized SQLite transactional persistence.
  * Inbound email spikes to one department never degrade UI latency or read throughput for other team mailboxes.

### 2. Large Attachment Upload and Preview Pipeline via Cloudflare R2
* **Challenge:** Processing email attachments directly through worker memory risks hitting serverless RAM limits.
* **Solution:**
  * Streamed email MIME attachments directly into Cloudflare R2 object storage with presigned download and preview URLs.
  * Preserved full attachment security while keeping worker memory usage negligible.

### 3. Real-Time Collaborative Inbox without WebSockets Overhead
* **Challenge:** Maintaining persistent bidirectional WebSockets for thousands of inactive browser tabs incurs high connection costs and reconnection instability on mobile networks.
* **Solution:**
  * Implemented an optimized Server-Sent Events (SSE) streaming endpoint.
  * When incoming mail or status changes occur in the Durable Object, the event streams immediately to active listeners, providing seamless live updates without WebSocket complexity.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Edge Compute** | Cloudflare Workers, Durable Objects | Global serverless execution and isolated stateful mailbox actors. |
| **Databases & Storage** | D1 (SQLite), Cloudflare R2 | Structured thread records and scalable binary email attachments. |
| **AI Integration** | Cloudflare Workers AI | Context-aware email thread summarization and automated reply drafting. |
| **Inbound Email** | Cloudflare Email Routing | Direct DNS-level email ingestion and delivery to worker scripts. |
| **Frontend Workspace** | React 19, React Router v7, Tailwind CSS, Zustand | High-speed email client UI with rich text editing (TipTap) and live SSE sync. |

---

## Open-Source Availability

* **Public Repository:** [https://github.com/developer-sujon/zotlyx-inbox](https://github.com/developer-sujon/zotlyx-inbox)
* **One-Click Deployment:** [Deploy to Cloudflare](https://deploy.workers.cloudflare.com/?url=https://github.com/developer-sujon/zotlyx-inbox)
