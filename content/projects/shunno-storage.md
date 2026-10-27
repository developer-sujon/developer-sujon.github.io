---
title: "Shunno Storage — Cloud File Storage & Media Service"
slug: "shunno-storage"
tagline: "Internal cloud object storage service with streaming multipart uploads, presigned HMAC URLs, and automatic image optimization"
company: "Shunno IT"
kicker: "Cloud Storage & Scalable APIs · Shunno IT"
role: "Junior Software Engineer"
period: "Dec 2022 – Jun 2025"
status: "Production (Internal)"
featured: false
badge: "Internal Platform"
metrics:
  - label: "Upload Engine"
    value: "Stream Piping"
    sub: "Direct socket-to-disk with Busboy"
  - label: "Security"
    value: "Presigned URLs"
    sub: "Expiring HMAC access tokens"
  - label: "Folder Index"
    value: "MongoDB"
    sub: "Materialized path file hierarchies"
  - label: "Images"
    value: "Sharp"
    sub: "Automated WebP thumbnail generation"
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

**Shunno Storage** is an internal cloud file storage and asset delivery service built at **Shunno IT**. It provides secure object storage and asset hosting for our web applications, client portals, and internal tools.

The platform gives developers REST APIs to upload, organize, and serve both public web media (like profile photos and product thumbnails) and private business files (like PDF receipts, contracts, and database backups) with time-limited access tokens.

---

## Architecture & How It Works

Serving and storing large files requires streaming pipelines that never exhaust server memory:

* **Memory-Safe Stream Piping:** Uploaded files are piped directly from incoming HTTP network streams to physical storage volumes using streaming parsers (`busboy`). Files are never buffered completely in server RAM, keeping memory usage constant regardless of file size.
* **Presigned Access URLs:** Private documents remain inaccessible to the open web. Authorized users request short-lived HMAC-signed URLs that expire automatically after a set period (e.g. 15 minutes).
* **Materialized Path File Trees:** Folder structures and nested directories are stored in MongoDB using materialized path strings (e.g. `/companies/shunno/documents/2024/`). This allows instant directory listings without recursive database lookups.
* **On-Demand WebP Optimization:** High-resolution uploaded images are automatically converted to compressed WebP thumbnails on first request using **Sharp** and cached on disk.

---

## Practical Engineering Challenges & Solutions

### 1. Stopping Server Memory Crashes on Large Uploads
* **Problem:** Default file-upload middleware (like in-memory Multer) buffers uploaded files into Node.js server RAM before writing them to disk. When several users uploaded large video files or zip backups at once, the Node.js process ran out of memory and crashed.
* **Solution:**
  * Replaced memory-buffering libraries with native **Node.js Streams** and `busboy`.
  * As chunks arrive on the network socket, they are piped immediately to the destination storage disk with backpressure handling.
  * Node.js memory footprint stayed low (under 40MB) even while handling concurrent gigabyte-sized uploads.

### 2. Protecting Sensitive Company Documents
* **Problem:** Confidential client documents (like national IDs, contracts, and financial receipts) need to be downloaded by authorized users, but must not be publicly guessable or indexable by search engine bots.
* **Solution:**
  * Stored private files in an isolated folder outside the web server's public root.
  * Generated signed download URLs containing an expiration timestamp and an HMAC SHA-256 signature.
  * If a link is shared or accessed after expiring, the server rejects the request with an HTTP 403.

### 3. Fast Thumbnail Delivery for Slow Mobile Connections
* **Problem:** Users often upload 10MB raw smartphone photos for profile pictures or product listings, which caused slow page loads and high bandwidth usage on mobile connections.
* **Solution:**
  * Integrated the **Sharp** image processing library.
  * Automatically generated lightweight WebP thumbnail versions upon upload and served them with long-lived browser cache headers.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Backend API** | Node.js, Express.js | File upload endpoints, folder management, and auth tokens. |
| **Streaming** | Node.js Streams, Busboy | Memory-safe streaming from network sockets directly to disk. |
| **Media Processing** | Sharp | Automatic WebP conversion and thumbnail resizing. |
| **Database** | MongoDB, Mongoose | File metadata, permissions, and directory path index. |
| **Security** | Crypto, HMAC SHA-256 | Presigned time-limited access tokens for private files. |

---

## Key Results

* **Stable Server Performance:** Streaming uploads completely stopped out-of-memory server crashes.
* **Protected Files:** Secure presigned URLs kept sensitive documents safe from unauthorized access.
* **Fast Page Loads:** WebP image compression sped up client image loading significantly.
