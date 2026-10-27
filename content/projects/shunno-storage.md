---
title: "Shunno Storage — Scalable Enterprise Cloud File Storage SaaS"
slug: "shunno-storage"
tagline: "Scalable cloud object storage system with enterprise security, public/private bucket APIs, and responsive management console"
company: "Shunno IT"
kicker: "Cloud Storage & APIs · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Cloud Storage"
metrics:
  - label: "Storage API"
    value: "Public / Private"
    sub: "Token-signed URLs"
  - label: "Metadata Engine"
    value: "MongoDB"
    sub: "High-throughput indexing"
tags:
  - "Express.js"
  - "MongoDB"
  - "Node.js"
  - "Cloud Storage"
  - "REST API"
  - "Docker"
---

## 📌 Executive Summary

**Shunno Storage** is an enterprise-grade cloud file storage SaaS platform built at **Shunno IT**. It provides developers and businesses with scalable object storage APIs for both public and private file delivery, accompanied by an interactive administrative panel for searching, tagging, and managing binary media assets.

---

## ⚙️ Key Technical Implementations

* **Streaming Upload Pipeline:** Engineered chunked multipart file upload endpoints in Express.js with backpressure control to prevent memory overflow on large binary payloads.
* **Granular Access Control:** Developed time-limited signed URLs and token authentication to enforce secure private bucket downloads.
* **Search & Indexing Engine:** Indexed file metadata, MIME types, and hierarchical folder structures in MongoDB for instant searching across millions of stored assets.
