---
title: "Elizn — High-Performance Spreadsheet & Activity Tracker"
slug: "elizn"
tagline: "Rendering and analyzing large datasets in an interactive web spreadsheet without freezing the browser UI"
company: "Sitgram"
role: "Senior Frontend & Data Systems Engineer"
period: "2023 – 2024"
status: "Production"
featured: true
badge: "Spreadsheet Engine"
metrics:
  - label: "Virtualization"
    value: "Dual-Axis"
    sub: "Renders only visible rows & cols"
  - label: "Heavy Compute"
    value: "Web Workers"
    sub: "Formulas run off the main UI thread"
  - label: "Grid Engine"
    value: "Handsontable"
    sub: "Custom React spreadsheet grid"
  - label: "Database"
    value: "PostgreSQL"
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

**Elizn** ([https://elizn.com](https://elizn.com)) is a remote team performance monitoring and data-entry platform built for **Sitgram**. It provides managers and team leads with an interactive, Google Sheets-style spreadsheet interface to review employee work logs, cell edits, and daily productivity figures.

At **Sitgram**, the biggest technical challenge on this project was frontend performance: **rendering, editing, and calculating statistics across massive tables without locking the browser tab or causing scroll stutter.**

---

## Technical Approach & Virtualization

Standard HTML tables or React component trees struggle when rendering more than a few thousand elements. If you try to render 50,000 rows with 20 columns, the browser creates a million DOM nodes, consuming gigabytes of RAM and crashing the tab.

* **Dual-Axis Window Virtualization:** Instead of rendering the entire data array into DOM elements, the grid calculates the visible screen area. Only the rows and columns currently visible in the user's viewport (~50 rows by ~15 columns = ~750 DOM nodes) exist in the browser at any given moment.
* **Offloading Calculations to Web Workers:** All heavy statistical computations, search filters, and CSV export generation run in background Web Workers. This keeps the main JavaScript thread completely free for fluid scrolling and user input.
* **Efficient Memory Transfers:** Data buffers transfer between the UI thread and Web Workers using transferable `ArrayBuffer` objects, avoiding slow object serialization and memory duplication.
* **Batched Client Updates:** Keystrokes and cell edits are debounced on the client side before being sent in batches to Supabase/PostgreSQL, preventing server request floods.

---

## Practical Engineering Challenges & Solutions

### 1. Eliminating Scroll Lag on Massive Tables
* **Problem:** When a user scrolls quickly through tens of thousands of rows, re-calculating cell positions and re-rendering DOM elements can cause frame drops and noticeable input lag.
* **Solution:**
  * Implemented strict dual-axis windowing with overscan buffering (rendering a small buffer of rows just above and below the visible viewport).
  * Reused existing DOM cell elements instead of unmounting and remounting them on scroll.
  * Maintained a smooth 60 FPS scroll experience even with large datasets.

### 2. Preventing Browser Freezes During Heavy Formula Calculations
* **Problem:** Running column aggregations (sums, averages, variance calculations) on the main thread blocked the browser event loop, causing mouse clicks and dropdown menus to freeze for seconds at a time.
* **Solution:**
  * Moved all mathematical operations into a dedicated Web Worker thread.
  * The main thread simply sends the dataset pointer to the worker, which performs the calculations in the background and sends back the final summary numbers.
  * The user interface remains completely responsive while calculations happen in the background.

### 3. Reliable Autosave Without Race Conditions
* **Problem:** In a fast-paced spreadsheet interface, users make rapid edits across different cells. If cell updates are sent as individual HTTP requests, slower network responses can overwrite newer edits out of order.
* **Solution:**
  * Built a client-side edit queue using Zustand.
  * Changes are grouped into batched transactional patches with sequence numbers and synced to the database every few seconds, ensuring no keystrokes or changes are lost.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Grid Engine** | Handsontable, React 19, Next.js 15 | Virtualized spreadsheet viewport and cell editing controls. |
| **Concurrency** | Web Workers, ArrayBuffers | Off-thread calculations, sorting, and large CSV exports. |
| **State Management**| Zustand | Fast, lightweight client-side edit queues and cell states. |
| **Database** | PostgreSQL (Supabase), Drizzle ORM | Persistent employee logs, role permissions, and batch writes. |
| **Analytics** | PostHog | User workflow tracking and error monitoring. |

---

## Key Results

* **Smooth 60 FPS Scrolling:** Virtualized DOM rendering keeps memory usage minimal regardless of dataset size.
* **Zero UI Freezes:** Calculations and file exports run in background threads without blocking user clicks or keyboard entry.
* **Reliable Data Sync:** Automatic batched saving prevents network overload and data loss.
