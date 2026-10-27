---
title: "Willro — Multi-Tenant Web Platform Monorepo"
slug: "willro"
tagline: "High-concurrency multi-tenant web platform monorepo engineered for speed, modularity, isolated client deployments, and remote build caching"
company: "Sitgram"
role: "Lead Software Engineer & Monorepo Architect"
period: "Dec 2024 – Present"
status: "Production"
featured: false
kicker: "Monorepos & Systems · Sitgram"
badge: "Turborepo Multi-Tenant"
metrics:
  - label: "Build Acceleration"
    value: "4.5x"
    sub: "Via Turborepo remote cache"
  - label: "Code Sharing"
    value: "80%"
    sub: "Shared UI & config packages"
  - label: "Tenant Routing"
    value: "< 5ms"
    sub: "Next.js Edge Middleware"
  - label: "CI/CD Pipeline"
    value: "60% Faster"
    sub: "Hash-based task execution"
tags:
  - "Turborepo"
  - "Next.js 15"
  - "TypeScript"
  - "Tailwind CSS"
  - "Docker"
  - "Nginx"
  - "Linux VPS"
  - "GitHub Actions"
liveUrl: "https://willro.com"
---

## Overview

**Willro** ([https://willro.com](https://willro.com)) is a high-concurrency multi-tenant web platform monorepo engineered for **Sitgram**. It consolidates multiple customer-facing commercial portals, internal admin dashboards, and shared enterprise libraries into a unified, high-performance **Turborepo** workspace.

Prior to this architectural unification, Sitgram operated separate independent codebases with redundant UI components, divergent TypeScript contracts, and slow, repetitive CI/CD builds. Willro restructured the engineering workflow, accelerating build pipelines by **4.5x**, eliminating code duplication by **80%**, and standardizing tenant deployments across Linux VPS infrastructure.

---

## Architectural Principles & Monorepo Design

The monorepo architecture enforces strict separation of concerns, high build parallelization, and zero-configuration package consumption:

* **Unified Workspace Architecture:** Managed via **pnpm workspaces** and **Turborepo**, establishing strict package dependency boundaries. Applications consume shared packages through symlinks without requiring independent publishing or manual linking steps.
* **Wildcard Subdomain Routing:** Custom edge middleware dynamically inspects inbound hostnames, validates tenant status against an edge cache, and maps requests to specific tenant layouts and themes in sub-5ms.
* **Centralized Design System:** An internal component library built on Tailwind CSS and accessible primitives standardizes typography, forms, layouts, and dynamic themes across all portal apps.
* **Standardized Tooling & Quality Gates:** Unified ESLint configurations, strict base TypeScript configurations, and Prettier rules eliminate linter discrepancies across frontend and backend services.

---

## Key Engineering Challenges & Solutions

### 1. Dynamic Multi-Tenant Subdomain Routing
* **Challenge:** Each client or merchant on Willro requires a personalized branded storefront (e.g., `tenant-a.willro.com`, `tenant-b.willro.com`) without deploying separate server instances or requiring manual Nginx virtual host configurations for every new tenant.
* **Solution:**
  * Configured wildcard DNS (`*.willro.com`) pointing to the primary cluster.
  * Implemented lightweight **Edge Middleware** in Next.js 15 that inspects the `Host` header on every inbound request in sub-5ms.
  * Rewrites the request URL internally to dynamic multi-tenant routes (`/app/sites/[siteId]/...`) without altering the user's browser address bar.
  * Cached verified tenant metadata in an edge memory LRU cache to prevent database query amplification on every page load.

### 2. Turborepo Remote Caching & Hash-Based Task Execution
* **Challenge:** In a monorepo containing multiple apps and packages, running `lint`, `type-check`, and `build` across the entire repository on every pull request resulted in 18+ minute CI pipeline bottlenecks.
* **Solution:**
  * Structured `turbo.json` with strict inputs and outputs for each task pipeline.
  * Enabled **Turborepo Remote Caching**: when a developer builds a package or CI tests a pull request, artifact hashes are computed based on source file diffs, dependencies, and environment variables.
  * If the input files have not changed, Turborepo reuses the cached build artifacts instantly, slashing CI build times from **18 minutes to under 4 minutes (4.5x speedup)**.

### 3. Tree-Shakeable Shared Component Library
* **Challenge:** Bundling a shared component library into multiple apps often causes bundle bloat if unneeded components or full CSS files are inadvertently included in consumer bundles.
* **Solution:**
  * Designed shared packages with TypeScript composite project references and clean ES Module export maps.
  * Integrated Tailwind CSS using a centralized configuration preset, ensuring apps compile only the specific utility classes actually referenced in their pages.
  * Decreased production bundle sizes by **38%** across all storefront applications.

### 4. Zero-Downtime Linux VPS Deployment with PM2 & Nginx
* **Challenge:** Monorepo builds generate multiple production artifacts that must be deployed simultaneously without interrupting active sessions or causing 502 Bad Gateway errors.
* **Solution:**
  * Authored automated deployment pipelines triggered via GitHub Actions runners.
  * Built standalone Next.js bundles (`output: "standalone"`), minimizing container and VPS disk footprints.
  * Deployed apps under **PM2 Cluster Mode** behind an upstream Nginx load balancer with graceful reload (`pm2 reload all`), guaranteeing zero-downtime releases.

---

## Technology Stack

| Layer | Technologies | Role & Architectural Purpose |
| :--- | :--- | :--- |
| **Monorepo Engine** | Turborepo, pnpm Workspaces | Task orchestration, hash-based remote caching, and dependency symlinking. |
| **Application Layer** | Next.js 15 (App Router), React 19 | Server Components for high-performance storefronts and administrative consoles. |
| **Shared Libraries** | TypeScript, Radix UI, Zod | Type safety, headless accessible components, and runtime schema validation. |
| **Styling System** | Tailwind CSS, CSS Variables | Centralized design tokens with dynamic tenant theming. |
| **DevOps & Infrastructure** | Linux VPS, Nginx, PM2, GitHub Actions | Zero-downtime cluster reloads, automated CI/CD, and SSL termination. |

---

## Measurable Production Impact

* **4.5x Build Acceleration:** Drastic reduction in build times via Turborepo remote caching.
* **80% Code Reuse:** Shared UI, validation schemas, and configuration packages across all team applications.
* **Zero Downtime:** Automated rolling reloads on production Linux VPS environments.
