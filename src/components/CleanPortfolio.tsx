"use client";

import { useState, useEffect } from "react";
import { ProjectMetadata, resumeData } from "@/data/resumeData";
import { GithubIcon, LinkedinIcon } from "./icons";
import { 
  Sun, 
  Moon, 
  Download, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowLeft,
  ChevronRight,
  Phone,
  Send
} from "lucide-react";

export type NavTab = "front" | "archive" | "career" | "letters";

export interface ProjectArticle {
  id: string;
  name: string;
  kick: string;
  cat: string;
  year: string;
  min: number;
  hl: string;
  dek: string;
  previewType: "kanban" | "sheet" | "iot" | "fintech" | "monorepo" | "network";
  tags: string[];
  quote: string;
  body: string[];
  feats: string[];
  cmd: string;
  env: [string, string][];
  githubUrl?: string;
  liveUrl?: string;
  htmlContent?: string;
}

interface CleanPortfolioProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

export function CleanPortfolio({ projects }: CleanPortfolioProps) {
  const [tab, setTab] = useState<NavTab>("front");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [articleFontSize, setArticleFontSize] = useState<number>(15);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [formattedDate, setFormattedDate] = useState<string>("Tuesday, October 27, 2026");

  // Letter form state
  const [letterEmail, setLetterEmail] = useState("");
  const [letterMessage, setLetterMessage] = useState("");
  const [letterError, setLetterError] = useState("");
  const [letterSuccess, setLetterSuccess] = useState(false);

  const { profile, experiences, metrics, education } = resumeData;

  // Initialize theme and date safely
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");

    try {
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (dateStr) setFormattedDate(dateStr);
    } catch {
      // fallback
    }
  }, []);

  // Status ticker rotation
  const tickerItems = [
    "Open to high-impact systems roles",
    "Sub-second edge AI pipelines",
    "1,000,000+ rows sheet virtualization",
    "Replies within 24 hours",
    "Remote / Hybrid available",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerItems.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [tickerItems.length]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  const goToTab = (newTab: NavTab) => {
    setTab(newTab);
    setSelectedArticleId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openArticle = (id: string) => {
    setSelectedArticleId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Structured editorial articles database matching Sujon's actual work
  const editorialArticles: ProjectArticle[] = [
    {
      id: "zotlyx",
      name: "Zotlyx",
      kick: "Edge AI & Cloudflare · Lead story",
      cat: "Edge & AI",
      year: "2024",
      min: 5,
      hl: "Two-Zone Cloudflare Architecture: Sub-Second Omnichannel AI at Scale",
      dek: "How we decoupled edge webhooks, stateful Durable Objects, and Vectorize RAG from transactional PostgreSQL.",
      previewType: "kanban",
      tags: ["Cloudflare Workers", "Durable Objects", "Cloudflare Queues", "Vectorize (RAG)", "Next.js 15", "Hono", "oRPC", "Drizzle ORM", "Supabase PostgreSQL", "Turborepo"],
      quote: "Decoupling webhook ingestion from transactional state was the single decision that made 250ms response times and 68% LLM cost reductions possible.",
      body: [
        "Digital commerce brands receive hundreds of inbound messages simultaneously across Facebook Page Comments, Facebook Messenger, Instagram DM, WhatsApp Business, Telegram, and website widgets. In a conventional monolithic stack, each inbound webhook hits the main database and immediately invokes an expensive LLM call, resulting in severe concurrency lockups and runaway token bills.",
        "To solve this, we architected the Two-Zone Split System. Zone 1 runs entirely on the Cloudflare Edge: a lightweight Workers receiver validates HMAC webhook signatures and maps channels via KV in under 12ms. Messages are routed directly to an isolated DebounceSession Durable Object.",
        "The Durable Object establishes a 5-second inactivity window using alarms. If a customer sends four rapid messages in succession, they are consolidated into a single unified prompt. The alarm then triggers a sub-35ms semantic search in Cloudflare Vectorize using bge-m3 multilingual embeddings, and synthesizes the final reply with Claude 3.5 Sonnet before queuing dispatch back through the appropriate social API.",
      ],
      feats: [
        "Two-Zone Architecture separating edge ingestion from transactional PostgreSQL",
        "Stateful 5-second Durable Object debounce session slashing LLM token costs by 68%",
        "Sub-35ms semantic context retrieval using Cloudflare Vectorize and bge-m3 embeddings",
        "Single unified agent inbox managing WhatsApp, Telegram, Messenger, and Web Widgets",
        "Role-Based Access Control (RBAC) supporting multi-branch enterprise sales teams",
      ],
      cmd: "git clone https://github.com/yupsis/zotlyx-monorepo\ncd zotlyx-monorepo\npnpm install\ncp .env.example .env\npnpm dev",
      env: [
        ["CLOUDFLARE_ACCOUNT_ID", "Cloudflare enterprise account identifier"],
        ["VECTORIZE_INDEX_NAME", "bge-m3 dense vector index binding"],
        ["DEBOUNCE_DO_BINDING", "Durable Object namespace for 5s debounce sessions"],
        ["DATABASE_URL", "Supabase PostgreSQL connection string via Hyperdrive pooler"],
      ],
      githubUrl: "https://github.com/yupsis/zotlyx-monorepo",
      liveUrl: "https://zotlyx.com",
    },
    {
      id: "elizn",
      name: "Elizn",
      kick: "Big Data & Spreadsheet Virtualization · Sitgram",
      cat: "Big Data & Sheets",
      year: "2024",
      min: 4,
      hl: "1,000,000+ Rows in a Single Sheet: Off-Thread Compute with Web Workers",
      dek: "Managing, virtualizing, and computing analytics over massive enterprise spreadsheets without locking the browser UI thread.",
      previewType: "sheet",
      tags: ["Next.js 15", "Handsontable", "Web Workers", "ArrayBuffer Transferables", "Supabase PostgreSQL", "Drizzle ORM", "Zustand", "PostHog", "Docker"],
      quote: "Never compute over a million records on the JavaScript main thread. Dual-axis window virtualization and zero-copy transferables are mandatory.",
      body: [
        "Standard DOM table implementations fail completely beyond a few thousand rows. At 50,000+ records with multiple columns, typical React virtualizers cause 100% CPU lockups, frame drops, and browser tab crashes during rapid user scrolling and cell formula calculations.",
        "In Elizn, we engineered a high-performance spreadsheet engine using Handsontable customized with strict dual-axis window virtualization. Regardless of whether the sheet holds 10,000 or 1,000,000 rows, only the visible viewport cells (~50 rows × 15 columns = ~750 DOM elements) exist in the browser DOM at any instant.",
        "To keep scrolling pinned at a butter-smooth 60 FPS, all typing cadence calculations, statistical variance, CSV exports, and event diff aggregations are offloaded to background Web Workers via zero-copy ArrayBuffer transferables, guaranteeing zero milliseconds of main-thread freeze.",
      ],
      feats: [
        "Dual-axis Handsontable window virtualization rendering 1,000,000+ data cells at 60 FPS",
        "Background Web Worker calculation of typing metrics, statistical diffs, and CSV exports",
        "Zero-copy ArrayBuffer transferables eliminating UI thread freezing",
        "Real-time employee activity event logging with Supabase Edge Functions & PostHog",
      ],
      cmd: "git clone https://github.com/yupsisofficial/elizn\ncd elizn\npnpm install\npnpm dev",
      env: [
        ["NEXT_PUBLIC_SUPABASE_URL", "Supabase PostgreSQL project endpoint"],
        ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Client-side telemetry & auth public token"],
        ["POSTHOG_API_KEY", "Real-time user event ingestion key"],
      ],
      githubUrl: "https://github.com/yupsisofficial/elizn",
      liveUrl: "https://sitgram.com",
    },
    {
      id: "eazlock",
      name: "Eazlock",
      kick: "IoT & Hardware Queues · Yupsis",
      cat: "IoT & Queues",
      year: "2024",
      min: 3,
      hl: "Zero-Loss IoT Command Queues for Mobile Installment Lock Management",
      dek: "Asynchronous pending command queues guaranteeing tamper-proof lock delivery across intermittent device networks.",
      previewType: "iot",
      tags: ["Next.js 15", "TypeScript", "Cron Scheduler", "Command Queues", "Turborepo", "Tailwind CSS", "PostgreSQL"],
      quote: "Hardware devices frequently go offline. Queues must guarantee idempotency and zero command loss upon reconnection.",
      body: [
        "Eazlock is an enterprise device security and installment management platform designed for consumer electronics retailers and micro-lending institutions. It enables automatic enforcement of scheduled smartphone EMI payments by sending tamper-proof cryptographic lock and unlock signals to enrolled hardware devices.",
        "Devices frequently disconnect when users go offline, toggle airplane mode, or change SIM cards. Direct synchronous HTTP commands failed under real-world field conditions. We engineered the DevicePendingCommandProcessor—an asynchronous command queue with exponential backoff and heartbeat polling.",
        "When an offline device reconnects to the network, all pending command payloads are verified, dispatched, and acknowledged with absolute zero duplication or loss. Automated midnight cron workers calculate overdue grace periods, trigger gradual feature restrictions, and audit collections.",
      ],
      feats: [
        "DevicePendingCommandProcessor with exponential backoff retry pipeline",
        "Automated midnight cron scheduler calculating overdue interest and device restrictions",
        "Multi-tenant merchant admin dashboard for IMEI registration and GPS tracking",
        "Tamper-proof cryptographic lock/unlock signal verification",
      ],
      cmd: "git clone https://github.com/yupsis/eazlock-monorepo\ncd eazlock-monorepo\npnpm install\npnpm --filter @apps/cron-scheduler start",
      env: [
        ["DATABASE_URL", "PostgreSQL database connection pool"],
        ["MQTT_BROKER_URL", "IoT command dispatch MQTT broker connection"],
        ["LOCK_SIGNING_SECRET", "Cryptographic key for device unlock tokens"],
      ],
      githubUrl: "https://github.com/yupsis/eazlock-monorepo",
    },
    {
      id: "torongo-pay",
      name: "Torongo Pay",
      kick: "Fintech & Security · Yupsis",
      cat: "Fintech & SaaS",
      year: "2024",
      min: 3,
      hl: "Idempotent Multi-Provider Payment Gateway & Webhook Reconciliation",
      dek: "Unifying cards, mobile wallets, and instant bank transfers behind an idempotent settlement engine.",
      previewType: "fintech",
      tags: ["Node.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Turborepo", "Webhooks", "HMAC"],
      quote: "Network requests drop, users double-click, but financial ledgers must never process the same payment twice.",
      body: [
        "Torongo Pay is a unified payment gateway orchestration service engineered to abstract multiple payment aggregators (cards, mobile financial services, local MFS) behind a single idempotent API interface.",
        "Cryptographic request hashing prevents concurrent double deductions during network retries or flaky mobile data. Webhook signature verification, payload normalization, and persistent dead-letter queue auditing guarantee reliable merchant callback notifications.",
        "The system maintains an immutable transaction audit log that continuously reconciles settlements with downstream payment providers, providing instant financial integrity reporting.",
      ],
      feats: [
        "Cryptographic request hashing preventing duplicate transactions during network retries",
        "HMAC webhook signature validation with automatic payload normalization",
        "Dead-letter queue auditing with automated retry schedule for merchant callbacks",
        "Unified payment abstraction covering bKash, Nagad, cards, and bank rails",
      ],
      cmd: "git clone https://github.com/yupsis/torongo\ncd torongo\npnpm install\npnpm dev",
      env: [
        ["PAYMENT_SECRET_KEY", "Private API signing key for merchant transactions"],
        ["WEBHOOK_HMAC_SECRET", "HMAC key for inbound provider payload validation"],
        ["DATABASE_URL", "PostgreSQL transaction ledger pool"],
      ],
    },
    {
      id: "willro",
      name: "Willro",
      kick: "Monorepos & Systems · Sitgram",
      cat: "Monorepos & Systems",
      year: "2023",
      min: 3,
      hl: "Multi-Tenant Enterprise Monorepo on Turborepo with 4.5x Faster Builds",
      dek: "Consolidating public websites, client portals, and shared libraries into an atomic Turborepo workspace.",
      previewType: "monorepo",
      tags: ["Turborepo", "Next.js", "TypeScript", "Tailwind CSS", "Docker"],
      quote: "Shared UI packages and centralized configs turn monorepos from maintenance burdens into velocity multipliers.",
      body: [
        "Willro is a scalable multi-tenant web ecosystem engineered for Sitgram. It consolidates multiple customer-facing websites, administration portals, and shared core packages into a streamlined Turborepo workspace.",
        "Unified apps/web, apps/web-public, and apps/admin sharing @repo/ui and @repo/typescript-config reduced build and test runtimes by 4.5x with remote caching.",
        "Zero configuration duplication across ESLint, Prettier, and Tailwind allowed new client modules to be onboarded in minutes rather than days.",
      ],
      feats: [
        "Turborepo remote caching reducing build and test times by 4.5x",
        "Shared @repo/ui component library with 80% code reuse across portals",
        "Strict package boundaries preventing circular dependency cascades",
        "Automated CI/CD pipelines deploying isolated client portals simultaneously",
      ],
      cmd: "git clone https://github.com/willro/workspace\ncd workspace\npnpm install\npnpm build",
      env: [
        ["TURBO_TOKEN", "Turborepo remote cache authentication token"],
        ["NEXT_PUBLIC_API_URL", "Base API gateway endpoint"],
      ],
      githubUrl: "https://github.com/willro/workspace",
    },
    {
      id: "netfee",
      name: "NetFee",
      kick: "ISP SaaS & Networks · ShunnoIT",
      cat: "Fintech & SaaS",
      year: "2023",
      min: 3,
      hl: "Mikrotik Automated Bandwidth Provisioning & ISP Billing SaaS",
      dek: "Automating broadband subscriber renewals, bandwidth queues, and SMS billing for hundreds of ISPs.",
      previewType: "network",
      tags: ["Nest.js", "Express.js", "React", "PostgreSQL", "Mikrotik RouterOS API", "Redis", "RabbitMQ"],
      quote: "Eliminating manual router configuration freed ISP operators from hundreds of daily support calls.",
      body: [
        "NetFee is a multi-tenant ISP billing and client relationship management SaaS platform built at ShunnoIT. It automates daily operations for broadband internet providers—including customer subscription lifecycles, automated online renewals via mobile wallets (bKash, Nagad), and real-time bandwidth queue configuration via the Mikrotik RouterOS API.",
        "Synchronized client credentials and bandwidth speeds directly with edge routers. Automated connection disable/enable triggers based on payment verification in under 1.5 seconds.",
        "Integrated SMS gateways with background cron workers to alert subscribers 3 days prior to expiration and automatically cut off non-paying connections, backed by double-entry ledger bookkeeping.",
      ],
      feats: [
        "Mikrotik RouterOS API socket integration enabling sub-1.5s bandwidth disconnect/recharge",
        "Automated SMS gateway alerts sent 3 days before expiration",
        "Multi-tier reseller accounting and ledger balance reconciliation",
        "Integrated online customer billing via bKash, Nagad, and credit cards",
      ],
      cmd: "git clone https://github.com/shunnoit/netfee\ncd netfee\nnpm install\nnpm run dev",
      env: [
        ["MIKROTIK_ROUTER_IP", "Core edge RouterOS gateway IP address"],
        ["SMS_GATEWAY_API_KEY", "Transactional SMS gateway auth credential"],
        ["DATABASE_URL", "PostgreSQL billing ledger pool"],
      ],
    },
  ];

  // Helper to get active article
  const currentArticle = selectedArticleId
    ? editorialArticles.find((a) => a.id === selectedArticleId) || editorialArticles[0]
    : null;

  // Next story calculation
  const nextArticle = currentArticle
    ? editorialArticles[(editorialArticles.indexOf(currentArticle) + 1) % editorialArticles.length]
    : editorialArticles[1];

  // Category filters for Archive
  const archiveCategories = ["All", "Edge & AI", "Big Data & Sheets", "IoT & Queues", "Fintech & SaaS"];
  const filteredArticles = activeCategory === "All"
    ? editorialArticles
    : editorialArticles.filter((a) => a.cat === activeCategory);

  // Handle letter submission
  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterEmail || !letterEmail.includes("@")) {
      setLetterError("Please enter a valid email address.");
      return;
    }
    if (letterMessage.trim().length < 10) {
      setLetterError("Please write at least a short sentence (minimum 10 characters).");
      return;
    }
    setLetterError("");
    setLetterSuccess(true);
  };

  // Preview wireframe diagram component
  const renderDiagram = (type: ProjectArticle["previewType"]) => {
    switch (type) {
      case "kanban":
        return (
          <div className="pv">
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">1. INGESTION</div>
              <div className="cd"></div>
              <div className="cd a"></div>
              <div className="cd"></div>
            </div>
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">2. 5s DO DEBOUNCE</div>
              <div className="cd a"></div>
              <div className="cd"></div>
              <div className="cd a"></div>
            </div>
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">3. VECTORIZE RAG</div>
              <div className="cd"></div>
              <div className="cd a"></div>
            </div>
          </div>
        );
      case "sheet":
        return (
          <div className="pv flex-col justify-center">
            <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">VIRTUALIZED SHEET MATRIX (1M+ CELLS)</div>
            <div className="col" style={{ justifyContent: "center" }}>
              <div className="cd a" style={{ width: "95%" }}></div>
              <div className="cd" style={{ width: "88%" }}></div>
              <div className="cd a" style={{ width: "65%" }}></div>
              <div className="cd" style={{ width: "82%" }}></div>
            </div>
          </div>
        );
      case "iot":
        return (
          <div className="pv">
            <div className="col" style={{ flex: "0 0 32%" }}>
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">MQTT PING</div>
              <div className="cd a"></div>
              <div className="cd"></div>
              <div className="cd"></div>
            </div>
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">COMMAND QUEUE</div>
              <div className="cd" style={{ height: "42px" }}></div>
              <div className="cd a" style={{ height: "42px" }}></div>
            </div>
          </div>
        );
      case "fintech":
        return (
          <div className="pv">
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">HMAC WEBHOOK</div>
              <div className="cd a" style={{ height: "34px" }}></div>
              <div className="cd" style={{ height: "34px" }}></div>
            </div>
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">IDEMPOTENT HASH</div>
              <div className="cd" style={{ height: "34px" }}></div>
              <div className="cd a" style={{ height: "34px" }}></div>
            </div>
            <div className="col">
              <div className="text-[10px] font-mono text-[var(--text-muted)] pb-1">LEDGER AUDIT</div>
              <div className="cd a" style={{ height: "34px" }}></div>
              <div className="cd" style={{ height: "34px" }}></div>
            </div>
          </div>
        );
      default:
        return (
          <div className="pv">
            <div className="col">
              <div className="cd a"></div>
              <div className="cd"></div>
            </div>
            <div className="col">
              <div className="cd"></div>
              <div className="cd a"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-[900px] mx-auto">
        <div className={`pp ${isDark ? "dk" : ""}`} id="root">
          
          {/* 1. MASTHEAD */}
          <header className="mast">
            <div className="text-xs text-[var(--text-muted)] mb-1 font-mono tracking-wide">
              {profile.journalVolume}
            </div>
            <h1 onClick={() => goToTab("front")}>
              {profile.name}
            </h1>
            <div className="sf text-[14px] sm:text-[15px] text-[var(--text-secondary)] mt-1.5 italic">
              {profile.editorialSubtitle}
            </div>
          </header>

          {/* 2. METADATA & TICKER LINE */}
          <div className="mline">
            <span>{formattedDate}</span>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span className="pd"></span>
                <span className="transition-opacity duration-250">
                  {tickerItems[tickerIndex]}
                </span>
              </span>

              <a
                href="/Muhammad-Sujon-CV.pdf"
                download="Muhammad-Sujon-CV.pdf"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[var(--border-strong)] text-[11px] font-mono hover:bg-[var(--surface-1)] transition-colors cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>Download CV</span>
              </a>

              <button
                onClick={toggleTheme}
                className="tgl"
                role="button"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3 text-zinc-600" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. NAVIGATION MENU (4 TABS) */}
          <nav className="nv" id="nv">
            <span
              className={tab === "front" && !selectedArticleId ? "on" : ""}
              onClick={() => goToTab("front")}
            >
              Front page
            </span>
            <span
              className={tab === "archive" && !selectedArticleId ? "on" : ""}
              onClick={() => goToTab("archive")}
            >
              Archive
            </span>
            <span
              className={tab === "career" && !selectedArticleId ? "on" : ""}
              onClick={() => goToTab("career")}
            >
              Career
            </span>
            <span
              className={tab === "letters" && !selectedArticleId ? "on" : ""}
              onClick={() => goToTab("letters")}
            >
              Letters
            </span>
          </nav>

          {/* 4. DYNAMIC PAGE CONTENT CONTAINER */}
          <main id="pg">
            
            {/* VIEW A: FULL ARTICLE VIEW */}
            {selectedArticleId && currentArticle ? (
              <article className="fx art max-w-[620px] mx-auto">
                {/* Breadcrumbs */}
                <div className="text-[13px] text-[var(--text-secondary)] mb-5 font-mono">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => goToTab("front")}
                  >
                    Front page
                  </span>{" "}
                  /{" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => goToTab("archive")}
                  >
                    Archive
                  </span>{" "}
                  / <span className="text-[var(--text-primary)] font-medium">{currentArticle.name}</span>
                </div>

                <div className="kick">{currentArticle.kick}</div>
                <h1 className="hl text-2xl sm:text-[34px] leading-tight">
                  {currentArticle.hl}
                </h1>
                <p className="sf dek text-base sm:text-[17px] leading-relaxed text-[var(--text-secondary)] italic my-3 sm:my-4">
                  {currentArticle.dek}
                </p>

                {/* Byline & Font Scaler Bar */}
                <div className="flex justify-between items-center flex-wrap gap-2 py-2 border-y border-[var(--border)] text-xs text-[var(--text-secondary)] mb-5 font-mono">
                  <span>
                    By <span className="text-[var(--text-primary)] font-medium">{profile.name}</span> · {currentArticle.year} · {currentArticle.min} min read
                  </span>
                  <div className="fs">
                    <span
                      onClick={() => setArticleFontSize((prev) => Math.max(13, prev - 1))}
                      aria-label="Smaller text"
                    >
                      A−
                    </span>
                    <span
                      onClick={() => setArticleFontSize((prev) => Math.min(19, prev + 1))}
                      aria-label="Larger text"
                    >
                      A+
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap mb-5">
                  {currentArticle.liveUrl && (
                    <a
                      href={currentArticle.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      <span>Live system</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {currentArticle.githubUrl && (
                    <a
                      href={currentArticle.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn2"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Monorepo spec</span>
                    </a>
                  )}
                  <button
                    onClick={() => goToTab("front")}
                    className="btn2 text-xs"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back</span>
                  </button>
                </div>

                {/* Visual Architecture Preview */}
                {renderDiagram(currentArticle.previewType)}
                <p className="fig">Fig. 1: Architectural topology of {currentArticle.name}.</p>

                {/* Story Body with Drop Cap and Pull Quote */}
                <div
                  id="ab"
                  className="sf text-[var(--text-secondary)] mt-6 leading-relaxed"
                  style={{ fontSize: `${articleFontSize}px`, lineHeight: 1.85 }}
                >
                  <p className="dc mb-4">{currentArticle.body[0]}</p>
                  <p className="mb-4">{currentArticle.body[1]}</p>
                  <div className="pq">“{currentArticle.quote}”</div>
                  <p className="mb-4">{currentArticle.body[2]}</p>
                </div>

                {/* Tags */}
                <div className="mt-5 flex gap-1.5 flex-wrap">
                  {currentArticle.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Technical Appendix · README */}
                <div className="ap">
                  <div className="flex justify-between items-center gap-2 flex-wrap pb-2 border-b border-[var(--border)]">
                    <span className="text-[13px] font-semibold text-[var(--text-primary)] font-mono">
                      TECHNICAL APPENDIX · ARCHITECTURE &amp; README
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      Synced from monorepo spec
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold mt-4 mb-2 text-[var(--text-primary)] font-mono">
                    Key Architectural Capabilities
                  </h3>
                  <ul className="pl-5 space-y-1 text-xs text-[var(--text-secondary)] list-disc">
                    {currentArticle.feats.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>

                  <h3 className="text-sm font-semibold mt-4 mb-2 text-[var(--text-primary)] font-mono">
                    Quick Start Commands
                  </h3>
                  <div className="cw">
                    <button
                      className="cp"
                      onClick={() => copyToClipboard(currentArticle.cmd, "cmd")}
                    >
                      {copiedKey === "cmd" ? "Copied" : "Copy"}
                    </button>
                    <pre className="code">{currentArticle.cmd}</pre>
                  </div>

                  <h3 className="text-sm font-semibold mt-4 mb-2 text-[var(--text-primary)] font-mono">
                    System Bindings &amp; Variables
                  </h3>
                  <table className="w-full border-collapse table-fixed border-t border-[var(--border)] text-xs">
                    <tbody>
                      {currentArticle.env.map(([key, desc], i) => (
                        <tr key={i} className="border-b border-[var(--border)]">
                          <td className="py-2 font-mono text-[var(--text-primary)] w-[46%] break-all">
                            {key}
                          </td>
                          <td className="py-2 text-[var(--text-secondary)]">
                            {desc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 className="text-sm font-semibold mt-4 mb-1 text-[var(--text-primary)] font-mono">
                    License &amp; Ownership
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Enterprise Production Rights · MIT Core License
                  </p>
                </div>

                {/* Next Story Navigation Banner */}
                <div
                  className="story mt-8 pt-4 border-t-2 border-[var(--text-primary)] cursor-pointer"
                  onClick={() => openArticle(nextArticle.id)}
                >
                  <div className="lbl mb-1">Next story</div>
                  <h4 className="hl text-lg font-medium text-[var(--text-primary)]">
                    {nextArticle.hl}
                  </h4>
                  <div className="rm mt-2 inline-flex items-center gap-1 text-xs font-mono">
                    <span>Read the story</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ) : null}

            {/* VIEW B: FRONT PAGE (TAB 1) */}
            {tab === "front" && !selectedArticleId && (
              <div className="fx">
                {/* 2-Column Grid: Lead Story (Left) + In Brief (Right) */}
                <div className="g2">
                  
                  {/* Lead Story (Zotlyx) */}
                  <div
                    className="story lead"
                    onClick={() => openArticle(editorialArticles[0].id)}
                  >
                    <div className="kick">{editorialArticles[0].kick}</div>
                    <h2 className="hl text-2xl sm:text-[32px] leading-tight font-medium">
                      {editorialArticles[0].hl}
                    </h2>
                    <p className="sf text-[16px] sm:text-[17px] leading-relaxed text-[var(--text-secondary)] my-3 italic">
                      {editorialArticles[0].dek}
                    </p>
                    
                    {renderDiagram(editorialArticles[0].previewType)}
                    <p className="fig">
                      Fig. 1: Two-zone edge processing pipeline and stateful debounce flow.
                    </p>

                    <p className="sf text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)] my-3.5">
                      {editorialArticles[0].body[0]}
                    </p>

                    <span className="rm font-mono text-xs inline-flex items-center gap-1">
                      <span>Read the full story</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* In Brief Sidebar */}
                  <div className="side">
                    <div className="lbl">In brief</div>
                    {editorialArticles.slice(1).map((p, i) => (
                      <div
                        key={p.id}
                        className="story"
                        style={{
                          padding: i ? "15px 0" : "0 0 15px",
                          borderTop: i ? "0.5px solid var(--border)" : "none",
                        }}
                        onClick={() => openArticle(p.id)}
                      >
                        <div className="kick">{p.kick}</div>
                        <h3 className="hl text-[16px] leading-snug">
                          {p.hl}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mt-1.5 font-mono">
                          {p.year} · {p.min} min read
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Stats Banner */}
                <div className="stats">
                  <div>
                    <div className="sn">5+</div>
                    <div className="sl">Years shipping software</div>
                  </div>
                  <div>
                    <div className="sn">1M+</div>
                    <div className="sl">Sheet rows virtualized (Elizn)</div>
                  </div>
                  <div>
                    <div className="sn">&lt; 250ms</div>
                    <div className="sl">Edge AI latency (Zotlyx)</div>
                  </div>
                  <div>
                    <div className="sn">68%</div>
                    <div className="sl">LLM cost reduction (Durable Objects)</div>
                  </div>
                </div>

                {/* About Author & Skills Row */}
                <div className="abt">
                  <div className="flex gap-3.5">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-13 h-13 rounded-full object-cover shrink-0 border border-[var(--border)]"
                    />
                    <div>
                      <div className="lbl mb-1">About the author</div>
                      <p className="sf text-xs sm:text-[13.5px] leading-relaxed text-[var(--text-secondary)] m-0">
                        {profile.shortBio} Based in{" "}
                        <span className="text-[var(--text-primary)] font-medium">
                          {profile.location}
                        </span>
                        .
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="lbl mb-1">Skills index</div>
                    <p className="sf text-xs sm:text-[13.5px] leading-relaxed text-[var(--text-secondary)] m-0">
                      Next.js 15, Cloudflare Workers, Durable Objects, Vectorize (RAG), Handsontable, Web Workers, Node.js, Nest.js, PostgreSQL, Redis, RabbitMQ, Turborepo, Docker.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW C: ARCHIVE (TAB 2) */}
            {tab === "archive" && !selectedArticleId && (
              <div className="fx">
                <h2 className="hl text-2xl sm:text-[30px] mb-1.5">Archive</h2>
                <p className="sf text-base text-[var(--text-secondary)] italic mb-4">
                  Every system and engineering case study, newest first.
                </p>

                {/* Category Filter Chips */}
                <div className="flex gap-2 flex-wrap mb-2">
                  {archiveCategories.map((cat) => (
                    <span
                      key={cat}
                      className={`chip ${activeCategory === cat ? "on" : ""}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-[var(--text-muted)] my-3 font-mono">
                  {filteredArticles.length} {filteredArticles.length === 1 ? "story" : "stories"}
                </div>

                {/* Chronological Stories List */}
                <div className="border-b border-[var(--border)]">
                  {filteredArticles.map((p) => (
                    <div
                      key={p.id}
                      className="row"
                      onClick={() => openArticle(p.id)}
                    >
                      <span className="yr sf text-[15px] text-[var(--text-muted)]">
                        {p.year}
                      </span>
                      <div className="min-w-0">
                        <div className="kick mb-1">
                          {p.kick}
                          <span className="ky"> · {p.year}</span>
                        </div>
                        <div className="hl text-[17px] sm:text-[18px]">
                          {p.hl}
                        </div>
                        <div className="mt-2 flex gap-1.5 flex-wrap">
                          {p.tags.slice(0, 5).map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-lg text-[var(--text-muted)]">
                        →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW D: CAREER (TAB 3) */}
            {tab === "career" && !selectedArticleId && (
              <div className="fx">
                <h2 className="hl text-2xl sm:text-[30px] mb-1.5">Career &amp; Experience</h2>
                <p className="sf text-base text-[var(--text-secondary)] italic mb-5">
                  Where the stories and architectures came from.
                </p>

                {/* Chronological Positions */}
                {experiences.map((x, idx) => (
                  <div key={idx} className="cr">
                    <div className="text-xs text-[var(--text-muted)] pt-1 font-mono">
                      {x.period}
                    </div>
                    <div>
                      <div className="hl text-lg sm:text-[20px]">
                        {x.role}
                      </div>
                      <div className="text-xs font-mono text-[var(--text-accent)] mt-1 mb-2.5">
                        {x.company} · {x.location}
                      </div>
                      <ul className="sf pl-4 space-y-1.5 text-xs sm:text-[13.5px] text-[var(--text-secondary)] leading-relaxed list-disc mb-3">
                        {x.highlights.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                      <div className="flex gap-1.5 flex-wrap">
                        {x.technologies.slice(0, 6).map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Education */}
                {education.map((edu, eIdx) => (
                  <div key={eIdx} className="cr">
                    <div className="text-xs text-[var(--text-muted)] pt-1 font-mono">
                      {edu.period}
                    </div>
                    <div>
                      <div className="hl text-lg sm:text-[20px]">
                        {edu.degree}
                      </div>
                      <div className="text-xs font-mono text-[var(--text-accent)] mt-1">
                        {edu.institution}
                      </div>
                      <p className="sf text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Skills Index Table */}
                <h3 className="hl text-[20px] sm:text-[22px] mt-7 mb-2 pt-5 border-t-2 border-[var(--text-primary)]">
                  Skills index
                </h3>
                <div className="space-y-0.5">
                  <div className="cr cs">
                    <span className="text-xs font-mono text-[var(--text-muted)]">Edge &amp; Distributed</span>
                    <span className="sf text-xs sm:text-[13.5px] text-[var(--text-secondary)]">
                      Cloudflare Workers, Durable Objects, Cloudflare Queues, Vectorize (RAG), Hyperdrive, Redis, Docker
                    </span>
                  </div>
                  <div className="cr cs">
                    <span className="text-xs font-mono text-[var(--text-muted)]">Big Data &amp; Sheets</span>
                    <span className="sf text-xs sm:text-[13.5px] text-[var(--text-secondary)]">
                      1,000,000+ Row Virtualization, Handsontable, Web Workers, ArrayBuffer Transferables, Supabase PostgreSQL
                    </span>
                  </div>
                  <div className="cr cs">
                    <span className="text-xs font-mono text-[var(--text-muted)]">Backend &amp; APIs</span>
                    <span className="sf text-xs sm:text-[13.5px] text-[var(--text-secondary)]">
                      TypeScript, Node.js, Nest.js, Hono, oRPC, RabbitMQ, Drizzle ORM, Prisma, Webhook HMAC
                    </span>
                  </div>
                  <div className="cr cs">
                    <span className="text-xs font-mono text-[var(--text-muted)]">Frontend &amp; UI</span>
                    <span className="sf text-xs sm:text-[13.5px] text-[var(--text-secondary)]">
                      Next.js 15, React 19, Tailwind CSS, Turborepo, Zustand, Responsive &amp; Editorial Typography
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW E: LETTERS & CONTACT (TAB 4) */}
            {tab === "letters" && !selectedArticleId && (
              <div className="fx max-w-[500px]">
                <h2 className="hl text-2xl sm:text-[30px] mb-1.5">Letters to the editor</h2>
                <p className="sf text-base text-[var(--text-secondary)] italic mb-5 leading-relaxed">
                  Have a high-scale systems challenge, a project, or a senior engineering role? Write in. Direct replies usually go out within 24 hours.
                </p>

                {/* Direct Action Buttons */}
                <div className="flex gap-2 flex-wrap mb-6">
                  <button
                    className="btn text-xs"
                    onClick={() => copyToClipboard(profile.email, "email")}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>
                      {copiedKey === "email" ? "Copied to clipboard" : `Copy ${profile.email}`}
                    </span>
                  </button>

                  <button
                    className="btn2 text-xs"
                    onClick={() => copyToClipboard(profile.phone, "phone")}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>
                      {copiedKey === "phone" ? "Copied" : profile.phone}
                    </span>
                  </button>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn2 text-xs"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn2 text-xs"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="/Muhammad-Sujon-CV.pdf"
                    download="Muhammad-Sujon-CV.pdf"
                    className="btn2 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CV</span>
                  </a>
                </div>

                {/* Letter Dispatch Form */}
                <div className="border-t-2 border-[var(--text-primary)] pt-5">
                  {letterSuccess ? (
                    <div className="p-4 rounded-lg bg-[var(--bg-success)] text-[var(--text-success)] text-sm font-mono leading-relaxed">
                      Letter received. Expect a prompt reply from Muhammad Sujon within 24 hours.
                    </div>
                  ) : (
                    <form onSubmit={handleSendLetter} className="space-y-3">
                      <div>
                        <input
                          type="email"
                          value={letterEmail}
                          onChange={(e) => {
                            setLetterEmail(e.target.value);
                            setLetterError("");
                          }}
                          placeholder="your.name@company.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-1)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--fill-primary)] transition-colors"
                        />
                      </div>

                      <div>
                        <textarea
                          rows={4}
                          value={letterMessage}
                          onChange={(e) => {
                            setLetterMessage(e.target.value);
                            setLetterError("");
                          }}
                          placeholder="Describe the system, project challenge, or role you have in mind..."
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-1)] text-[var(--text-primary)] text-xs font-mono focus:outline-none focus:border-[var(--fill-primary)] transition-colors resize-y"
                        ></textarea>
                      </div>

                      {letterError && (
                        <div className="err text-xs text-[var(--text-danger)] font-mono">
                          {letterError}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn mt-1 text-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send letter</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </main>

          {/* 5. JOURNAL FOOTER */}
          <footer className="mt-9 pt-3.5 border-t-2 border-[var(--text-primary)] flex justify-between items-center text-xs text-[var(--text-muted)] flex-wrap gap-2 font-mono">
            <span>© 2026 {profile.name} · {profile.location}</span>
            <span>Built with Next.js 16 &amp; OpenNext Cloudflare</span>
          </footer>

        </div>
      </div>
    </div>
  );
}
