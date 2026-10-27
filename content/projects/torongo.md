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
  - label: "Device Sync"
    value: "< 1.2s"
    sub: "MikroTik RouterOS API"
  - label: "Voucher Engine"
    value: "Batch & POS"
    sub: "Thermal print & QR codes"
  - label: "Backend RPC"
    value: "oRPC Edge"
    sub: "Cloudflare Workers & Hyperdrive"
  - label: "Billing Automation"
    value: "100%"
    sub: "bKash, Nagad, Cards"
tags:
  - "Next.js 15"
  - "Cloudflare Workers"
  - "oRPC"
  - "MikroTik RouterOS API"
  - "Drizzle ORM"
  - "Supabase PostgreSQL"
  - "Cloudflare Hyperdrive"
  - "QStash"
  - "Turborepo"
githubUrl: "https://github.com/yupsis/torongo"
---

## 📌 Executive Summary

**Torongo** is a modern, production-grade, multi-tenant Cloud Hostware and Hotspot Billing Platform built for **ISPs, WISPs, and MikroTik Hotspot Resellers**. It enables network operators to manage multiple MikroTik RouterOS devices, generate & print WiFi vouchers, deploy high-converting captive portals, and collect automated online payments (bKash, Nagad, SSLCommerz, Stripe) through a single unified cloud dashboard.

---

## 🏗 System Architecture & Edge RPC

Torongo is architected for ultra-low latency, multi-tenant isolation, and high scalability across Cloudflare Workers and serverless infrastructure:

* **Edge API Worker (`apps/api`):** Built with **oRPC** running on Cloudflare Workers, providing end-to-end type safety between client and server with sub-20ms edge compute response times.
* **Database Pooling (`Cloudflare Hyperdrive`):** Connects Cloudflare edge workers to Supabase PostgreSQL with pooled TCP connections, eliminating latency spikes during high-concurrency voucher activations.
* **Central MikroTik Cloud Sync:** Connects and manages MikroTik RouterOS devices (v6 & v7) via RouterOS API socket commands or secure WireGuard tunnels to monitor live traffic, interface health, and active sessions.
* **Batch Voucher & POS Printing:** Generates time-based, data-quota, and speed-capped WiFi vouchers with custom validity, PINs, and QR codes ready for thermal POS receipt printing.
* **Automated Captive Portal Billing:** Self-service captive portal voucher purchases with instant automated router activation via bKash, Nagad, and cards.
