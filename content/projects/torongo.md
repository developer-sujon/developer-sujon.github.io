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
liveUrl: "https://torongo.app"
---

## Overview

**Torongo** ([https://torongo.app](https://torongo.app)) is a modern, production-grade, multi-tenant Cloud Hostware and Hotspot Billing Platform engineered for **ISPs, WISPs, and MikroTik Hotspot Resellers**. It enables network operators to manage distributed fleets of MikroTik RouterOS devices, generate and print thousands of WiFi vouchers in seconds, deploy customized captive portals, and collect automated online payments through a single unified cloud dashboard.

The system is built on a **Cloudflare Edge + Serverless PostgreSQL** architecture, delivering sub-20ms edge compute response times, end-to-end type safety between client and server via **oRPC**, and resilient background execution via **Upstash QStash**.

---

## Architectural Principles & Edge Design

Torongo leverages modern edge serverless infrastructure to eliminate cold-start latencies and ensure multi-tenant security:

* **Edge-Native RPC (oRPC):** The API executes directly on Cloudflare Workers, providing lightweight sub-20ms edge routing and pure TypeScript contract validation between client dashboards and serverless backends.
* **Persistent Database Pooling (Hyperdrive):** Cloudflare Hyperdrive maintains a pre-warmed pool of persistent TCP connections between edge compute nodes and central Supabase PostgreSQL databases, cutting connection latency by 85%.
* **Decoupled Asynchronous Tasks:** Asynchronous router provisioning and periodic voucher expiration checks execute through Upstash QStash serverless queues, preventing request timeouts.
* **Dual Router Connectivity:** Supports direct API socket connections (port 8728/8729 TLS) for public-IP devices and encrypted WireGuard overlay tunnels for routers situated behind NATs or ISP firewalls.

---

## Key Engineering Challenges & Solutions

### 1. Sub-20ms End-to-End Type Safety on the Edge with oRPC
* **Challenge:** Traditional REST APIs require maintaining duplicated TypeScript interface definitions between frontend clients and backend microservices. Traditional RPC tools (like tRPC) often struggle with edge execution constraints and bundle bloat on Cloudflare Workers.
* **Solution:**
  * Adopted **oRPC**, an ultra-lightweight, edge-native RPC framework.
  * Defined shared TypeScript contract schemas: any modification to voucher generation parameters, router sync commands, or operator permissions immediately triggers compile-time type validation across the Next.js 15 client dashboard.
  * Edge workers boot instantaneously with zero cold-start delay, delivering end-to-end request latencies under **20ms**.

### 2. High-Performance Database Connection Pooling with Cloudflare Hyperdrive
* **Challenge:** Cloudflare Workers are distributed globally across hundreds of edge locations. Each incoming request establishing a fresh TCP/TLS handshake with a central PostgreSQL database causes high latency (300ms+) and database connection exhaustion.
* **Solution:**
  * Connected Drizzle ORM through **Cloudflare Hyperdrive**.
  * Hyperdrive maintains a pre-warmed pool of persistent TCP connections from Cloudflare's regional compute nodes directly to Supabase PostgreSQL.
  * Cut edge database query times by **85%**, enabling instantaneous voucher lookups and multi-tenant billing queries.

### 3. High-Throughput Batch Voucher Generation & ESC/POS Thermal Printing
* **Challenge:** Hotspot resellers frequently generate batches of 1,000 to 5,000 vouchers at a time (e.g., 1-hour, 1-day, 1-week passes) and print them on 58mm/80mm thermal receipt rolls for street retail distribution. Generating vouchers sequentially caused browser freezes and timeout failures.
* **Solution:**
  * Engineered a batch crypto generator producing randomized alphanumeric PINs with collision check hashes in chunks of 10,000 records within milliseconds.
  * Designed an ESC/POS print layout engine using SVG QR codes and monospace layouts, enabling one-click bulk thermal printing directly from the operator browser.

### 4. Remote MikroTik Router Sync Across NAT & Firewalls
* **Challenge:** Hotspot routers in hotels, campuses, and rural ISP branches operate behind NAT and ISP firewalls without public static IPs, making direct cloud-to-router connections impossible.
* **Solution:**
  * Implemented a dual sync strategy:
    * *Direct Mode:* Routers with public IPs or dynamic DNS connect via encrypted RouterOS API (port 8729).
    * *Tunnel Mode:* Remote routers establish lightweight WireGuard tunnels back to the platform gateway, allowing the cloud controller to execute `/ip/hotspot/user/add` commands securely in under **1.2 seconds**.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Edge Compute** | Cloudflare Workers, oRPC | Global sub-20ms edge API execution with end-to-end type safety. |
| **Database & Pooling** | Drizzle ORM, Supabase, Hyperdrive | Type-safe SQL queries combined with pooled edge database connections. |
| **Frontend Dashboard** | Next.js 15, React 19, Tailwind CSS | High-performance operator dashboard and bulk thermal print previews. |
| **Task Queue & Cron** | Upstash QStash | Serverless message queue for asynchronous router provisioning and expiration checks. |
| **Router Protocols** | RouterOS API, WireGuard | Low-latency binary socket commands and secure VPN tunneling across NATs. |

---

## Measurable Production Impact

* **< 20ms RPC Response:** Blazing-fast edge compute for all operator actions.
* **10,000 Vouchers / Sec:** Instantaneous batch voucher and QR code creation.
* **100% Billing Automation:** Self-service captive portal recharges with automated router activation.
