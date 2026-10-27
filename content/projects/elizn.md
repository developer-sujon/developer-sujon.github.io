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
liveUrl: "https://elizn.com"
---

## Overview

**Elizn** ([https://elizn.com](https://elizn.com)) is a remote team performance monitoring and data-entry management platform built for **Sitgram**. It provides granular, real-time tracking of employee productivity through an interactive, Google Sheets-style spreadsheet interface capable of tracking cell-level edits, keystrokes, active hours, and data entry workflows.

The paramount engineering hurdle was architectural: **managing, rendering, and computing analytics over millions of data points inside a single spreadsheet without locking the user interface or crashing the browser tab.**

---

## Architectural Principles & Virtualization Design

Rendering enterprise-scale spreadsheets in web browsers requires strict compute isolation:

* **Dual-Axis Window Virtualization:** Instead of rendering the entire data array into DOM nodes, the renderer calculates dynamic viewport boundaries. Only the rows and columns physically visible on screen (~50 rows × 15 columns = ~750 DOM elements) exist in the browser DOM tree at any millisecond.
* **Off-Thread Compute (Web Workers):** All heavy statistical formulas, productivity variance calculations, and CSV exports run in background Web Workers, leaving the main JavaScript UI thread completely free for 60 FPS user interactions.
* **Zero-Copy Memory Transfers:** Data buffers transfer between the UI thread and Web Workers using `ArrayBuffer` transferables, eliminating serialization and memory duplication overhead.
* **Batch Event Aggregation:** Keystrokes and cell edits are debounced on the client before being sent in transactional batches to Supabase PostgreSQL, preventing database write saturation.

---

## Key Engineering Challenges & Solutions

### 1. The Browser DOM Rendering Cliff
* **Challenge:** Standard browser DOM trees become sluggish when rendering more than a few thousand elements. At 50,000+ rows (resulting in over 500,000 cells), standard React component trees cause 100% CPU lockups, frame drops, and browser "Page Unresponsive" crashes.
* **Solution:**
  * Integrated and customized **Handsontable** with strict dual-axis window virtualization.
  * Dynamically calculated absolute offsets for rows and columns, simulating continuous natural scrolling across millions of records.
  * Achieved sustained **60 FPS scrolling speeds** within a strict 16ms frame budget.

### 2. Offloading Formula Computation & Aggregation to Web Workers
* **Challenge:** Calculating complex productivity analytics (keystroke cadence, error rates, hourly throughput, statistical variance) over hundreds of thousands of cell edits on the main thread produced noticeable micro-stutters during operator data entry.
* **Solution:**
  * Delegated all analytical mathematical pipelines and diff calculations to background **Web Workers**.
  * Transferred data payloads via zero-copy `ArrayBuffer` transferables.
  * Guaranteed **0 ms UI thread freeze**, maintaining sub-5ms keyboard latency for data-entry operators.

### 3. Real-Time Streaming & Database Write Partitioning
* **Challenge:** Hundreds of concurrent operators continuously emitting cell change events generated massive row lock contention and database write saturation.
* **Solution:**
  * Engineered time-bucketed event aggregation on the client side using **Zustand** debouncers.
  * Grouped bulk changes into atomic batch transactions processed via **Supabase Edge Functions** and **Drizzle ORM**.
  * Implemented PostgreSQL table partitioning by merchant tenant and billing cycle, keeping query response times under **20ms**.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Spreadsheet Engine** | Handsontable, Virtual DOM | Dual-axis viewport virtualization for million-row sheet rendering. |
| **Compute Isolation** | Web Workers, ArrayBuffer | Off-thread mathematical calculations and zero-copy memory transfers. |
| **Frontend Framework** | Next.js 15, React 19, Zustand | App Router architecture with client-side undo/redo state management. |
| **Database & ORM** | Supabase (PostgreSQL), Drizzle ORM | Time-series event storage, partitioned tables, and schema migrations. |
| **Analytics & Telemetry**| PostHog, Custom Session Logger | User event telemetry, typing cadence tracking, and performance monitoring. |

---

## Measurable Production Impact

* **1,000,000+ Cells:** Virtualized within a single active sheet without memory exhaustion.
* **60 FPS Scroll Performance:** Maintained silky-smooth frame rates across all browsers.
* **0 ms UI Freezes:** All analytics calculations completely offloaded to background threads.
