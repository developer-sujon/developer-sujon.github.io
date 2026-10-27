"use client";

import { useState, useEffect } from "react";
import { ProjectMetadata, resumeData } from "@/data/resumeData";
import { GithubIcon, LinkedinIcon } from "./icons";
import { 
  Sun, 
  Moon, 
  Printer, 
  ArrowRight, 
  Copy, 
  Check, 
  ExternalLink, 
  Sliders, 
  Layers, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Radio, 
  Server, 
  Send 
} from "lucide-react";

interface EditorialJournalProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

type JournalView = "front" | "archive" | "career" | "letters";

export function EditorialJournal({ projects }: EditorialJournalProps) {
  const [currentView, setCurrentView] = useState<JournalView>("front");
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [articleFontSize, setArticleFontSize] = useState<number>(16);
  const [activeArchiveCategory, setActiveArchiveCategory] = useState<string>("All");
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");

  // Form states
  const [letterEmail, setLetterEmail] = useState("");
  const [letterMsg, setLetterMsg] = useState("");
  const [letterSent, setLetterSent] = useState(false);
  const [letterError, setLetterError] = useState("");

  const { profile, experiences, metrics, skillCategories, education } = resumeData;

  // Ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % profile.statusTicker.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [profile.statusTicker.length]);

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

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateView = (view: JournalView) => {
    setCurrentView(view);
    setActiveArticleSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find active project
  const activeArticle = activeArticleSlug
    ? projects.find((p) => p.metadata.slug === activeArticleSlug)
    : null;

  // Lead project (Zotlyx) and In-Brief projects
  const leadProject = projects.find((p) => p.metadata.slug === "zotlyx") || projects[0];
  const inBriefProjects = projects.filter((p) => p.metadata.slug !== leadProject?.metadata.slug);

  // Archive filter categories
  const archiveCategories = ["All", "Yupsis", "Sitgram", "Cloudflare & Edge", "Big Data & Sheets", "IoT & Hardware", "FinTech"];

  const filteredArchive = projects.filter(({ metadata }) => {
    if (activeArchiveCategory === "All") return true;
    if (activeArchiveCategory === "Yupsis") return metadata.company === "Yupsis";
    if (activeArchiveCategory === "Sitgram") return metadata.company === "Sitgram";
    if (activeArchiveCategory === "Cloudflare & Edge") return metadata.tags.some(t => t.includes("Cloudflare"));
    if (activeArchiveCategory === "Big Data & Sheets") return metadata.tags.some(t => t.includes("Handsontable") || t.includes("Workers"));
    if (activeArchiveCategory === "IoT & Hardware") return metadata.tags.some(t => t.includes("Cron") || t.includes("Queues"));
    if (activeArchiveCategory === "FinTech") return metadata.tags.some(t => t.includes("Payment") || t.includes("Webhooks"));
    return true;
  });

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterEmail.includes("@") || !letterEmail.includes(".")) {
      setLetterError("Please enter a valid email address.");
      return;
    }
    if (letterMsg.trim().length < 8) {
      setLetterError("Please enter a short message describing your inquiry.");
      return;
    }
    setLetterError("");
    setLetterSent(true);
  };

  return (
    <div className={`mx-auto px-4 py-8 transition-all duration-300 ${
      deviceMode === "mobile" ? "max-w-[420px]" : "max-w-5xl"
    }`}>
      {/* Device Mode Switcher (no-print) */}
      <div className="no-print flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-2">
          <span>Format:</span>
          <div className="inline-flex rounded-lg border border-[var(--border-strong)] overflow-hidden">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                deviceMode === "desktop" ? "bg-[var(--fill-primary)] text-[var(--on-primary)] font-medium" : "hover:bg-[var(--surface-1)]"
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`px-3 py-1 cursor-pointer transition-colors ${
                deviceMode === "mobile" ? "bg-[var(--fill-primary)] text-[var(--on-primary)] font-medium" : "hover:bg-[var(--surface-1)]"
              }`}
            >
              Mobile View
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Print PDF Button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-colors cursor-pointer"
            title="Print or Save Editorial Journal as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-colors cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Newspaper Paper Canvas */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Newspaper Masthead */}
        <header className="text-center pb-5 border-b-2 border-[var(--text-primary)]">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-2">
            {profile.journalVolume}
          </div>
          <h1
            onClick={() => navigateView("front")}
            className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-[var(--text-primary)] cursor-pointer hover:opacity-90 transition-opacity"
          >
            {profile.name}
          </h1>
          <div className="font-editorial italic text-sm sm:text-base text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto leading-relaxed">
            {profile.editorialSubtitle}
          </div>
        </header>

        {/* Masthead Metadata Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 border-b border-[var(--border)] text-xs text-[var(--text-secondary)]">
          <div className="font-editorial italic">
            Tuesday, October 27, 2026 · Dhaka, Bangladesh
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="live-dot" />
            <span className="text-[var(--text-primary)] font-medium transition-opacity duration-300">
              {profile.statusTicker[tickerIndex]}
            </span>
          </div>
        </div>

        {/* Editorial Navigation Tabs */}
        <nav className="no-print flex items-center justify-center gap-6 sm:gap-10 py-3 mb-8 border-b border-[var(--border)] text-xs sm:text-sm font-medium tracking-wide">
          {[
            { id: "front", label: "Front Page" },
            { id: "archive", label: "Projects Archive" },
            { id: "career", label: "Career & Chronology" },
            { id: "letters", label: "Letters to Editor" },
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => navigateView(nav.id as JournalView)}
              className={`pb-1 transition-all cursor-pointer border-b-2 ${
                currentView === nav.id && !activeArticleSlug
                  ? "text-[var(--text-primary)] border-[var(--text-primary)] font-bold"
                  : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>

        {/* -------------------- VIEW: FULL ARTICLE CASE STUDY -------------------- */}
        {activeArticle ? (
          <article className="max-w-2xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
              <button
                onClick={() => navigateView("front")}
                className="hover:text-[var(--text-primary)] cursor-pointer"
              >
                Front Page
              </button>
              <span>/</span>
              <button
                onClick={() => navigateView("archive")}
                className="hover:text-[var(--text-primary)] cursor-pointer"
              >
                Archive
              </button>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-semibold">
                {activeArticle.metadata.title.split("—")[0]}
              </span>
            </div>

            {/* Article Headline Header */}
            <div>
              <div className="text-xs font-mono font-medium text-[var(--text-accent)] mb-2">
                {activeArticle.metadata.kicker || `${activeArticle.metadata.role} · ${activeArticle.metadata.company || "Systems"}`}
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)] leading-tight">
                {activeArticle.metadata.title}
              </h2>
              <p className="font-editorial italic text-lg sm:text-xl text-[var(--text-secondary)] mt-3 leading-relaxed">
                {activeArticle.metadata.tagline}
              </p>
            </div>

            {/* Bylines & Font Resizer */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono">
              <div>
                By <strong className="text-[var(--text-primary)]">{profile.name}</strong> · {activeArticle.metadata.period} · {activeArticle.metadata.company}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[var(--text-muted)]">Type:</span>
                <div className="inline-flex border border-[var(--border-strong)] rounded overflow-hidden">
                  <button
                    onClick={() => setArticleFontSize((prev) => Math.max(14, prev - 1))}
                    className="px-2 py-0.5 hover:bg-[var(--surface-1)] cursor-pointer"
                    title="Smaller text"
                  >
                    A−
                  </button>
                  <button
                    onClick={() => setArticleFontSize((prev) => Math.min(20, prev + 1))}
                    className="px-2 py-0.5 hover:bg-[var(--surface-1)] cursor-pointer"
                    title="Larger text"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {activeArticle.metadata.githubUrl && (
                <a
                  href={activeArticle.metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--fill-primary)] text-[var(--on-primary)] text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect Source Monorepo</span>
                </a>
              )}
              {activeArticle.metadata.liveUrl && (
                <a
                  href={activeArticle.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--surface-1)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Visit Production Platform</span>
                </a>
              )}
            </div>

            {/* Key Metrics Grid */}
            {activeArticle.metadata.metrics && activeArticle.metadata.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[var(--surface-1)] border border-[var(--border)]">
                {activeArticle.metadata.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">{m.label}</div>
                    <div className="font-editorial text-2xl font-bold text-[var(--text-primary)]">{m.value}</div>
                    {m.sub && <div className="text-[11px] text-[var(--text-secondary)]">{m.sub}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Rendered Markdown Body with custom font size */}
            <div
              className="markdown-body font-editorial leading-relaxed pt-2"
              style={{ fontSize: `${articleFontSize}px` }}
              dangerouslySetInnerHTML={{ __html: activeArticle.htmlContent }}
            />

            {/* Next Story Navigation */}
            <div className="pt-8 border-t-2 border-[var(--text-primary)] mt-12 flex items-center justify-between">
              <button
                onClick={() => navigateView("front")}
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                ← Back to Front Page
              </button>

              <button
                onClick={() => {
                  const currentIndex = projects.findIndex(p => p.metadata.slug === activeArticle.metadata.slug);
                  const nextIndex = (currentIndex + 1) % projects.length;
                  openArticle(projects[nextIndex].metadata.slug);
                }}
                className="text-xs font-mono text-[var(--text-accent)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read Next Chronicle</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ) : null}

        {/* -------------------- VIEW: FRONT PAGE -------------------- */}
        {!activeArticleSlug && currentView === "front" && (
          <div className="space-y-10">
            {/* Lead Story & In-Brief Columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
              {/* Lead Story Column (Zotlyx) */}
              <div className="md:col-span-7 lg:col-span-8 md:pr-6 md:border-r border-[var(--border)] space-y-4">
                <div className="text-xs font-mono font-medium text-[var(--text-accent)]">
                  {leadProject.metadata.kicker || "Cloudflare Edge & AI Architecture · Lead story"}
                </div>

                <h2
                  onClick={() => openArticle(leadProject.metadata.slug)}
                  className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-tight cursor-pointer hover:underline decoration-1 underline-offset-4"
                >
                  {leadProject.metadata.title}
                </h2>

                <p className="font-editorial italic text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                  {leadProject.metadata.tagline}
                </p>

                {/* Two-Zone Architecture Interactive Schematic Box */}
                <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface-1)] border border-[var(--border)] font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pb-2 border-b border-[var(--border)]">
                    <span>Fig 1. Two-Zone Split Architecture Pipeline</span>
                    <span className="text-[var(--text-accent)]">Cloudflare Edge + Supabase</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                    <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                      <div className="text-[10px] text-[var(--text-muted)]">Edge Webhook</div>
                      <div className="font-bold text-[var(--text-primary)] mt-1">HMAC & KV</div>
                      <div className="text-[9px] text-emerald-500 mt-0.5">&lt; 15ms</div>
                    </div>

                    <div className="p-2.5 rounded bg-[var(--bg-accent)] border border-[var(--border-accent)] text-[var(--text-accent)]">
                      <div className="text-[10px]">Durable Object</div>
                      <div className="font-bold mt-1">5s Debouncer</div>
                      <div className="text-[9px] mt-0.5">68% Savings</div>
                    </div>

                    <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                      <div className="text-[10px] text-[var(--text-muted)]">Vectorize RAG</div>
                      <div className="font-bold text-[var(--text-primary)] mt-1">bge-m3 Query</div>
                      <div className="text-[9px] text-emerald-500 mt-0.5">&lt; 35ms</div>
                    </div>

                    <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                      <div className="text-[10px] text-[var(--text-muted)]">Hyperdrive DB</div>
                      <div className="font-bold text-[var(--text-primary)] mt-1">Pooled Postgres</div>
                      <div className="text-[9px] text-emerald-500 mt-0.5">No Exhaustion</div>
                    </div>
                  </div>
                </div>

                {/* Lead Story First Paragraph with Drop Cap */}
                <p className="font-editorial drop-cap text-base text-[var(--text-secondary)] leading-relaxed pt-2">
                  Zotlyx is an enterprise-grade AI Omnichannel Chat and Role-Based Access Control platform engineered at Yupsis. It coordinates autonomous, context-aware AI agents across Facebook Page Comments, Messenger, Instagram DM, WhatsApp Business, Telegram, and HTML5 Website Widgets while maintaining sub-second delivery.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => openArticle(leadProject.metadata.slug)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-accent)] hover:text-[var(--text-primary)] cursor-pointer group"
                  >
                    <span>Read the full technical case study & appendix</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* In-Brief Column (Elizn, Eazlock, Torongo, Willro) */}
              <div className="md:col-span-5 lg:col-span-4 space-y-6">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] border-b-2 border-[var(--text-primary)] pb-1">
                  Chronicles in Brief
                </div>

                <div className="space-y-5 divide-y divide-[var(--border)]">
                  {inBriefProjects.map((p, idx) => (
                    <div
                      key={p.metadata.slug}
                      onClick={() => openArticle(p.metadata.slug)}
                      className={`cursor-pointer group ${idx !== 0 ? "pt-5" : ""}`}
                    >
                      <div className="text-[11px] font-mono text-[var(--text-accent)] mb-1">
                        {p.metadata.kicker || `${p.metadata.company} · ${p.metadata.period}`}
                      </div>
                      <h3 className="font-editorial text-lg sm:text-xl font-medium text-[var(--text-primary)] group-hover:underline leading-snug">
                        {p.metadata.title.split("—")[0]}
                      </h3>
                      <p className="font-editorial italic text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                        {p.metadata.tagline}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-muted)] mt-2">
                        <span>{p.metadata.role}</span>
                        <span>•</span>
                        <span className="text-[var(--text-accent)] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                          Read story →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metric Numbers Banner (Newspaper Thick Rule) */}
            <div className="py-6 border-y-2 border-[var(--text-primary)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
                {metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="font-editorial text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-xs font-mono uppercase text-[var(--text-secondary)] mt-1 font-medium">
                      {m.label}
                    </div>
                    {m.sub && (
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        {m.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Author Biographical Colophon & Skills Index */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  About the Systems Architect
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-accent)] text-[var(--text-accent)] font-editorial font-bold text-lg flex items-center justify-center shrink-0 border border-[var(--border-accent)]">
                    MS
                  </div>
                  <p className="font-editorial text-sm text-[var(--text-secondary)] leading-relaxed">
                    <strong>{profile.name}</strong> is a systems architect and senior full-stack engineer who builds distributed edge platforms, high-throughput message streaming systems, and million-row data interfaces across <strong>Yupsis</strong> and <strong>Sitgram</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  Core Technologies Index
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {[
                    "Cloudflare Workers",
                    "Durable Objects",
                    "Cloudflare Vectorize",
                    "Handsontable Virtualization",
                    "Next.js 15",
                    "Supabase PostgreSQL",
                    "Drizzle ORM",
                    "Turborepo",
                    "Web Workers",
                    "oRPC",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VIEW: PROJECTS ARCHIVE -------------------- */}
        {!activeArticleSlug && currentView === "archive" && (
          <div className="space-y-6">
            <div className="border-b border-[var(--border)] pb-4">
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[var(--text-primary)]">
                The Chronicles Archive
              </h2>
              <p className="font-editorial italic text-sm sm:text-base text-[var(--text-secondary)] mt-1">
                Every architectural breakdown, newest first.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {archiveCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveArchiveCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer border ${
                    activeArchiveCategory === c
                      ? "bg-[var(--fill-primary)] text-[var(--on-primary)] border-transparent font-medium"
                      : "border-[var(--border-strong)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)]">
              Showing {filteredArchive.length} technical publications
            </div>

            {/* Chronological Table List */}
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {filteredArchive.map(({ metadata }) => (
                <div
                  key={metadata.slug}
                  onClick={() => openArticle(metadata.slug)}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[var(--surface-1)] px-2 -mx-2 rounded-lg transition-colors group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-accent)]">
                      <span>{metadata.company || "Independent"}</span>
                      <span>•</span>
                      <span>{metadata.period}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-medium text-[var(--text-primary)] group-hover:underline">
                      {metadata.title}
                    </h3>
                    <p className="font-editorial italic text-xs text-[var(--text-secondary)] line-clamp-1 max-w-2xl">
                      {metadata.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {metadata.tags.map((t) => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-muted)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-sm font-mono text-[var(--text-accent)] group-hover:translate-x-1 transition-transform shrink-0 flex items-center gap-1">
                    <span>Read Chronicle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- VIEW: CAREER & CHRONOLOGY -------------------- */}
        {!activeArticleSlug && currentView === "career" && (
          <div className="space-y-8">
            <div className="border-b border-[var(--border)] pb-4">
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[var(--text-primary)]">
                Career & Chronology
              </h2>
              <p className="font-editorial italic text-sm sm:text-base text-[var(--text-secondary)] mt-1">
                Where the engineering stories and architectures originated.
              </p>
            </div>

            {/* Experience Items */}
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-[var(--border)]">
                    <div>
                      <h3 className="font-editorial text-2xl font-semibold text-[var(--text-primary)]">
                        {exp.company}
                      </h3>
                      <div className="text-xs font-mono font-medium text-[var(--text-accent)]">
                        {exp.role} · {exp.type}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {exp.period} · {exp.location}
                    </span>
                  </div>

                  <p className="font-editorial italic text-sm text-[var(--text-secondary)]">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2 font-editorial text-sm text-[var(--text-secondary)] list-square pl-5 leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  {/* Related Projects */}
                  {exp.projectsMentioned.length > 0 && (
                    <div className="pt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-[var(--text-muted)]">Chronicles Shipped:</span>
                      {exp.projectsMentioned.map((proj) => (
                        <span
                          key={proj}
                          className="px-2 py-0.5 rounded font-mono text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-primary)] font-medium"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Academic Background */}
            <div className="p-6 rounded-2xl border border-[var(--border)] space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                Academic Background
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[var(--text-primary)]">
                {education[0].degree}
              </h3>
              <div className="text-xs font-mono text-[var(--text-accent)]">
                {education[0].institution} · {education[0].period}
              </div>
              <p className="font-editorial text-sm text-[var(--text-secondary)]">
                {education[0].details}
              </p>
            </div>

            {/* Complete Skills Directory */}
            <div className="pt-4 border-t-2 border-[var(--text-primary)] space-y-4">
              <h3 className="font-editorial text-2xl font-semibold text-[var(--text-primary)]">
                Technical Competencies Directory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillCategories.map((cat, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-1)]">
                    <div className="text-xs font-mono font-bold uppercase text-[var(--text-primary)] mb-2">
                      {cat.title}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, si) => (
                        <span
                          key={si}
                          className={`text-xs font-mono px-2 py-0.5 rounded ${
                            s.highlight
                              ? "bg-[var(--bg-accent)] text-[var(--text-accent)] border border-[var(--border-accent)]"
                              : "bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border)]"
                          }`}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VIEW: LETTERS TO THE EDITOR (CONTACT) -------------------- */}
        {!activeArticleSlug && currentView === "letters" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="border-b border-[var(--border)] pb-4">
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[var(--text-primary)]">
                Letters to the Editor
              </h2>
              <p className="font-editorial italic text-sm sm:text-base text-[var(--text-secondary)] mt-1 leading-relaxed">
                Have a systems architecture inquiry, a high-concurrency role, or a technical consultation? Write in directly. Dispatches typically receive replies within 24 hours.
              </p>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--fill-primary)] text-[var(--on-primary)] text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? "Email Copied to Clipboard" : `Copy ${profile.email}`}</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--surface-1)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--surface-1)] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Editorial Letter Form */}
            <div className="p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                Direct Dispatch Form
              </div>

              {letterSent ? (
                <div className="p-4 rounded-xl bg-[var(--bg-success)] text-[var(--text-success)] text-sm font-editorial">
                  ✓ Dispatch recorded. Thank you for writing to the chronicle. Expect a prompt response.
                </div>
              ) : (
                <form onSubmit={handleSendLetter} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                      Sender Email Address:
                    </label>
                    <input
                      type="email"
                      value={letterEmail}
                      onChange={(e) => setLetterEmail(e.target.value)}
                      placeholder="you@organization.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-strong)] text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--text-accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                      Inquiry or Project Details:
                    </label>
                    <textarea
                      rows={4}
                      value={letterMsg}
                      onChange={(e) => setLetterMsg(e.target.value)}
                      placeholder="Outline your systems requirements, architecture challenges, or prospective role..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-strong)] text-sm text-[var(--text-primary)] font-editorial focus:outline-none focus:border-[var(--text-accent)]"
                    />
                  </div>

                  {letterError && (
                    <div className="text-xs font-mono text-red-500">
                      {letterError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--fill-primary)] text-[var(--on-primary)] text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Letter to Editor</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Newspaper Colophon Footer */}
        <footer className="mt-12 pt-6 border-t-2 border-[var(--text-primary)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div>
            © 2026 {profile.name} · All rights reserved
          </div>
          <div>
            Published with Next.js 15, OpenNext &amp; Cloudflare Edge
          </div>
        </footer>
      </div>
    </div>
  );
}
