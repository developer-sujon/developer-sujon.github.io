---
title: "Zotlyx — Multi-Channel AI Support & Unified Inbox"
slug: "zotlyx"
tagline: "Multi-channel AI customer support platform connecting Facebook, WhatsApp, Instagram, Telegram, and web chat into a single smart inbox"
company: "Yupsis"
kicker: "Cloudflare Edge & AI Architecture · Yupsis"
role: "Lead Systems Architect & Full Stack Engineer"
period: "2024 – Present"
status: "Production"
featured: true
badge: "Flagship Platform"
metrics:
  - label: "Supported Channels"
    value: "6 Platforms"
    sub: "FB, WA, IG, TG, Web Widget"
  - label: "Edge Compute"
    value: "Cloudflare"
    sub: "Workers & Durable Objects"
  - label: "Database"
    value: "PostgreSQL"
    sub: "Supabase & Hyperdrive"
  - label: "AI & Search"
    value: "Workers AI"
    sub: "Vectorize RAG + Claude"
tags:
  - "Cloudflare Workers"
  - "Durable Objects"
  - "Cloudflare Queues"
  - "Vectorize (RAG)"
  - "Next.js 15"
  - "Hono"
  - "oRPC"
  - "Drizzle ORM"
  - "Supabase PostgreSQL"
  - "Turborepo"
liveUrl: "https://zotlyx.com"
---

## Overview

**Zotlyx** ([https://zotlyx.com](https://zotlyx.com)) is an AI-powered customer support and unified inbox platform built for e-commerce merchants and businesses. It connects multiple communication channels—including **Facebook Page comments and Messenger, Instagram DMs, WhatsApp Business, Telegram, and a website chat widget**—into one shared inbox where human agents and AI assistants can collaborate.

At **Yupsis**, I architected the core system using a **Two-Zone architecture**:
1. An edge messaging zone on Cloudflare Workers to handle incoming webhooks, message grouping, and fast AI responses.
2. A relational database zone on Supabase/PostgreSQL to store store catalogs, orders, team permissions, and conversation history securely.

---

## Architecture: Why Two Zones?

When dealing with social media webhooks, platforms like Meta and WhatsApp send massive spikes of events (for example, during holiday promotions). Processing everything synchronously inside a standard server could quickly overload the database or time out.

* **Zone 1 (Edge Ingestion on Cloudflare):** Inbound webhooks hit lightweight Cloudflare Workers. The workers verify HMAC signatures from Meta/WhatsApp, acknowledge the webhook immediately, and send payloads to background queues.
* **Message Debouncing with Durable Objects:** Real customers rarely send their question in a single message—they send multiple short bursts (e.g. *"Hi"*, *"is this available?"*, *"in black color?"*). A stateful Durable Object holds these messages for 5 seconds, combines them into one coherent question, and only then queries the AI model. This keeps AI answers relevant and avoids redundant API calls.
* **Semantic Product Search (RAG):** When a customer asks about a product, Cloudflare Vectorize finds the most relevant items from the store's knowledge base before drafting the reply.
* **Zone 2 (Database & Admin Dashboard):** Next.js dashboards connect to PostgreSQL through Cloudflare Hyperdrive connection pooling. We use **oRPC** for type-safe API communication between the web frontend and edge backends.

---

## Practical Engineering Challenges & Solutions

### 1. Grouping Rapid Message Bursts Before Calling the AI
* **Problem:** If a customer sends three messages within 4 seconds, calling an LLM three separate times wastes API tokens and produces disjointed, repetitive answers.
* **Solution:**
  * Created a `DebounceSession` using Cloudflare Durable Objects with a 5-second timer.
  * Every incoming message within that 5-second window appends to an active buffer.
  * When the timer finishes with no new messages, the whole conversation chunk is sent to the AI in one prompt.
  * This cut our LLM usage costs substantially and made AI replies sound natural and complete.

### 2. Handling Webhook Traffic Spikes Without Dropped Messages
* **Problem:** During flash sales, thousands of webhooks arrive at the same time. If our backend took 2 seconds to process each one, Meta's servers would time out and stop delivering messages.
* **Solution:**
  * Used **Cloudflare Queues** to decouple webhook ingestion from business processing.
  * The edge worker acknowledges the webhook with an HTTP 200 within 15 milliseconds, placing the message in a queue for background processing.
  * This prevented any dropped inquiries even during heavy promotional spikes.

### 3. Understanding Mixed-Language Customer Queries
* **Problem:** Many customer queries in our region use a mix of local language and English (colloquial phrasing, mixed vocabulary), which standard English-only embedding models misunderstand.
* **Solution:**
  * Used the multilingual `bge-m3` embedding model on Cloudflare Workers AI.
  * Indexed merchant FAQs, return policies, and product details into Cloudflare Vectorize.
  * The system reliably retrieves the correct context even when customer messages are informally phrased.

### 4. Role-Based Permissions for Growing Teams
* **Problem:** Merchants have different team members (support agents, store managers, billing reps) who need different access levels without complicated configuration.
* **Solution:**
  * Built a straightforward permission system supporting scoped permissions (like `inbox:read`, `inbox:reply`, `order:manage`, or `*` for owners).
  * Checked permissions at the middleware layer on every RPC request to ensure strict security across all team roles.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Edge Compute** | Cloudflare Workers, Durable Objects, Hono | Fast webhook ingestion, message grouping, and edge routing. |
| **AI & Search** | Cloudflare Vectorize, Workers AI (`bge-m3`), Claude 3.5 | Semantic search across store FAQs and drafting customer responses. |
| **Queues** | Cloudflare Queues | Non-blocking background message processing and rate-limiting. |
| **Database** | PostgreSQL (Supabase), Cloudflare Hyperdrive | Transactional store data, team permissions, and persistent chats. |
| **Frontend** | Next.js 15, React 19, Tailwind CSS, oRPC | Responsive merchant dashboard, live inbox, and end-to-end type safety. |

---

## Summary of Impact

* **Unified Inbox:** Consolidated 6 different channels into a single dashboard for support teams.
* **Smart Message Grouping:** Prevented fragmented AI answers by waiting for the customer to finish typing their thought.
* **Reliable Ingestion:** Handled high-volume webhook bursts smoothly without dropping customer messages.
