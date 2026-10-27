---
title: "NetFee — Enterprise ISP Billing SaaS & Mikrotik Bandwidth Engine"
slug: "netfee"
tagline: "Automated internet service provider billing platform with real-time Mikrotik router provisioning and payment gateway integration"
company: "ShunnoIT"
kicker: "ISP SaaS & Network Automation · ShunnoIT"
role: "Full-Stack Software Engineer"
period: "Nov 2022 – 2023"
status: "Production"
featured: false
badge: "ISP SaaS"
metrics:
  - label: "Provisioning Speed"
    value: "< 1.2s"
    sub: "Mikrotik API bandwidth control"
  - label: "Billing Automation"
    value: "100%"
    sub: "Auto disconnect & recharge"
tags:
  - "Nest.js"
  - "Express.js"
  - "React"
  - "PostgreSQL"
  - "Mikrotik RouterOS API"
  - "Redis"
  - "SMS Gateway"
---

## 📌 Executive Summary

**NetFee** is a multi-tenant ISP billing and client relationship management SaaS platform built at **ShunnoIT**. It automates daily operations for broadband internet providers—including customer subscription lifecycles, automated online renewals via mobile wallets (bKash, Nagad), and real-time bandwidth bandwidth queue configuration via the Mikrotik RouterOS API.

---

## ⚙️ Key Technical Challenges

* **Mikrotik RouterOS Integration:** Synchronized client credentials and bandwidth speeds directly with edge routers. Automated connection disable/enable triggers based on payment verification in under 1.5 seconds.
* **Automated Renewal & SMS Notifications:** Integrated SMS gateways with background cron workers to alert subscribers 3 days prior to expiration and automatically cut off non-paying connections.
* **Reseller Multi-Level Accounting:** Implemented double-entry ledger bookkeeping to calculate reseller commissions and master distributor balances accurately.
