---
title: "Torongo — Cloud-Native ISP & MikroTik Hotspot Billing Platform"
slug: "torongo"
tagline: "Multi-tenant cloud billing and MikroTik hotspot voucher platform managing RouterOS devices, captive portals, and automated online recharges"
company: "Yupsis"
kicker: "Cloud Networking & Hotspot SaaS · Yupsis"
role: "Lead Systems Architect & Full-Stack Engineer"
period: "2024 – Present"
status: "Production"
featured: false
badge: "Hotspot SaaS"
metrics:
  - label: "Edge RPC Latency"
    value: "< 20ms"
    sub: "oRPC on Cloudflare Workers"
  - label: "Device Sync"
    value: "< 1.2s"
    sub: "MikroTik RouterOS API"
  - label: "Voucher Engine"
    value: "10,000 / sec"
    sub: "Batch thermal & QR generation"
  - label: "Billing Automation"
    value: "100%"
    sub: "bKash, Nagad, SSLCommerz"
tags:
  - "Next.js 15"
  - "Cloudflare Workers"
  - "oRPC"
  - "MikroTik RouterOS API"
  - "Drizzle ORM"
  - "Supabase PostgreSQL"
  - "Cloudflare Hyperdrive"
  - "Upstash QStash"
  - "Turborepo"
githubUrl: "https://github.com/yupsis/torongo"
---

## 📌 Executive Summary

**Torongo** is a modern, production-grade, multi-tenant Cloud Hostware and Hotspot Billing Platform engineered for **ISPs, WISPs, and MikroTik Hotspot Resellers**. It enables network operators to manage distributed fleets of MikroTik RouterOS devices, generate and print thousands of WiFi vouchers in seconds, deploy customized captive portals, and collect automated online payments through a single unified cloud dashboard.

The system is built on a **Cloudflare Edge + Serverless PostgreSQL** architecture, delivering sub-20ms edge compute response times, end-to-end type safety between client and server via **oRPC**, and resilient background execution via **Upstash QStash**.

---

## 🏗️ System Architecture & Edge RPC Pipeline

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              TORONGO SYSTEM ARCHITECTURE                               │
│                                                                                        │
│   [WiFi Hotspot User / Captive Portal]        [ISP Operator / POS Cashier]             │
│                 │                                          │                           │
│                 ▼ Purchase Voucher (Web/QR)                ▼ Generate Vouchers / Manage│
│   ┌────────────────────────────────────────────────────────┐                           │
│   │           Cloudflare Edge Global Network (275+ PoPs)   │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              ▼                                                         │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │          apps/api: Cloudflare Workers (oRPC Engine)    │                           │
│   │   • Sub-20ms Edge Routing & TypeScript Type Safety     │                           │
│   │   • JWT Auth & Multi-Tenant Operator Isolation         │                           │
│   │   • Dynamic Input Validation & Error Handling          │                           │
│   └──────┬───────────────────┬───────────────────┬─────────┘                           │
│          │                   │                   │                                     │
│          ▼                   ▼                   ▼                                     │
│   ┌───────────────┐   ┌───────────────┐   ┌────────────────────────┐                   │
│   │ Voucher Engine│   │ Payment Ingest│   │ RouterOS Sync Engine   │                   │
│   │ • Batch Gen   │   │ • bKash/Nagad │   │ • Socket Connection    │                   │
│   │ • ESC/POS QR  │   │ • Instant Webh│   │ • User / Profile Sync  │                   │
│   └──────┬────────┘   └──────┬────────┘   └──────┬─────────────────┘                   │
│          │                   │                   │                                     │
│          ▼                   ▼                   ▼                                     │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │             Cloudflare Hyperdrive (TCP Pooling)        │                           │
│   │             (Accelerates edge connections to Postgres) │                           │
│   └──────────────────────────┬─────────────────────────────┘                           │
│                              │                                                         │
│              ┌───────────────┴───────────────┐                                         │
│              ▼                               ▼                                         │
│   ┌───────────────────────┐      ┌───────────────────────────────────┐                 │
│   │ Supabase PostgreSQL   │      │ Upstash QStash (Serverless Queues)│                 │
│   │ • Drizzle ORM Schemas │      │ • Async Router Provisioning       │                 │
│   │ • Tenant Data Scopes  │      │ • Hourly Expiration Cron Checks   │                 │
│   └───────────────────────┘      └─────────────────┬─────────────────┘                 │
│                                                    │                                   │
│                                                    ▼ RouterOS API Port 8728/8729       │
│                                      ┌─────────────────────────────┐                   │
│                                      │ MikroTik RouterOS v6 / v7   │                   │
│                                      │ • /ip/hotspot/user          │                   │
│                                      │ • /ip/hotspot/user/profile  │                   │
│                                      │ • /ip/hotspot/active        │                   │
│                                      └─────────────────────────────┘                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Sub-20ms End-to-End Type Safety on Edge with oRPC
* **The Problem:** Traditional REST APIs require maintaining duplicated TypeScript interface definitions between frontend clients and backend microservices. Traditional RPC tools (like tRPC) often struggle with edge execution constraints and bundle bloat on Cloudflare Workers.
* **The Solution:**
  * Adopted **oRPC**, an ultra-lightweight, edge-native RPC framework.
  * Defined pure TypeScript contract schemas in `@repo/api-contract`: any change to voucher generation inputs, router sync commands, or operator permissions immediately surfaces compile-time type errors across the Next.js 15 client dashboard.
  * Edge workers boot instantly with zero cold-start delay, delivering end-to-end request latencies under **20ms**.

### 2. High-Performance Database Connection Pooling with Cloudflare Hyperdrive
* **The Problem:** Cloudflare Workers are distributed globally across hundreds of edge locations. Each incoming request establishing a fresh TCP/TLS handshake with a central PostgreSQL database causes high latency (300ms+) and database connection exhaustion.
* **The Solution:**
  * Connected Drizzle ORM through **Cloudflare Hyperdrive**.
  * Hyperdrive maintains a pre-warmed pool of persistent TCP connections from Cloudflare's regional compute nodes directly to Supabase PostgreSQL.
  * Cut edge database query times by **85%**, enabling instantaneous voucher lookups and multi-tenant billing queries.

### 3. High-Throughput Batch Voucher Generation & ESC/POS Thermal Printing
* **The Problem:** Hotspot resellers frequently generate batches of 1,000 to 5,000 vouchers at a time (e.g., 1-hour, 1-day, 1-week passes) and print them on 58mm/80mm thermal receipt rolls for street retail distribution. Generating vouchers sequentially caused browser freezes and timeout failures.
* **The Solution:**
  * Engineered a batch crypto generator producing randomized alphanumeric PINs with collision check hashes in chunks of 10,000 records within milliseconds.
  * Designed an ESC/POS print layout engine using SVG QR codes and monospace layouts, enabling one-click bulk thermal printing directly from the operator browser.

### 4. Remote MikroTik Router Sync Across NAT & Firewalls
* **The Problem:** Hotspot routers in hotels, campuses, and rural ISP branches operate behind NAT and ISP firewalls without public static IPs, making direct cloud-to-router connections impossible.
* **The Solution:**
  * Implemented a dual sync strategy:
    * *Direct Mode:* Routers with public IPs or dynamic DNS connect via encrypted RouterOS API (port 8729).
    * *Tunnel Mode:* Remote routers establish lightweight WireGuard tunnels back to the platform gateway, allowing the cloud controller to execute `/ip/hotspot/user/add` commands securely in under **1.2 seconds**.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Edge Compute** | **Cloudflare Workers** | Global sub-20ms edge compute with zero server maintenance and infinite horizontal scaling. |
| **API Protocol** | **oRPC** | End-to-end type safety between client and server without code generation overhead. |
| **Database & Pooling** | **Drizzle ORM, Supabase, Hyperdrive** | Type-safe SQL queries combined with edge connection pooling. |
| **Frontend Dashboard** | **Next.js 15 & Tailwind CSS** | Server Components for instant dashboard rendering and fast thermal receipt preview. |
| **Task Queue & Cron** | **Upstash QStash** | Serverless message queue for asynchronous router provisioning and recurring expiration checks. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **Why oRPC over traditional REST or GraphQL?**
   * *Answer:* oRPC eliminates the need to manually write API clients, serialization, or fetch wrappers. It gives the developer experience of calling a local TypeScript function with full autocompletion, type inference, and runtime validation on the Cloudflare Workers edge.
2. **How does Cloudflare Hyperdrive solve edge database latency?**
   * *Answer:* Cloudflare Workers are stateless and spin up in the edge data center closest to the user. Connecting to PostgreSQL in another region requires multiple TCP/TLS round-trips. Hyperdrive maintains persistent connections across Cloudflare’s backbone network, caching query plans and eliminating connection overhead.
3. **How does captive portal payment work without existing internet access?**
   * *Answer:* In MikroTik Hotspot settings, the payment gateway domains (e.g., `*.bkash.com`, `api.torongo.com`) are added to the `/ip/hotspot/walled-garden`. Unauthenticated users can access the payment page and complete mobile payments; upon webhook receipt, the cloud worker activates the voucher credentials automatically.
