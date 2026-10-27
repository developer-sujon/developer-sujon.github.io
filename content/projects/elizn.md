---
title: "Elizn — Million-Row Spreadsheet Engine & Remote Team Activity Tracker"
slug: "elizn"
tagline: "Rendering and analyzing millions of data cells in a single sheet without freezing the browser UI thread"
company: "Sitgram"
role: "Senior Frontend & Data Systems Engineer"
period: "2023 – 2024"
status: "Production"
featured: true
kicker: "Big Data & Spreadsheet Virtualization · Sitgram"
badge: "Million-Row Sheet"
stars: "High Performance"
metrics:
  - label: "Sheet Capacity"
    value: "1,000,000+"
    sub: "Cells virtualized in 1 sheet"
  - label: "Scroll Frame Rate"
    value: "60 FPS"
    sub: "< 16ms render budget"
  - label: "UI Thread Freeze"
    value: "0 ms"
    sub: "Web Worker offloaded"
  - label: "Database Sync"
    value: "Real-time"
    sub: "Supabase & Drizzle ORM"
tags:
  - "Next.js 15"
  - "Handsontable"
  - "Web Workers"
  - "Supabase PostgreSQL"
  - "Drizzle ORM"
  - "Zustand"
  - "PostHog"
  - "Docker"
githubUrl: "https://github.com/yupsisofficial/elizn"
liveUrl: "https://elizn.com"
---

## 📌 Executive Summary

**Elizn** is a remote team performance monitoring and data-entry management platform built for **Sitgram**. It provides granular, real-time tracking of employee productivity through an interactive, Google Sheets-style spreadsheet interface capable of tracking cell-level edits, keystrokes, active hours, and data entry workflows.

The paramount engineering hurdle was architectural: **managing, rendering, and computing analytics over millions of data points inside a single spreadsheet without locking the user interface or crashing the browser tab.**

---

## 🏗️ Virtualized Spreadsheet Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              ELIZN SPREADSHEET ARCHITECTURE                            │
│                                                                                        │
│   [User / Data Entry Operator]                                                         │
│                │                                                                       │
│                ▼ Real-Time Keystrokes & Cell Navigation (Sub-5ms Latency)              │
│   ┌─────────────────────────────────────────────────────────────────┐                  │
│   │                 Browser Main Thread (React 19 UI)               │                  │
│   │  • Dual-Axis Virtualized Viewport (~50 rows × 15 visible cells) │                  │
│   │  • Strict 60 FPS Scroll Render Budget (< 16ms per frame)        │                  │
│   │  • Lightweight Event Debouncer (Zustand Undo/Redo Buffer)       │                  │
│   └──────┬──────────────────────────────────────────────────┬───────┘                  │
│          │                                                  │                          │
│          ▼ Zero-Copy ArrayBuffer Transferable               ▼ Batch Cell Diff Payload  │
│   ┌─────────────────────────────────────────┐        ┌──────────────────────────────┐  │
│   │ Web Worker (Off-Thread Compute Engine)  │        │ Supabase Edge Functions      │  │
│   │ • Formula Evaluator & Aggregations      │        │ • PostgreSQL Batch Insert    │  │
│   │ • CSV / Excel Export Streaming          │        │ • Drizzle ORM Mutations      │  │
│   │ • Hourly Productivity Variance Analysis │        │ • Time-Series Partitioning   │  │
│   └─────────────────────────────────────────┘        └──────────────┬───────────────┘  │
│                                                                     │                  │
│                                                                     ▼                  │
│                                                      ┌──────────────────────────────┐  │
│                                                      │ PostgreSQL Database          │  │
│                                                      │ • Tenant Time-Series Tables  │  │
│                                                      │ • PostHog Telemetry Pipeline │  │
│                                                      └──────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ The Star Challenge: Millions of Data Points in 1 Sheet

### 1. The Browser Rendering Cliff
* **The Problem:** Standard DOM nodes become unusable when rendering more than a few thousand rows. At 50,000+ rows (with multiple columns per row, resulting in 500,000+ cells), normal React reconciliation freezes the JavaScript main thread, causing 100% CPU lockups, sluggish scrolling, and browser "Page Unresponsive" crashes.
* **The Solution:** 
  - Integrated and customized **Handsontable** with strict dual-axis window virtualization.
  - At any given instant, only the visible viewport cells (~50 rows × 15 columns = ~750 DOM elements) are physically rendered in the DOM tree.
  - Calculated absolute row/column offsets dynamically to maintain continuous 60 FPS scrolling speeds across millions of virtualized records.

### 2. Offloading Formula Computation & Aggregation to Web Workers
* **The Problem:** Calculating productivity analytics (typing cadence, error rates, hourly throughput, statistical variance) over hundreds of thousands of cell edits on the main thread produced micro-stutters during data entry.
* **The Solution:**
  - Implemented background **Web Workers** for all heavy statistical computations, CSV parsing, and diff evaluations.
  - Transferred raw data chunks to the worker using `ArrayBuffer` transferables (zero-copy memory sharing).
  - Main UI thread never pauses, ensuring sub-5ms keyboard latency for data-entry operators.

### 3. Real-Time Streaming & Database Partitioning
* **The Problem:** Thousands of remote workers continuously emitting cell change events causes massive PostgreSQL row lock contention and database write saturation.
* **The Solution:**
  - Engineered time-bucketed event aggregation on the client side using **Zustand** debouncers.
  - Grouped bulk changes into atomic batch transactions processed via **Supabase Edge Functions** and **Drizzle ORM**.
  - Implemented PostgreSQL table partitioning by merchant tenant and billing cycle, keeping query response times under 20ms.

---

## 🛠️ Architecture Stack

* **Spreadsheet Engine:** `@handsontable/react-wrapper` with customized virtual DOM renderers.
* **Framework:** Next.js 15 (App Router) with React 19.
* **State Management:** Zustand with custom middleware for undo/redo stacks and debounced persistence.
* **Database & ORM:** Supabase (PostgreSQL) + Drizzle ORM + Drizzle Studio.
* **Analytics:** PostHog telemetry & custom session tracking.
* **Deployment:** Docker, Supabase Edge Functions, and Vercel.

---

## 🏆 Business Impact & Metrics

* **Zero Frame Drops:** Maintained silky-smooth 60fps scrolling and instant filtering across 1,000,000+ data cells.
* **Operational Visibility:** Enabled Sitgram managers to inspect team productivity, error frequencies, and task completion times in real time.
* **Reliability:** 99.9% uptime with zero data loss across distributed remote workers.
