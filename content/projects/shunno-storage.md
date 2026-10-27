---
title: "Shunno Storage — Scalable Enterprise Cloud File Storage SaaS"
slug: "shunno-storage"
tagline: "Scalable cloud object storage system with enterprise security, public/private bucket APIs, streaming multipart uploads, and responsive management console"
company: "Shunno IT"
kicker: "Cloud Storage & Scalable APIs · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production"
featured: false
badge: "Cloud Storage SaaS"
metrics:
  - label: "Upload Memory Buffer"
    value: "< 30MB"
    sub: "Fixed stream backpressure"
  - label: "API Query Latency"
    value: "< 45ms"
    sub: "Indexed MongoDB metadata"
  - label: "Storage Scale"
    value: "Infinite Scale"
    sub: "Chunked binary object store"
  - label: "Signed URL Auth"
    value: "< 5ms"
    sub: "Cryptographic HMAC token"
tags:
  - "Express.js"
  - "MongoDB"
  - "Node.js"
  - "Mongoose"
  - "Stream API"
  - "HMAC Security"
  - "REST API"
  - "Docker"
---

## 📌 Executive Summary

**Shunno Storage** is an enterprise-grade cloud file storage and media delivery SaaS platform built at **Shunno IT**. It delivers highly scalable, secure object storage infrastructure for modern web applications, mobile apps, and enterprise backends.

The platform provides developers and organizations with custom REST APIs for both public CDN assets and private enterprise documents. It features streaming chunked uploads, time-limited presigned download URLs, automated MIME validation, and an interactive, responsive administrative management console with full-text file search and folder hierarchy navigation.

---

## 🏗️ Storage System Architecture & Stream Pipeline

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              SHUNNO STORAGE ARCHITECTURE                               │
│                                                                                        │
│   [Developer API Client / SDK]              [Admin Web Dashboard / File Explorer]      │
│                │                                                │                      │
│                ▼ Streaming Upload / Download Request            ▼ Manage, Move, Search │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │                    Nginx Reverse Proxy & SSL                    │                  │
│   │                    • Client Max Body Size: 5GB                  │                  │
│   │                    • Range Requests Support (HTTP 206)          │                  │
│   └────────────────────────────────┬────────────────────────────────┘                  │
│                                    ▼                                                   │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │               Express.js High-Throughput Storage Core           │                  │
│   │   • Bearer Token Authentication & API Key Validation            │                  │
│   │   • Signed HMAC URL Token Verification (Private Buckets)        │                  │
│   │   • MIME Sniffing & File Extension Sanitization                 │                  │
│   └──────┬──────────────────────────────────────────────────┬───────┘                  │
│          │                                                  │                          │
│          ▼ Stream Pipeline with Backpressure                ▼ Metadata & Hierarchy     │
│   ┌─────────────────────────────────────────┐        ┌──────────────────────────────┐  │
│   │ Node.js Transform Streams (busboy)      │        │ MongoDB Database Cluster     │  │
│   │ • Chunked Upload Stream (Zero RAM blowup│        │ • File Metadata & MIME Types │  │
│   │ • On-the-fly SHA-256 Checksum Compute   │        │ • Folder Tree & Access Paths │  │
│   │ • Dynamic Sharp Thumbnail Pipeline      │        │ • Compound Compound Indexes  │  │
│   └──────┬──────────────────────────────────┘        └──────────────────────────────┘  │
│          │                                                                             │
│          ▼ Direct Binary Storage Write                                                 │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │               Scalable Binary Storage Layer                     │                  │
│   │   • Content-Addressable Storage (CAS) with Hash Deduplication   │                  │
│   │   • Distributed File Volumes & Block Storage                    │                  │
│   │   • Public vs Private Storage Partitioning                      │                  │
│   └─────────────────────────────────────────────────────────────────┘                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Memory-Safe Streaming Multipart Uploads with Backpressure Control
* **The Problem:** When hundreds of users upload multi-gigabyte media files (e.g., HD video assets, raw database backups) concurrently, standard file-parsing middleware (e.g., buffering Multer) loads file chunks into Node.js server RAM. This led to massive memory spikes, V8 heap exhaustion, and catastrophic process crashes.
* **The Solution:**
  * Replaced memory-buffering libraries with native **Node.js Transform Streams** and streaming parsers (`busboy`).
  * Piped incoming binary streams directly from the HTTP request socket to disk storage with explicit stream backpressure handling (`pause()` and `resume()`).
  * Fixed maximum Node.js heap memory usage to **< 30MB per worker thread**, regardless of whether users uploaded a 5MB image or a 4GB raw archive.

### 2. Time-Limited Signed URLs & Granular Access Control
* **The Problem:** Providing direct download links to sensitive corporate documents (contracts, invoices, employee records) allows unauthorized access if URLs are forwarded or shared publicly.
* **The Solution:**
  * Implemented an Amazon S3-style **Presigned URL System**.
  * Download links are generated with an expiration timestamp and an HMAC SHA-256 signature calculated over the bucket ID, file key, and expiration window.
  * When a client requests the private file, Express verifies the cryptographic token in **< 5ms**. If the token has expired or the signature is tampered with, access is denied immediately with HTTP 403 Forbidden.

### 3. Fast File Metadata Search & Hierarchical Folder Indexing in MongoDB
* **The Problem:** As bucket counts grew to millions of records, traditional recursive folder lookups and filename regex searches caused slow database collection scans and 500ms+ response times in the admin file explorer.
* **The Solution:**
  * Modeled file hierarchies using **Materialized Path Patterns** in MongoDB (e.g., `path: "/root/marketing/2024/campaign/"`).
  * Created compound compound indexes on `{ bucketId: 1, path: 1, isDeleted: 1 }` and text indexes on `{ filename: "text" }`.
  * Accelerated file navigation and folder expansion to **sub-45ms** across millions of indexed documents.

### 4. On-the-Fly Image Optimization & Lazy Media Caching
* **The Problem:** Loading high-resolution image galleries in the admin dashboard wasted massive bandwidth and caused slow page rendering.
* **The Solution:**
  * Built an automated thumbnail generation pipeline using **Sharp** (libvips C-bindings).
  * Generated lightweight WebP/AVIF thumbnails on first request and cached them on disk, slashing admin thumbnail payload sizes by **85%**.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **API & Streaming** | **Express.js & Node.js Streams** | Native stream piping, non-blocking I/O, and fine-grained HTTP chunked transfer control. |
| **Metadata Engine** | **MongoDB & Mongoose** | Flexible schema for dynamic file metadata, tags, EXIF data, and fast materialized folder queries. |
| **Binary Optimization** | **Sharp (libvips)** | Ultra-fast multi-threaded image resizing, compression, and WebP transcoding. |
| **Security Layer** | **HMAC SHA-256 Presigned Tokens** | Tamper-proof, time-decaying download URLs for private enterprise storage. |
| **DevOps & Storage** | **Docker & Linux VPS Volumes** | High-capacity block storage mounts with automated volume scaling and Nginx edge caching. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **How does stream backpressure prevent server crashes during large uploads?**
   * *Answer:* If network ingestion speed exceeds disk write speed, the OS buffer fills up. Stream backpressure checks the return value of `writable.write()`. If false, it pauses the readable request stream (`readable.pause()`) until the `'drain'` event fires, keeping memory usage constant and preventing OOM heap crashes.
2. **How does the presigned URL authentication algorithm work?**
   * *Answer:* The server generates a signature `HMAC_SHA256(secretKey, `${bucketId}/${fileKey}:${expiresAt}`)` and appends `?expires=...&signature=...` to the URL. The verifying endpoint re-computes the HMAC using the secret key and compares it against the query signature using timing-safe comparisons.
3. **Why use Materialized Path pattern for folder trees in MongoDB?**
   * *Answer:* Instead of parent-child recursive queries which require multiple round trips, materialized paths allow fetching all descendants in a folder using a single index-accelerated prefix regex query (`{ path: /^/root/documents\// }`).
