"use client";

import { useState, useEffect } from "react";
import { ProjectMetadata, resumeData } from "@/data/resumeData";
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from "./icons";
import { 
  Sun, 
  Moon, 
  Download, 
  Mail, 
  ArrowUpRight, 
  ArrowRight,
  X, 
  MapPin, 
  Send,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  Server,
  Database,
  Cloud,
  CheckCircle2
} from "lucide-react";

export type SectionTab = "overview" | "projects" | "experience" | "capabilities" | "contact";
export type CompanyFilter = "all" | "Sitgram" | "Yupsis" | "Shunno IT" | "Open Source";

interface CleanPortfolioProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

export function CleanPortfolio({ projects }: CleanPortfolioProps) {
  const [isDark, setIsDark] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SectionTab>("overview");
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>("all");
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [letterEmail, setLetterEmail] = useState("");
  const [letterMsg, setLetterMsg] = useState("");
  const [letterSent, setLetterSent] = useState(false);

  const { profile, experiences, metrics, skillCategories, education } = resumeData;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
  }, []);

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

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (letterEmail && letterMsg) {
      setLetterSent(true);
    }
  };

  const companyCounts: Record<CompanyFilter, number> = {
    all: projects.length,
    Sitgram: projects.filter((p) => (p.metadata.company || "").toLowerCase().includes("sitgram")).length,
    Yupsis: projects.filter((p) => (p.metadata.company || "").toLowerCase().includes("yupsis")).length,
    "Shunno IT": projects.filter((p) => (p.metadata.company || "").toLowerCase().includes("shunno")).length,
    "Open Source": projects.filter((p) => (p.metadata.company || "").toLowerCase().includes("open source")).length,
  };

  const filteredProjects = companyFilter === "all"
    ? projects
    : projects.filter((p) => {
        const pComp = (p.metadata.company || "").toLowerCase().replace(/[\s-_]+/g, "");
        const filterComp = companyFilter.toLowerCase().replace(/[\s-_]+/g, "");
        return pComp === filterComp;
      });

  // Top flagship systems for Overview
  const featuredProjects = projects.filter((p) =>
    ["willro", "zotlyx", "torongo", "hisabnikash"].includes(p.metadata.slug)
  );

  const selectedProject = selectedSlug
    ? projects.find((p) => p.metadata.slug === selectedSlug)
    : null;

  const navigateToTab = (tab: SectionTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-20 space-y-10">
        
        {/* 1. HERO & IDENTITY */}
        <header className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            
            {/* Avatar & Title */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {profile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {profile.title}
                </p>

                <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 pt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-2 shrink-0 pt-1">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <a
                href="/Muhammad-Sujon-CV.pdf"
                download="Muhammad-Sujon-CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Lead Software Engineer architecting high-throughput distributed systems and cloud platforms. Currently leading engineering at{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Sitgram</span>, with core engineering experience across{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Yupsis</span> and{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Shunno IT</span> building sub-second AI pipelines, IoT command queues, and high-scale SaaS products.
          </p>

          {/* Clean Contact Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
            <button
              onClick={copyEmail}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{emailCopied ? "Email copied!" : profile.email}</span>
            </button>

            <a
              href="https://wa.me/8801772703036"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{profile.phone}</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub ↗</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn ↗</span>
            </a>
          </div>
        </header>

        {/* 2. NAVIGATION TABS */}
        <nav className="flex items-center gap-5 sm:gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-xs overflow-x-auto no-scrollbar">
          {[
            { id: "overview", label: "Overview" },
            { id: "projects", label: "Projects" },
            { id: "experience", label: "Experience" },
            { id: "capabilities", label: "Capabilities" },
            { id: "contact", label: "Contact" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SectionTab)}
              className={`pb-1 transition-colors cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "text-zinc-900 dark:text-zinc-100 font-medium border-b-2 border-zinc-900 dark:border-zinc-100"
                  : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border-b-2 border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW (Curated Executive Summary & Flagships)        */}
        {/* ============================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* Impact Metrics */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              {metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1"
                >
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">
                    {m.value}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                    {m.label}
                  </div>
                  {m.sub && (
                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-tight">
                      {m.sub}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Featured Flagship Systems */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                    Featured Systems &amp; Flagships
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Production platforms architected for high throughput and scale.
                  </p>
                </div>
                <button
                  onClick={() => navigateToTab("projects")}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
                >
                  <span>All ({projects.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {featuredProjects.map(({ metadata }) => (
                  <div
                    key={metadata.slug}
                    onClick={() => setSelectedSlug(metadata.slug)}
                    className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                          {metadata.title.split("—")[0].trim()}
                        </span>
                        {metadata.company && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            {metadata.company}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                          · Flagship
                        </span>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                        {metadata.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {metadata.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0 self-end sm:self-center font-medium">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {/* View all projects button */}
              <button
                onClick={() => navigateToTab("projects")}
                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-zinc-50/30 dark:bg-zinc-900/20 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>View all 12 projects &amp; case studies</span>
                <span className="flex items-center gap-1 font-medium group-hover:translate-x-0.5 transition-transform">
                  Explore Projects <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </section>

            {/* Leadership & Current Roles Snapshot */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Engineering Leadership Snapshot
                </h2>
                <button
                  onClick={() => navigateToTab("experience")}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
                >
                  <span>Full History (4)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Sitgram Card */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Sitgram</span>
                    <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">Dec 2024 – Present</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Lead Software Engineer
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Directing team delivery, Turborepo monorepo architecture, end-to-end oRPC type contracts, RabbitMQ/Redis microservices, and Linux VPS infrastructure.
                  </p>
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 pt-1">
                    Shipped: Willro, Elizn
                  </div>
                </div>

                {/* Yupsis Card */}
                <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Yupsis</span>
                    <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">Sep 2024 – Dec 2025</span>
                  </div>
                  <div className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Software Engineer
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Architected Cloudflare edge pipelines, Vectorize RAG pipelines, MikroTik hotspot billing engines, and real-time SocketIO systems.
                  </p>
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 pt-1">
                    Shipped: Zotlyx, Torongo, Eazlock
                  </div>
                </div>
              </div>
            </section>

            {/* Core Technical Domains Matrix */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Core Engineering Domains
                </h2>
                <button
                  onClick={() => navigateToTab("capabilities")}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer"
                >
                  <span>All Capabilities</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    Distributed Cloud &amp; Edge
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Cloudflare Workers, Durable Objects, Docker, Linux VPS, Nginx, Hyperdrive
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    Backend Architecture &amp; Scale
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    NestJS, Node.js, RabbitMQ, Redis, oRPC Type Safety, Turborepo
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    Real-Time Systems &amp; AI
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Vectorize RAG, SocketIO, WebSockets, LLM Burst Debounce, Workers AI
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-mono">
                    Automation &amp; Hardware
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    n8n Workflow Automation, Webhooks, IoT &amp; Arduino, Sensor Telemetry
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Contact CTA */}
            <section className="p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Ready to discuss high-throughput systems or leadership roles?
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Available for full-time leadership, architecture consulting, or advisory.
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigateToTab("contact")}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Write Message
                </button>
                <a
                  href="https://wa.me/8801772703036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PROJECTS (Complete 12-Project Catalog with Clean Filter) */}
        {/* ============================================================== */}
        {activeTab === "projects" && (
          <section className="space-y-5">
            <div className="space-y-2 pb-1 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                    Projects &amp; Case Studies
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    12 production platforms, SaaS architectures, and open-source systems. Click to inspect.
                  </p>
                </div>
              </div>

              {/* Clean Company Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 pb-1">
                {(["all", "Sitgram", "Yupsis", "Shunno IT", "Open Source"] as CompanyFilter[]).map((c) => {
                  const count = companyCounts[c];
                  const isSelected = companyFilter === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setCompanyFilter(c)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium shadow-xs"
                          : "bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/50"
                      }`}
                    >
                      <span>{c === "all" ? "All" : c}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected
                            ? "bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800"
                            : "bg-zinc-200/80 dark:bg-zinc-700/80 text-zinc-500 dark:text-zinc-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filtered Project Cards List */}
            <div className="space-y-3">
              {filteredProjects.map(({ metadata }) => (
                <div
                  key={metadata.slug}
                  onClick={() => setSelectedSlug(metadata.slug)}
                  className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {metadata.title.split("—")[0].trim()}
                      </span>
                      {metadata.company && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {metadata.company}
                        </span>
                      )}
                      {metadata.featured && (
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                          · Lead System
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1 leading-relaxed">
                      {metadata.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {metadata.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0 self-end sm:self-center font-medium">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 3: EXPERIENCE (Work History Timeline & Education Only)     */}
        {/* ============================================================== */}
        {activeTab === "experience" && (
          <div className="space-y-12">
            {/* Work Experience Timeline */}
            <section className="space-y-6">
              <div className="pb-1.5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                    Work Experience &amp; Leadership
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Engineering impact, team leadership, and systems shipped across 4 companies.
                  </p>
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                  5+ Years
                </span>
              </div>

              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="relative pl-5 sm:pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-3 pb-2 last:pb-0"
                  >
                    {/* Subtle Timeline Node */}
                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 border-2 border-[var(--bg-primary)]" />

                    {/* Header: Company, Role, Period */}
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                            {exp.company}
                          </h3>
                          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">/</span>
                          <span className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                            {exp.role}
                          </span>
                        </div>
                        
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                          {exp.period}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                        <span>{exp.location}</span>
                        {exp.type && (
                          <>
                            <span>·</span>
                            <span>{exp.type}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Role Summary */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    {/* Key Systems Shipped (Interactive Clickable Links) */}
                    {exp.projectsMentioned && exp.projectsMentioned.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap pt-0.5">
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">Shipped:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.projectsMentioned.map((projName) => {
                            const cleanName = projName.toLowerCase().replace(/[\s-_]+/g, "");
                            const matchingProject = projects.find((p) => {
                              const pTitle = p.metadata.title.toLowerCase().replace(/[\s-_]+/g, "");
                              const pSlug = p.metadata.slug.toLowerCase().replace(/[\s-_]+/g, "");
                              return pTitle.includes(cleanName) || pSlug === cleanName || pSlug.includes(cleanName);
                            });
                            return matchingProject ? (
                              <button
                                key={projName}
                                onClick={() => setSelectedSlug(matchingProject.metadata.slug)}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>{projName}</span>
                                <ArrowUpRight className="w-2.5 h-2.5" />
                              </button>
                            ) : (
                              <span
                                key={projName}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                {projName}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Bullet Highlights with Dash */}
                    <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-3 border-l border-zinc-100 dark:border-zinc-800/60">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-zinc-400 dark:text-zinc-500 select-none mt-0.5 text-xs">—</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Academic Credentials within Experience */}
            <section className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="pb-1 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Academic Background
                </h2>
              </div>

              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                        {edu.degree}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                        {edu.period}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400">
                      {edu.institution}
                    </div>
                    {edu.details && (
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
                        {edu.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CAPABILITIES                                           */}
        {/* ============================================================== */}
        {activeTab === "capabilities" && (
          <section className="space-y-6">
            <div className="pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                Technical Capabilities
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Core technologies, runtimes, and engineering tooling used across production platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-2.5"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-mono">
                    {cat.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                    {cat.skills.map((s, si) => (
                      <span
                        key={si}
                        className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/40"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 5: CONTACT (Direct Message & Channels)                      */}
        {/* ============================================================== */}
        {activeTab === "contact" && (
          <div className="space-y-8">
            <section className="space-y-4 p-5 sm:p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Have an architecture challenge, high-throughput scaling bottleneck, or looking for a Lead Engineer? Send a note directly.
                </p>
              </div>

              {letterSent ? (
                <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  Message received. Thank you! I will reply to your email within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSendLetter} className="space-y-3">
                  <input
                    type="email"
                    value={letterEmail}
                    onChange={(e) => setLetterEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                  />
                  <textarea
                    rows={4}
                    value={letterMsg}
                    onChange={(e) => setLetterMsg(e.target.value)}
                    placeholder="Tell me about your project, system architecture requirements, or timeline..."
                    required
                    className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors resize-y"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </section>

            {/* Channels & Availability Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
                <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase">WhatsApp (Direct)</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <a href="https://wa.me/8801772703036" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1.5">
                    <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                    <span>{profile.phone}</span>
                  </a>
                </div>
                <div className="text-[11px] text-zinc-500">Fastest response for urgent architecture consultations.</div>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-1.5">
                <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase">Direct Email</div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <button onClick={copyEmail} className="hover:underline flex items-center gap-1.5 cursor-pointer">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <span>{emailCopied ? "Copied!" : profile.email}</span>
                  </button>
                </div>
                <div className="text-[11px] text-zinc-500">Checked daily. Official offers &amp; NDAs.</div>
              </div>
            </div>
          </div>
        )}

        {/* 8. FOOTER */}
        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px]">
            <div>© 2026 {profile.name} · {profile.location}</div>
            <div className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                LinkedIn
              </a>
              <a href="https://wa.me/8801772703036" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                WhatsApp
              </a>
              <a href={`mailto:${profile.email}`} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                Email
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* 9. SLIDE-OVER CASE STUDY DRAWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex justify-end no-print">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedSlug(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over panel */}
          <div className="relative w-full max-w-full sm:max-w-2xl lg:max-w-3xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl z-10">
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {selectedProject.metadata.company || "Project"}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    {selectedProject.metadata.period}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                  {selectedProject.metadata.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSlug(null)}
                className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick action links */}
            <div className="flex items-center gap-4 text-xs font-mono">
              {selectedProject.metadata.githubUrl && (
                <a
                  href={selectedProject.metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Source (GitHub) ↗</span>
                </a>
              )}
              {selectedProject.metadata.liveUrl && (
                <a
                  href={selectedProject.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1.5"
                >
                  <span>{selectedProject.metadata.company === "Open Source" ? "Live Demo / Deploy ↗" : "Live Production ↗"}</span>
                </a>
              )}
            </div>

            {/* Metrics */}
            {selectedProject.metadata.metrics && selectedProject.metadata.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                {selectedProject.metadata.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500">{m.label}</div>
                    <div className="text-base font-semibold font-mono text-zinc-900 dark:text-zinc-100">{m.value}</div>
                    {m.sub && <div className="text-[10px] text-zinc-500">{m.sub}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Markdown Case Study Body */}
            <div
              className="markdown-body pt-2"
              dangerouslySetInnerHTML={{ __html: selectedProject.htmlContent }}
            />

            {/* Footer close button */}
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setSelectedSlug(null)}
                className="w-full py-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
