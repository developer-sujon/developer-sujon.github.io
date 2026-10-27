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
githubUrl: "https://github.com/willro/workspace"
liveUrl: "https://willro.com"
---

## 📌 Executive Summary

**Willro** is a high-concurrency multi-tenant web platform monorepo engineered for **Sitgram**. It consolidates multiple customer-facing commercial portals, internal admin dashboards, and shared enterprise libraries into a unified, high-performance **Turborepo** workspace.

Before Willro, Sitgram maintained multiple independent repositories with duplicated UI components, desynchronized TypeScript contracts, and slow, repetitive CI/CD builds. Willro unified the entire engineering ecosystem, accelerating build pipelines by **4.5x**, eliminating code duplication by **80%**, and standardizing tenant deployments across Linux VPS infrastructure.

---

## 🏗️ Monorepo System Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              WILLRO MONOREPO ARCHITECTURE                              │
│                                                                                        │
│   [Client Inbound Request: tenant1.willro.com / admin.willro.com]                      │
│                                  │                                                     │
│                                  ▼                                                     │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │               Nginx Reverse Proxy & Wildcard SSL       │                           │
│   └──────────────────────────────┬─────────────────────────┘                           │
│                                  ▼                                                     │
│   ┌────────────────────────────────────────────────────────┐                           │
│   │           Next.js 15 Edge Middleware Subdomain Router  │                           │
│   │   • Extracts Subdomain: tenant1.willro.com             │                           │
│   │   • Checks Tenant Status in In-Memory LRU / Redis Cache │                           │
│   │   • Rewrites Path Internally to /sites/[tenant]        │                           │
│   └──────────────┬───────────────────────────┬─────────────┘                           │
│                  │                           │                                         │
│                  ▼                           ▼                                         │
│   ┌─────────────────────────────┐   ┌─────────────────────────────┐                    │
│   │ apps/web (Public Storefront)│   │ apps/admin (Merchant Portal)│                    │
│   │ • Next.js 15 App Router     │   │ • Role-Based Access Control │                    │
│   │ • Dynamic Tenant Theming    │   │ • Real-Time Order Management│                    │
│   └──────────────┬──────────────┘   └──────────────┬──────────────┘                    │
│                  │                                 │                                   │
│                  └────────────────┬────────────────┘                                   │
│                                   │                                                    │
│                                   ▼ Consumes Internal Shared Workspace Packages        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                           TURBOREPO SHARED PACKAGES LAYER                      │   │
│   │                                                                                │   │
│   │  ┌───────────────────────┐  ┌───────────────────────┐  ┌────────────────────┐  │   │
│   │  │ @repo/ui              │  │ @repo/typescript-config│ │ @repo/eslint-config│  │   │
│   │  │ • Tailwind Design Sys │  │ • Strict tsconfig base│  │ • Unified linting │  │   │
│   │  │ • Radix Primitives    │  │ • Composite References│  │ • Prettier sync    │  │   │
│   │  └───────────────────────┘  └───────────────────────┘  └────────────────────┘  │   │
│   │  ┌───────────────────────┐  ┌───────────────────────┐  ┌────────────────────┐  │   │
│   │  │ @repo/database        │  │ @repo/auth            │  │ @repo/utils        │  │   │
│   │  │ • Shared ORM Schemas  │  │ • JWT & Session Core  │  │ • Formatters, Math │  │   │
│   │  └───────────────────────┘  └───────────────────────┘  └────────────────────┘  │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Key Technical Challenges & Engineering Solutions

### 1. Dynamic Multi-Tenant Subdomain Routing with Next.js Edge Middleware
* **The Problem:** Each client or merchant on Willro requires a personalized branded storefront (e.g., `client-a.willro.com`, `client-b.willro.com`) without deploying separate server instances or requiring manual Nginx virtual host configurations for every new tenant.
* **The Solution:**
  * Configured wildcard DNS (`*.willro.com`) pointing to the primary cluster.
  * Implemented lightweight **Edge Middleware** in Next.js 15 that inspects the `Host` header on every inbound request in sub-5ms.
  * Rewrites the request URL internally to dynamic multi-tenant routes (`/app/sites/[siteId]/...`) without altering the user's browser address bar.
  * Cached verified tenant metadata in an edge memory LRU cache to prevent database query amplification on every page load.

### 2. Turborepo Remote Caching & Hash-Based Task Execution
* **The Problem:** In a monorepo containing multiple apps and packages, running `lint`, `type-check`, and `build` across the entire repository on every GitHub Actions PR resulted in 18+ minute CI pipeline bottlenecks.
* **The Solution:**
  * Structured `turbo.json` with strict inputs and outputs for each task pipeline.
  * Enabled **Turborepo Remote Caching**: when a developer builds a package or CI tests a pull request, artifact hashes are computed based on source file diffs, dependencies, and environment variables.
  * If the input files have not changed, Turborepo reuses the cached build artifacts instantly, slashing CI build times from **18 minutes to under 4 minutes (4.5x speedup)**.

### 3. Tree-Shakeable Shared UI Package (`@repo/ui`)
* **The Problem:** Bundling a shared component library into multiple apps often causes bloat if unneeded components or full CSS files are inadvertently included in consumer bundles.
* **The Solution:**
  * Designed `@repo/ui` with TypeScript composite project references and ES Module export maps (`exports` field in `package.json`).
  * Integrated Tailwind CSS using a centralized preset (`@repo/tailwind-config`), ensuring apps compile only the specific utility classes actually referenced in their pages.
  * Decreased production bundle sizes by **38%** across all storefront applications.

### 4. Zero-Downtime Linux VPS Deployment with PM2 & Nginx
* **The Problem:** Monorepo builds generate multiple production artifacts (`apps/web`, `apps/admin`) that must be deployed simultaneously without interrupting active sessions or causing 502 Bad Gateway errors.
* **The Solution:**
  * Authored automated deployment bash scripts triggered via GitHub Actions runners.
  * Built standalone Next.js bundles (`output: "standalone"`), minimizing container and VPS disk footprints.
  * Deployed apps under **PM2 Cluster Mode** behind an upstream Nginx load balancer with graceful reload (`pm2 reload all`), guaranteeing zero-downtime releases.

---

## 🛠️ Architecture Stack & Design Choices

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Monorepo Engine** | **Turborepo & pnpm Workspaces** | Blazing-fast task orchestration, hash-based caching, and disk-efficient symlinked dependencies. |
| **Application Layer** | **Next.js 15 (App Router) & React 19** | Server Components for optimal SEO and rapid Time-to-First-Byte (TTFB) across storefronts. |
| **Shared Libraries** | **TypeScript & Radix UI** | 100% type safety across app boundaries and accessible headless UI components. |
| **Styling System** | **Tailwind CSS & CSS Variables** | Shared design tokens with instant dynamic tenant theming. |
| **DevOps & CI/CD** | **GitHub Actions, Nginx, PM2, Linux VPS** | Automated pull request validation, remote artifact caching, and zero-downtime blue/green reloads. |

---

## 🎯 Interview Deep-Dive Talking Points

1. **Why use Turborepo over Nx or Lerna?**
   * *Answer:* Turborepo is written in Go, executes with near-zero configuration overhead, integrates seamlessly with Vercel and Next.js, and provides simple, intuitive hash-based task caching without Nx’s heavy boilerplate.
2. **How does wildcard multi-tenancy work without exposing internal file paths?**
   * *Answer:* Next.js Edge Middleware extracts the incoming hostname, validates the tenant against a fast cache, and invokes `NextResponse.rewrite()` to map `subdomain.domain.com/path` internally to `/sites/[tenant]/path` while preserving the clean external URL.
3. **How do you prevent circular dependency bottlenecks in pnpm workspaces?**
   * *Answer:* Strict architectural hierarchy: Apps depend on Packages; Packages never depend on Apps; lower-level utility packages never depend on higher-level UI packages. Enforced via ESLint `import/no-cycle` rules.
