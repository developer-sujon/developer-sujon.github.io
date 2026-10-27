---
title: "Torongo — Cloud ISP & MikroTik Hotspot Billing"
slug: "torongo"
tagline: "Cloud billing and MikroTik hotspot voucher platform managing RouterOS devices, captive portals, and automated online recharges"
company: "Yupsis"
kicker: "Cloud Networking & Hotspot SaaS · Yupsis"
role: "Lead Systems Architect & Full-Stack Engineer"
period: "2024 – Present"
status: "Production"
featured: false
badge: "Hotspot SaaS"
metrics:
  - label: "Routers"
    value: "MikroTik"
    sub: "RouterOS v6 & v7 API"
  - label: "Edge API"
    value: "oRPC"
    sub: "Cloudflare Workers"
  - label: "Payments"
    value: "bKash & Nagad"
    sub: "Automated wallet recharges"
  - label: "Database"
    value: "PostgreSQL"
    sub: "Supabase & Hyperdrive"
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

**Torongo** ([https://torongo.app](https://torongo.app)) is a cloud billing and WiFi hotspot voucher platform designed for **Internet Service Providers (ISPs), campus networks, and MikroTik hotspot resellers**. It enables network owners to manage fleets of MikroTik routers, generate and print WiFi vouchers in bulk, customize captive portal login pages, and collect online payments directly from users.

At **Yupsis**, I architected the platform to connect modern cloud web apps with physical networking hardware, ensuring that when a customer pays for an internet package, their access is activated on the router instantly without manual operator work.

---

## Architecture & How It Works

Managing routers remotely over the internet requires reliable connectivity and fast API response times:

* **Edge API with oRPC:** The backend runs on Cloudflare Workers using **oRPC**. This gives us end-to-end type safety between the Next.js frontend and edge API endpoints, with fast responses and zero server cold-starts.
* **Persistent Database Pooling:** Edge workers connect to Supabase PostgreSQL via **Cloudflare Hyperdrive**, maintaining an active pool of database connections to keep query times snappy.
* **Background Task Queuing (Upstash QStash):** Batch operations—like generating 5,000 thermal print vouchers or checking expiring user packages—are queued in background tasks so the web dashboard stays responsive.
* **RouterOS API Communication:** We communicate with MikroTik routers using their native API service (ports 8728/8729 TLS), running direct commands to create user profiles, set bandwidth limits, and manage active sessions.

---

## Practical Engineering Challenges & Solutions

### 1. Connecting to Routers Behind NAT and Private Firewalls
* **Problem:** Many client routers are installed in remote cafes, hotels, or rural areas without a public IP address. Because they sit behind carrier-grade NAT (CGNAT), standard cloud servers cannot reach them directly.
* **Solution:**
  * Added support for encrypted VPN/WireGuard overlay tunnels.
  * When a private router connects out to our relay endpoint, a persistent tunnel opens, allowing our API to send commands securely without requiring a static public IP from the ISP.

### 2. Fast Bulk Voucher Generation & Printing
* **Problem:** Hotspot resellers frequently print batches of thousands of vouchers before events or monthly sales. Rendering thousands of QR codes and card graphics directly in the browser froze the user's tab.
* **Solution:**
  * Moved the voucher generation logic to a background worker using batch database inserts.
  * Generated lightweight vector-based print layouts that browser print dialogs can render without high memory consumption.
  * Allowed operators to download ready-to-print PDF and thermal-printer formats in seconds.

### 3. Automated Online Customer Recharges
* **Problem:** When a user's hotspot time expires, they should be able to buy another package using mobile wallets (bKash or Nagad) and get reconnected immediately, without waiting for an administrator.
* **Solution:**
  * Integrated payment gateways with verified webhook callbacks.
  * Once the webhook confirms the transaction, a background worker updates the database, creates or extends the user's hotspot profile on the MikroTik router, and logs the customer back in automatically.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Edge Backend** | Cloudflare Workers, oRPC, Hono | Fast serverless API endpoints and strict type contracts. |
| **Database** | PostgreSQL (Supabase), Drizzle ORM | Customer profiles, voucher inventory, and financial transaction logs. |
| **Networking** | MikroTik RouterOS API, WireGuard | Direct router command execution and captive portal management. |
| **Background Queues** | Upstash QStash | Asynchronous voucher batches and router synchronization tasks. |
| **Frontend** | Next.js 15, React 19, Tailwind CSS | Dashboard for ISP admins, voucher printer tool, and mobile captive portal. |

---

## Key Results

* **Hands-Free Automation:** Users recharge their own WiFi access via bKash/Nagad without requiring manual operator intervention.
* **High Efficiency:** Bulk voucher generation works smoothly even for thousands of cards at once.
* **Flexible Networking:** Manages routers both on public static IPs and behind private NAT connections.
