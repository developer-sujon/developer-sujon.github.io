---
title: "Willro — Multi-Tenant Web Platform Monorepo"
slug: "willro"
tagline: "Multi-tenant web platform monorepo built with Turborepo, Next.js, and pnpm workspaces for fast builds and shared client portals"
company: "Sitgram"
role: "Lead Software Engineer & Monorepo Architect"
period: "Dec 2024 – Present"
status: "Production"
featured: false
kicker: "Monorepos & Systems · Sitgram"
badge: "Turborepo Multi-Tenant"
metrics:
  - label: "Workspace"
    value: "Turborepo"
    sub: "pnpm workspaces"
  - label: "Frontend"
    value: "Next.js 15"
    sub: "React 19 App Router"
  - label: "Routing"
    value: "Subdomains"
    sub: "Edge middleware rewrites"
  - label: "Deployment"
    value: "Linux VPS"
    sub: "Nginx & PM2 cluster"
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

**Willro** ([https://willro.com](https://willro.com)) is a multi-tenant web platform monorepo built for **Sitgram**. It brings together our customer-facing portals, merchant stores, admin dashboards, and shared packages into a single, organized **Turborepo** workspace.

Before this project, our team worked across several separate repositories. That setup caused duplicate UI code, divergent TypeScript types between apps, and slow CI builds. I designed and led the migration to a unified Turborepo monorepo, which cut CI build times down significantly, made code sharing seamless across all apps, and standardized our deployment process on Linux VPS servers.

---

## Architecture & Monorepo Setup

The monorepo is organized to keep packages modular, builds fast, and dependencies clear:

* **pnpm Workspaces & Turborepo:** All apps and packages live in a single repository. Shared UI components, ESLint presets, Tailwind themes, and TypeScript configs are consumed directly through workspace symlinks without needing manual package publishing.
* **Wildcard Subdomain Routing:** Custom Next.js Edge Middleware checks incoming hostnames (like `tenant-a.willro.com`), verifies tenant status, and rewrites the request internally to the right tenant layout in real time.
* **Shared UI Component Library:** We created a shared design system package using Tailwind CSS and Radix UI primitives. Every portal shares the same accessible buttons, modals, form controls, and theme tokens.
* **Consistent Code Standards:** Centralized ESLint and TypeScript configs ensure every app in the monorepo follows the same code quality rules.

---

## Engineering Challenges & Practical Solutions

### 1. Dynamic Subdomain Routing for Every Tenant
* **Problem:** Each client needs their own branded storefront (e.g. `client.willro.com`) without us having to configure a new Nginx virtual host or deploy a separate server instance for each tenant.
* **Solution:**
  * Pointed wildcard DNS (`*.willro.com`) to our server cluster.
  * Used lightweight Next.js Edge Middleware to read the `Host` header on every request.
  * Dynamically rewrote the URL internally to `/app/sites/[siteId]/...` while keeping the custom domain in the visitor's browser.
  * Cached verified tenant data in memory to avoid querying the database on every single page load.

### 2. Speeding Up CI/CD with Turborepo Remote Caching
* **Problem:** Running linting, type-checking, and full production builds across every app on every pull request took over 18 minutes, slowing down the whole team.
* **Solution:**
  * Configured `turbo.json` with clear task inputs and outputs.
  * Enabled remote caching so that if code in a specific package hasn't changed, Turborepo reuses the cached build outputs immediately.
  * Reduced CI build times from **18 minutes down to under 4 minutes**.

### 3. Keeping Shared Component Bundles Lean
* **Problem:** Putting common components into a shared package can easily bloat client bundles if unused code or unnecessary CSS gets bundled into every app.
* **Solution:**
  * Configured package exports using ES Modules and TypeScript project references.
  * Shared Tailwind configuration presets so consumer apps only compile the CSS classes they actually use.
  * Kept final production bundles small and fast on mobile networks.

### 4. Zero-Downtime Releases on Linux VPS
* **Problem:** Deploying multiple updated applications simultaneously to our Linux VPS environment could cause momentary connection drops or 502 errors during server restarts.
* **Solution:**
  * Set up automated deployment workflows via GitHub Actions.
  * Output standalone Next.js builds (`output: "standalone"`) to keep server disk usage minimal.
  * Ran Node.js processes using **PM2 in cluster mode** behind Nginx with graceful reload (`pm2 reload all`), ensuring zero downtime during updates.

---

## Tech Stack

| Layer | Tools | What it does |
| :--- | :--- | :--- |
| **Monorepo** | Turborepo, pnpm Workspaces | Task pipeline orchestration, remote caching, and package linking. |
| **Frontend** | Next.js 15 (App Router), React 19 | Server Components for fast initial loads and client dashboards. |
| **Shared Packages** | TypeScript, Radix UI, Zod | End-to-end type safety, accessible UI primitives, and schema validation. |
| **Styling** | Tailwind CSS, CSS Variables | Centralized design tokens and tenant-specific theming. |
| **DevOps** | Linux VPS, Nginx, PM2, GitHub Actions | Rolling zero-downtime updates, automated deployments, and SSL management. |

---

## Key Results

* **Fast Builds:** Daily CI pipeline runs finished 4.5x faster through Turborepo caching.
* **80% Code Reuse:** Common components, auth checks, and utility functions shared cleanly across all apps.
* **Zero-Downtime Deployments:** Reliable releases without interrupting active users.
