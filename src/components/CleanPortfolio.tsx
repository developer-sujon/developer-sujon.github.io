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
  ArrowRight, 
  Phone, 
  Globe, 
  Send
} from "lucide-react";

interface CleanPortfolioProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

type NavTab = "front" | "archive" | "career" | "letters";

export function CleanPortfolio({ projects }: CleanPortfolioProps) {
  const [currentTab, setCurrentTab] = useState<NavTab>("front");
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [fontSize, setFontSize] = useState<number>(15);
  const [archiveFilter, setArchiveFilter] = useState<string>("All");
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [tickerIdx, setTickerIdx] = useState(0);

  // Form states
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formSent, setFormSent] = useState(false);
  const [formErr, setFormErr] = useState("");

  const { profile, experiences, metrics, skillCategories, education } = resumeData;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");

    const timer = setInterval(() => {
      setTickerIdx((prev) => (prev + 1) % profile.statusTicker.length);
    }, 3000);
    return () => clearInterval(timer);
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
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const openArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const switchTab = (tab: NavTab) => {
    setCurrentTab(tab);
    setActiveArticleSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeArticle = activeArticleSlug
    ? projects.find((p) => p.metadata.slug === activeArticleSlug)
    : null;

  const leadProject = projects.find((p) => p.metadata.slug === "zotlyx") || projects[0];
  const sideProjects = projects.filter((p) => p.metadata.slug !== leadProject?.metadata.slug);

  const archiveTags = ["All", "Yupsis", "Sitgram", "ShunnoIT", "Cloudflare", "Next.js", "Spreadsheets"];

  const filteredProjects = projects.filter(({ metadata }) => {
    if (archiveFilter === "All") return true;
    if (archiveFilter === "Yupsis") return metadata.company === "Yupsis";
    if (archiveFilter === "Sitgram") return metadata.company === "Sitgram";
    if (archiveFilter === "ShunnoIT") return metadata.company === "ShunnoIT";
    if (archiveFilter === "Cloudflare") return metadata.tags.some(t => t.includes("Cloudflare"));
    if (archiveFilter === "Next.js") return metadata.tags.some(t => t.includes("Next.js"));
    if (archiveFilter === "Spreadsheets") return metadata.tags.some(t => t.includes("Handsontable") || t.includes("Workers"));
    return true;
  });

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.includes("@")) {
      setFormErr("Please enter a valid email address.");
      return;
    }
    if (formMsg.trim().length < 5) {
      setFormErr("Please enter a brief message.");
      return;
    }
    setFormErr("");
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased py-8 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">

        {/* 1. CLEAN EDITORIAL MASTHEAD */}
        <header className="text-center pt-2 pb-5 border-b-2 border-[var(--text-primary)]">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--text-muted)] mb-2">
            Independent Software &amp; Systems Journal
          </div>

          <h1
            onClick={() => switchTab("front")}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] cursor-pointer hover:opacity-90 transition-opacity"
          >
            {profile.name}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] italic mt-2 max-w-xl mx-auto leading-relaxed">
            Full-stack developer &amp; systems architect. Stories about systems I&apos;ve built at Yupsis and Sitgram.
          </p>
        </header>

        {/* 2. METADATA & LIVE TICKER LINE */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-[var(--border)] text-xs text-[var(--text-secondary)] font-mono">
          <div className="flex items-center gap-3">
            <span>{profile.location}</span>
            <span>·</span>
            <a href={`tel:${profile.phone}`} className="hover:text-[var(--text-primary)] transition-colors">
              {profile.phone}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[var(--text-primary)] font-medium">
                {profile.statusTicker[tickerIdx]}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer text-[11px]"
            >
              {isDark ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-zinc-700" />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>

        {/* 3. 4-TAB NAVIGATION (Front page, Archive, Career, Letters) */}
        <nav className="no-print flex items-center justify-center gap-6 sm:gap-10 pb-4 border-b border-[var(--border)] text-xs sm:text-sm font-medium">
          {[
            { id: "front", label: "Front page" },
            { id: "archive", label: "Archive" },
            { id: "career", label: "Career" },
            { id: "letters", label: "Letters" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id as NavTab)}
              className={`pb-1 transition-all cursor-pointer border-b-2 ${
                currentTab === tab.id && !activeArticleSlug
                  ? "text-[var(--text-primary)] border-[var(--text-primary)] font-semibold"
                  : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ==================== VIEW 1: FULL ARTICLE VIEW ==================== */}
        {activeArticle ? (
          <article className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
              <button onClick={() => switchTab("front")} className="hover:text-[var(--text-primary)] cursor-pointer">
                Front page
              </button>
              <span>/</span>
              <button onClick={() => switchTab("archive")} className="hover:text-[var(--text-primary)] cursor-pointer">
                Archive
              </button>
              <span>/</span>
              <span className="text-[var(--text-primary)] font-medium">
                {activeArticle.metadata.title.split("—")[0].trim()}
              </span>
            </div>

            {/* Article Heading */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-medium text-sky-400">
                {activeArticle.metadata.kicker || `${activeArticle.metadata.company} · ${activeArticle.metadata.period}`}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                {activeArticle.metadata.title}
              </h2>
              <p className="text-base text-[var(--text-secondary)] italic leading-relaxed">
                {activeArticle.metadata.tagline}
              </p>
            </div>

            {/* Bylines & Resizer */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 border-y border-[var(--border)] text-xs text-[var(--text-muted)] font-mono">
              <div>
                By <strong className="text-[var(--text-primary)]">{profile.name}</strong> · {activeArticle.metadata.company} · {activeArticle.metadata.period}
              </div>

              <div className="flex items-center gap-1.5">
                <span>Text size:</span>
                <div className="inline-flex border border-[var(--border)] rounded overflow-hidden">
                  <button
                    onClick={() => setFontSize(prev => Math.max(13, prev - 1))}
                    className="px-2 py-0.5 hover:bg-[var(--bg-secondary)] cursor-pointer"
                  >
                    A−
                  </button>
                  <button
                    onClick={() => setFontSize(prev => Math.min(19, prev + 1))}
                    className="px-2 py-0.5 hover:bg-[var(--bg-secondary)] cursor-pointer"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {activeArticle.metadata.githubUrl && (
                <a
                  href={activeArticle.metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Source Monorepo</span>
                </a>
              )}
              {activeArticle.metadata.liveUrl && (
                <a
                  href={activeArticle.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production</span>
                </a>
              )}
            </div>

            {/* Rendered Markdown Content */}
            <div
              className="markdown-body leading-relaxed pt-2"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: activeArticle.htmlContent }}
            />

            {/* Next Story Link */}
            <div className="pt-6 border-t-2 border-[var(--text-primary)] flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => switchTab("front")}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                ← Back to Front page
              </button>

              <button
                onClick={() => {
                  const idx = projects.findIndex(p => p.metadata.slug === activeArticle.metadata.slug);
                  const nextSlug = projects[(idx + 1) % projects.length].metadata.slug;
                  openArticle(nextSlug);
                }}
                className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Read next story</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ) : null}

        {/* ==================== VIEW 2: FRONT PAGE ==================== */}
        {!activeArticleSlug && currentTab === "front" && (
          <div className="space-y-10">
            {/* 2-Column Lead Story & In-Brief Sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left: Lead Story (Zotlyx) */}
              <div className="md:col-span-7 space-y-4 md:pr-6 md:border-r border-[var(--border)]">
                <div className="text-xs font-mono font-medium text-sky-400">
                  {leadProject.metadata.kicker || "Cloudflare Edge & AI Architecture · Lead story"}
                </div>

                <h2
                  onClick={() => openArticle(leadProject.metadata.slug)}
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] cursor-pointer hover:underline leading-snug"
                >
                  {leadProject.metadata.title}
                </h2>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] italic leading-relaxed">
                  {leadProject.metadata.tagline}
                </p>

                {/* Minimal preview diagram */}
                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span>Two-Zone Split Architecture</span>
                    <span className="text-sky-400">Yupsis</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                    <div className="p-2 rounded bg-[var(--bg-primary)] border border-[var(--border)]">
                      <div className="text-[10px] text-[var(--text-muted)]">Edge Webhook</div>
                      <div className="font-semibold mt-0.5">&lt; 15ms HMAC</div>
                    </div>
                    <div className="p-2 rounded bg-[var(--bg-primary)] border border-sky-500/30 text-sky-400">
                      <div className="text-[10px]">Durable Object</div>
                      <div className="font-semibold mt-0.5">5s Debounce</div>
                    </div>
                    <div className="p-2 rounded bg-[var(--bg-primary)] border border-[var(--border)]">
                      <div className="text-[10px] text-[var(--text-muted)]">Vectorize RAG</div>
                      <div className="font-semibold mt-0.5">&lt; 35ms bge-m3</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Zotlyx is an enterprise-grade AI omnichannel customer support engine running across Meta, WhatsApp, Telegram, and website widgets. To handle rapid burst messaging without inflating LLM API costs, I engineered a 5-second inactivity Durable Object debouncer reducing costs by 68%.
                </p>

                <button
                  onClick={() => openArticle(leadProject.metadata.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:underline cursor-pointer pt-1"
                >
                  <span>Read the full story →</span>
                </button>
              </div>

              {/* Right: In Brief Stories */}
              <div className="md:col-span-5 space-y-5">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border)] pb-1.5">
                  In brief
                </div>

                <div className="space-y-4 divide-y divide-[var(--border)]">
                  {sideProjects.map((p, i) => (
                    <div
                      key={p.metadata.slug}
                      onClick={() => openArticle(p.metadata.slug)}
                      className={`cursor-pointer group ${i !== 0 ? "pt-4" : ""}`}
                    >
                      <div className="text-[11px] font-mono text-sky-400 mb-0.5">
                        {p.metadata.company || "Project"} · {p.metadata.period}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:underline leading-snug">
                        {p.metadata.title.split("—")[0].trim()}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed">
                        {p.metadata.tagline}
                      </p>
                      <div className="text-[11px] font-mono text-sky-400 mt-1.5 flex items-center gap-1">
                        <span>Read story →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="py-6 border-y-2 border-[var(--text-primary)] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                    {m.label}
                  </div>
                  {m.sub && <div className="text-[11px] text-[var(--text-muted)]">{m.sub}</div>}
                </div>
              ))}
            </div>

            {/* Author Bio & Skills Index */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  About the author
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] shrink-0">
                    <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <strong>{profile.name}</strong> builds high-performance distributed systems, edge pipelines, and data engines across <strong>Yupsis</strong> and <strong>Sitgram</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  Skills index
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono">
                  Cloudflare Workers, Durable Objects, Vectorize RAG, Handsontable, Next.js 15, PostgreSQL, Drizzle ORM, Nest.js, Redis, RabbitMQ.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== VIEW 3: ARCHIVE ==================== */}
        {!activeArticleSlug && currentTab === "archive" && (
          <div className="space-y-6">
            <div className="border-b border-[var(--border)] pb-3">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Archive
              </h2>
              <p className="text-sm text-[var(--text-secondary)] italic mt-1">
                Every story, newest first.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-1.5">
              {archiveTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setArchiveFilter(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer border ${
                    archiveFilter === tag
                      ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent font-medium"
                      : "border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)]">
              {filteredProjects.length} {filteredProjects.length === 1 ? "story" : "stories"}
            </div>

            {/* List */}
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {filteredProjects.map(({ metadata }) => (
                <div
                  key={metadata.slug}
                  onClick={() => openArticle(metadata.slug)}
                  className="py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--bg-secondary)] px-2 -mx-2 rounded-lg transition-colors group"
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-sky-400">
                      {metadata.company || "Independent"} · {metadata.period}
                    </div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:underline">
                      {metadata.title}
                    </h3>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {metadata.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-mono text-[var(--text-muted)]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] shrink-0 flex items-center gap-1">
                    <span>Read →</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== VIEW 4: CAREER ==================== */}
        {!activeArticleSlug && currentTab === "career" && (
          <div className="space-y-8">
            <div className="border-b border-[var(--border)] pb-3">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Career
              </h2>
              <p className="text-sm text-[var(--text-secondary)] italic mt-1">
                Where the stories came from.
              </p>
            </div>

            {/* Experience Items in clean 2-column layout */}
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 pt-4 first:pt-0 border-t first:border-t-0 border-[var(--border)]">
                  <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)] pt-0.5">
                    {exp.period}
                  </div>

                  <div className="sm:col-span-9 space-y-2">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-medium text-sky-400 font-mono">
                        {exp.company} · {exp.location}
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {exp.summary}
                    </p>

                    <ul className="space-y-1 text-xs text-[var(--text-secondary)] pl-4 list-disc leading-relaxed">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px] text-[var(--text-muted)]">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Education */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 pt-4 border-t border-[var(--border)]">
                <div className="sm:col-span-3 text-xs font-mono text-[var(--text-muted)] pt-0.5">
                  Academic
                </div>
                <div className="sm:col-span-9 space-y-1">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {education[0].degree}
                  </h3>
                  <div className="text-xs font-mono text-sky-400">
                    {education[0].institution} · {education[0].period}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {education[0].details}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills index */}
            <div className="pt-6 border-t-2 border-[var(--text-primary)] space-y-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Skills index
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {skillCategories.map((c, i) => (
                  <div key={i} className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
                    <div className="font-mono font-semibold text-[var(--text-primary)] mb-1">
                      {c.title}
                    </div>
                    <div className="text-[var(--text-secondary)] font-mono text-[11px] leading-relaxed">
                      {c.skills.map(s => s.name).join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== VIEW 5: LETTERS (CONTACT) ==================== */}
        {!activeArticleSlug && currentTab === "letters" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="border-b border-[var(--border)] pb-3">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Letters to the editor
              </h2>
              <p className="text-sm text-[var(--text-secondary)] italic mt-1 leading-relaxed">
                Have a role, a project, or just a question? Write in. Replies usually go out within a day.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
              >
                {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{emailCopied ? "Email copied!" : `Copy ${profile.email}`}</span>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href="/Muhammad-Sujon-CV.pdf"
                download="Muhammad-Sujon-CV.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Form */}
            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              {formSent ? (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  ✓ Letter received. Expect a reply soon.
                </div>
              ) : (
                <form onSubmit={handleSendLetter} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Tell me about your project or role..."
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  {formErr && (
                    <div className="text-xs text-red-400 font-mono">
                      {formErr}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send letter</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 4. CLEAN FOOTER */}
        <footer className="pt-8 border-t-2 border-[var(--text-primary)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
          <div>
            © 2026 {profile.name} · {profile.location}
          </div>
          <div>
            Built with Next.js &amp; Tailwind
          </div>
        </footer>

      </div>
    </div>
  );
}
