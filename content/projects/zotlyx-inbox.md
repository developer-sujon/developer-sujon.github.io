---
title: "Zotlyx Inbox — Open-Source Team Mailbox & AI Assistant"
slug: "zotlyx-inbox"
tagline: "Open-source shared team mailbox built on Cloudflare Workers, Durable Objects, D1 SQLite, R2, and Workers AI"
company: "Open Source"
kicker: "Open-Source Cloudflare Architecture · Personal Project"
role: "Creator & Lead Maintainer"
period: "2024 – Present"
status: "Open Source"
featured: true
badge: "Open Source"
metrics:
  - label: "Storage"
    value: "D1 SQLite & R2"
    sub: "Dedicated storage per mailbox"
  - label: "Live Updates"
    value: "SSE"
    sub: "Server-Sent Events real-time sync"
  - label: "AI Drafting"
    value: "Workers AI"
    sub: "Thread summaries & suggested replies"
  - label: "Deploy"
    value: "1-Click"
    sub: "Cloudflare Deploy Button"
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

**Zotlyx Inbox** ([GitHub Repository](https://github.com/developer-sujon/zotlyx-inbox)) is an open-source, self-hosted shared team mailbox app built entirely on Cloudflare's edge platform. It is designed for startups, development teams, and small companies that want to manage shared email addresses (like `support@`, `hello@`, or `billing@`) collaboratively without paying expensive per-seat monthly fees for SaaS tools.

I created this project to explore how far modern serverless infrastructure can go: incoming emails route through **Cloudflare Email Routing**, each team mailbox runs inside an isolated **Durable Object** with its own SQLite database, email attachments are stored in **Cloudflare R2**, and AI email drafting runs on **Cloudflare Workers AI**.

---

## Architecture & How It Works

Traditional shared inbox software requires maintaining VPS servers, background polling daemons, and database migrations. Zotlyx Inbox runs completely serverless inside your own Cloudflare account:

* **Isolated Mailboxes with Durable Objects:** Every shared mailbox is managed by a dedicated Durable Object containing its own embedded SQLite database. This keeps emails organized and ensures one busy team mailbox never slows down another.
* **Real-Time Streaming with Server-Sent Events (SSE):** Instead of clients polling the server every few seconds to check for new mail, the frontend maintains a lightweight SSE connection. When a new email arrives, it appears on screen instantly.
* **Attachment Storage with Cloudflare R2:** Email attachments (PDFs, screenshots, documents) are parsed out of incoming MIME streams and stored in Cloudflare R2 buckets, keeping the database light.
* **On-Edge AI Drafting (Workers AI):** An integrated AI helper summarizes long customer email threads and drafts suggested reply templates directly within the UI.

---

## Practical Engineering Challenges & Solutions

### 1. Reliable Email Ingestion and Parsing
* **Problem:** Incoming emails arrive as raw MIME multi-part messages with nested headers, HTML bodies, plain text alternatives, and inline attachments. Parsing large emails without exceeding edge memory limits was critical.
* **Solution:**
  * Used lightweight streaming MIME parsers to extract headers, plain text, and HTML safely.
  * Extracted binary attachments and streamed them directly to R2 object storage, generating clean presigned view URLs.

### 2. Multi-User Real-Time Inbox Sync
* **Problem:** When one team member opens an email or marks a ticket as resolved, other team members looking at the same mailbox should see the change right away without needing to manually refresh their browser.
* **Solution:**
  * Connected web clients to the mailbox Durable Object via Server-Sent Events (SSE).
  * State transitions (read status, tags, drafts, replies) broadcast immediately to all connected browsers viewing that mailbox.

### 3. One-Click Self-Hosted Deployment
* **Problem:** Many open-source tools require complex Docker setup, environment configurations, and database hosting, making them hard for non-DevOps users to install.
* **Solution:**
  * Packaged the repository with a Cloudflare "Deploy with Workers" button.
  * The automated script creates the necessary D1 database tables, R2 buckets, and worker bindings automatically on the user's Cloudflare account.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Serverless Backend** | Cloudflare Workers, Hono | Inbound email handler and REST API endpoints. |
| **State & Mailbox** | Durable Objects, D1 (SQLite) | Mailbox state isolation and email thread storage. |
| **File Storage** | Cloudflare R2 | Email attachments, PDFs, and media files. |
| **AI Assistant** | Cloudflare Workers AI | Summarizing email threads and generating reply drafts. |
| **Frontend** | React 19, React Router v7, Tailwind CSS | Clean, responsive web email client with dark mode support. |

---

## Key Results

* **Zero Hosting Costs for Small Teams:** Runs comfortably within Cloudflare's free/low-cost serverless tiers.
* **Privacy & Full Control:** Teams keep complete ownership of their communication data inside their own cloud account.
* **Open Source:** Available on GitHub for anyone to deploy and customize.
