---
title: "Shunno Storage — Scalable Enterprise Cloud File Storage SaaS"
slug: "shunno-storage"
tagline: "Scalable cloud object storage system with enterprise security, public/private bucket APIs, streaming multipart uploads, and responsive management console"
company: "Shunno IT"
kicker: "Cloud Storage & Scalable APIs · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production (Internal)"
featured: false
badge: "Internal Platform"
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

## Overview

**Shunno Storage** is an enterprise-grade cloud file storage and media delivery SaaS platform built at **Shunno IT**. It delivers highly scalable, secure object storage infrastructure for modern web applications, mobile apps, and enterprise backends.

The platform provides developers and organizations with custom REST APIs for both public CDN assets and private enterprise documents. It features streaming chunked uploads, time-limited presigned download URLs, automated MIME validation, and an interactive, responsive administrative management console with full-text file search and folder hierarchy navigation.

---

## Architectural Principles & Stream Pipeline

The platform is engineered around stream processing to prevent server memory saturation:

* **Stream Piping with Backpressure:** Upload payloads are never buffered into RAM. Inbound binary HTTP streams pipe directly from the network socket to physical disk volumes with explicit flow control.
* **Cryptographic Presigned URLs:** Private documents remain inaccessible to the public internet, requiring time-limited HMAC SHA-256 tokens for verified file retrieval.
* **Materialized Path Hierarchy:** Folder trees and file locations are indexed using materialized path strings in MongoDB, allowing sub-45ms recursive folder lookups without relational table joins.
* **Lazy Media Transcoding:** High-resolution image assets are transformed into optimized WebP thumbnails on first access using Sharp and cached on disk.

---

## Key Engineering Challenges & Solutions

### 1. Memory-Safe Streaming Multipart Uploads with Backpressure Control
* **Challenge:** When hundreds of users upload multi-gigabyte media files (e.g. video files, database backups) concurrently, standard file-parsing middleware (like buffering Multer) loads file chunks into Node.js server RAM. This led to massive memory spikes, V8 heap exhaustion, and catastrophic process crashes.
* **Solution:**
  * Replaced memory-buffering libraries with native **Node.js Transform Streams** and streaming parsers (`busboy`).
  * Piped incoming binary streams directly from the HTTP request socket to disk storage with explicit stream backpressure handling (`pause()` and `resume()`).
  * Fixed maximum Node.js heap memory usage to **< 30MB per worker thread**, regardless of whether users uploaded a 5MB image or a 4GB raw archive.

### 2. Time-Limited Signed URLs & Granular Access Control
* **Challenge:** Providing direct download links to sensitive corporate documents (contracts, invoices, employee records) allows unauthorized access if URLs are forwarded or shared publicly.
* **Solution:**
  * Implemented an Amazon S3-style **Presigned URL System**.
  * Download links are generated with an expiration timestamp and an HMAC SHA-256 signature calculated over the bucket ID, file key, and expiration window.
  * When a client requests the private file, Express verifies the cryptographic token in **< 5ms**. If the token has expired or the signature is tampered with, access is denied immediately with HTTP 403 Forbidden.

### 3. Fast File Metadata Search & Hierarchical Folder Indexing in MongoDB
* **Challenge:** As bucket counts grew to millions of records, traditional recursive folder lookups and filename regex searches caused slow database collection scans and 500ms+ response times in the admin file explorer.
* **Solution:**
  * Modeled file hierarchies using **Materialized Path Patterns** in MongoDB (e.g. `path: "/root/marketing/2024/campaign/"`).
  * Created compound indexes on `{ bucketId: 1, path: 1, isDeleted: 1 }` and text indexes on `{ filename: "text" }`.
  * Accelerated file navigation and folder expansion to **sub-45ms** across millions of indexed documents.

### 4. On-the-Fly Image Optimization & Lazy Media Caching
* **Challenge:** Loading high-resolution image galleries in the admin dashboard wasted massive bandwidth and caused slow page rendering.
* **Solution:**
  * Built an automated thumbnail generation pipeline using **Sharp** (libvips C-bindings).
  * Generated lightweight WebP thumbnails on first request and cached them on disk, slashing admin thumbnail payload sizes by **85%**.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **API & Streaming** | Express.js, Node.js Streams | Native stream piping, non-blocking I/O, and fine-grained HTTP chunked transfer control. |
| **Metadata Engine** | MongoDB, Mongoose | Flexible schema for dynamic file metadata, tags, EXIF data, and fast materialized folder queries. |
| **Binary Optimization** | Sharp (libvips) | Ultra-fast multi-threaded image resizing, compression, and WebP transcoding. |
| **Security Layer** | HMAC SHA-256 Presigned Tokens | Tamper-proof, time-decaying download URLs for private enterprise storage. |
| **DevOps & Storage** | Docker, Linux VPS Volumes | High-capacity block storage mounts with automated volume scaling and Nginx edge caching. |

---

## Measurable Production Impact

* **< 30MB Memory Usage:** Stream backpressure prevented OOM process crashes during heavy concurrent uploads.
* **< 45ms Query Latency:** Indexed MongoDB materialized paths for instant folder traversal.
* **85% Bandwidth Reduction:** Automated WebP thumbnail generation for admin media previews.
