---
title: "Zotlyx — AI-Driven Omnichannel Support & RBAC Engine"
slug: "zotlyx"
tagline: "Autonomous multi-channel AI customer support platform with sub-second delivery and two-zone edge architecture"
company: "Yupsis"
kicker: "Cloudflare Edge & AI Architecture · Yupsis"
role: "Lead Systems Architect & Full Stack Engineer"
period: "2024 – Present"
status: "Production"
featured: true
badge: "Flagship Platform"
stars: "Enterprise Grade"
metrics:
  - label: "Message Delivery"
    value: "< 250ms"
    sub: "Global edge routing"
  - label: "LLM Cost Reduction"
    value: "68%"
    sub: "Via DO 5s burst debouncer"
  - label: "Omnichannel Support"
    value: "6 Platforms"
    sub: "FB, WA, IG, TG, Web Widget"
  - label: "Architecture"
    value: "Two-Zone"
    sub: "Edge Workers + Supabase DB"
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

**Zotlyx** ([https://zotlyx.com](https://zotlyx.com)) is an enterprise-ready, multi-tenant AI Omnichannel Chat and Role-Based Access Control (RBAC) platform. It enables digital commerce merchants to deploy autonomous, context-aware AI support agents across **Facebook Page Comments, Facebook Messenger, Instagram DM, WhatsApp Business, Telegram, and HTML5 Website Widgets** while maintaining a unified real-time agent inbox and order management console.

To balance high-concurrency webhook ingestion with strict transactional database integrity, Zotlyx was designed around a **Two-Zone Split Architecture**: an edge-optimized messaging ingestion pipeline on Cloudflare Workers paired with a transactional administration zone on Supabase/PostgreSQL.

---

## Architectural Principles & Two-Zone Split

The platform separates real-time edge streaming from transactional business persistence:

### Zone 1: Cloudflare Edge Compute & Messaging
* **Edge Ingestion:** Lightweight edge workers receive inbound webhooks from Meta, WhatsApp, and Telegram, validating cryptographic HMAC signatures and normalizing heterogeneous payload formats in sub-15ms.
* **Message Buffering (Durable Objects):** Inbound messages route into stateful Durable Objects that aggregate conversational bursts into a single cohesive AI query context before invoking LLM synthesis.
* **Vector Semantic Retrieval (RAG):** Contextual search uses Cloudflare Vectorize with multilingual embeddings (`bge-m3`), fetching relevant merchant product catalog chunks in under 35ms.

### Zone 2: Transactional Administration & Persistence
* **PostgreSQL with Hyperdrive:** High-concurrency database queries connect through Cloudflare Hyperdrive connection pooling, providing sub-20ms edge-to-database query execution.
* **Type-Safe API Contracts:** All inter-service and client-server boundaries communicate via **oRPC**, guaranteeing 100% end-to-end TypeScript contract synchronization between frontend dashboards and backend edge workers.

---

## Key Engineering Challenges & Solutions

### 1. Eliminating Redundant LLM Invocations via Stateful Debouncing
* **Challenge:** In real-world messaging, human customers rarely send their question in a single message; they send rapid bursts (e.g. *"Hi"*, *"is this available?"*, *"in black color?"*). Triggering an LLM call for every individual webhook quadrupled token costs and generated fragmented, nonsensical responses.
* **Solution:**
  * Engineered a stateful `DebounceSession` Durable Object with a 5-second sliding inactivity window.
  * Consecutive incoming messages within 5 seconds append to an active conversational session buffer.
  * Once the alarm fires without new messages, the consolidated buffer synthesizes into a single comprehensive prompt, **reducing LLM inference costs by 68%** and delivering coherent answers.

### 2. High-Throughput Multi-Platform Webhook Concurrency
* **Challenge:** Live marketing flash sales generate sudden bursts of thousands of simultaneous webhooks across Facebook, Instagram, and WhatsApp. Synchronous processing resulted in database connection pool saturation and downstream webhook timeouts.
* **Solution:**
  * Implemented an asynchronous queue architecture using **Cloudflare Queues**.
  * Edge workers immediately return HTTP 200 acknowledgements to platform providers within 15ms while enqueuing normalized payloads for background worker processing.
  * Achieved 99.99% webhook delivery success with zero dropped customer inquiries during traffic spikes.

### 3. Sub-35ms Multilingual Semantic Retrieval (RAG)
* **Challenge:** E-commerce customer queries in South Asia and Southeast Asia heavily utilize colloquial phrasing, transliteration, and code-switching (e.g., Banglish or mixed vocabulary) that standard English-only embedding models fail to interpret accurately.
* **Solution:**
  * Integrated Cloudflare Workers AI with the multilingual `bge-m3` embedding model.
  * Indexed merchant FAQs, return policies, and stock catalogs into Cloudflare Vectorize.
  * Query payloads undergo semantic vector search at the edge, returning contextual knowledge chunks in under 35ms before synthesizing the final response with Claude 3.5 Sonnet.

### 4. Enterprise-Grade Scoped RBAC with Wildcard Permissions
* **Challenge:** Multi-tenant merchants require granular employee access tiers (Store Owners, Inventory Managers, Tier-1 Support, Billing Reps) without hardcoded role spaghetti.
* **Solution:**
  * Designed an in-house permission system supporting scoped wildcard matching (e.g. `*`, `product:*`, `inbox:read`, `order:create`).
  * Enforced at the middleware level on every RPC invocation, preventing privilege escalation while maintaining clean authorization boundaries.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Edge Compute** | Cloudflare Workers, Durable Objects, Hono | Global low-latency compute, stateful session debouncing, and lightweight edge routing. |
| **AI & Vector Search** | Cloudflare Vectorize, Workers AI (`bge-m3`), Claude 3.5 | Edge RAG pipeline, semantic vector indexing, and autonomous conversational synthesis. |
| **Messaging & Queues** | Cloudflare Queues | Non-blocking asynchronous message ingestion and outbound delivery throttling. |
| **Persistence & Pool** | Supabase PostgreSQL, Drizzle ORM, Hyperdrive | Relational data persistence, schema migrations, and pooled edge database connections. |
| **API Protocol** | oRPC, TypeScript | End-to-end type safety across client and server with zero boilerplate. |
| **Frontend Console** | Next.js 15 (App Router), Tailwind CSS, Zustand | Real-time merchant inbox, live chat streaming, and role-based administration. |

---

## Measurable Production Impact

* **< 250ms Delivery:** Global round-trip message delivery across live customer channels.
* **68% Cost Savings:** Dramatic reduction in monthly OpenAI/Claude token consumption through stateful debouncing.
* **6 Messaging Networks:** Unified Facebook, Messenger, Instagram, WhatsApp, Telegram, and Web Widget in a single interface.
* **Zero Downtime:** Continuous edge deployment with automated rollbacks and zero server maintenance overhead.
