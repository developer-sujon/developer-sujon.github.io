"use client";

import { useState, useEffect, useRef } from "react";
import { ProjectMetadata, resumeData } from "@/data/resumeData";
import { GithubIcon, LinkedinIcon, WhatsAppIcon, VerifiedBadgeIcon } from "./icons";
import { 
  Sun, 
  Moon, 
  Download, 
  Mail, 
  ArrowUpRight, 
  ArrowRight,
  ArrowLeft,
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

export type SectionTab = "overview" | "projects" | "experience" | "contact";
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
  const readerRef = useRef<HTMLDivElement>(null);

  const { profile, experiences, metrics, skillCategories, education } = resumeData;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
  }, []);

  useEffect(() => {
    if (selectedSlug) {
      document.body.style.overflow = "hidden";
      if (readerRef.current) {
        readerRef.current.scrollTop = 0;
      }
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedSlug(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedSlug]);

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
    ["willro", "zotlyx", "elizn", "torongo", "hisabnikash"].includes(p.metadata.slug)
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
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Active online dot */}
                <span
                  className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-black pointer-events-none"
                  title="Active now"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {profile.name}
                  </h1>
                  <VerifiedBadgeIcon className="w-5 h-5" />
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
            {/* 1. About / Narrative */}
            <section className="space-y-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                About
              </h2>
              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                <p>
                  I&apos;m a Lead Software Engineer and Systems Architect with 5+ years of experience building and scaling web platforms. Currently, I lead engineering at{" "}
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Sitgram</span>, where I direct team delivery, own Turborepo monorepo architecture, and build type-safe microservices with oRPC.
                </p>
                <p>
                  Previously at <span className="text-zinc-900 dark:text-zinc-100 font-medium">Yupsis</span> and{" "}
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Shunno IT</span>, I built edge AI pipelines on Cloudflare Workers, real-time IoT event processors, and commercial ERP/inventory systems. I care deeply about clean system design, developer ergonomics, and high-reliability infrastructure.
                </p>
              </div>
            </section>

            {/* 2. Selected Work / Case Studies */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Selected Work
                </h2>
                <button
                  onClick={() => navigateToTab("projects")}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>All Projects ({projects.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {featuredProjects.map(({ metadata }) => (
                  <div
                    key={metadata.slug}
                    onClick={() => setSelectedSlug(metadata.slug)}
                    className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {metadata.title.split("—")[0].trim()}
                        </span>
                        {metadata.company && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                            {metadata.company}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {metadata.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {metadata.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0 self-end sm:self-center font-medium transition-colors">
                      <span>Case study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Career Timeline */}
            <section className="space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Experience
                </h2>
                <button
                  onClick={() => navigateToTab("experience")}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Full History</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/70">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="py-2.5 flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{exp.company}</span>
                      <span className="text-zinc-400 dark:text-zinc-500 font-mono">/</span>
                      <span className="text-zinc-600 dark:text-zinc-400">{exp.role}</span>
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                      {exp.period.split("·")[0].trim()}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Technologies */}
            <section className="space-y-3">
              <div className="pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Technologies
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 block mb-1">Languages &amp; Frameworks</span>
                  <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    TypeScript, JavaScript, Next.js, React, Node.js, NestJS, Express
                  </span>
                </div>
                <div>
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 block mb-1">Architecture &amp; Data</span>
                  <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Turborepo, oRPC, Microservices, RabbitMQ, Redis, PostgreSQL, MongoDB, Prisma
                  </span>
                </div>
                <div>
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 block mb-1">Cloud &amp; DevOps</span>
                  <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Cloudflare Workers, Durable Objects, Docker, Linux VPS, Nginx, AWS, GCP, GitHub Actions
                  </span>
                </div>
                <div>
                  <span className="font-mono text-zinc-400 dark:text-zinc-500 block mb-1">Real-Time &amp; Automation</span>
                  <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    SocketIO, WebSockets, Vectorize RAG, n8n Automation, IoT &amp; Serial Telemetry
                  </span>
                </div>
              </div>
            </section>

            {/* 5. Contact CTA */}
            <section className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-zinc-500 dark:text-zinc-400">
                Open to senior engineering roles, architecture consulting, and advisory.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigateToTab("contact")}
                  className="px-3.5 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Get in Touch
                </button>
                <a
                  href="https://wa.me/8801772703036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
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
                {experiences.map((exp, idx) => {
                  const isPresent = exp.period.toLowerCase().includes("present");
                  return (
                    <div
                      key={idx}
                      className="relative pl-5 sm:pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-3 pb-2 last:pb-0"
                    >
                      {/* Subtle Timeline Node: Clean green for current, muted for past */}
                      <div
                        className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#09090b] ${
                          isPresent ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"
                        }`}
                      />

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
                );
              })}
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
        {/* TAB 4: CONTACT (Direct Message)                                */}
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

      {/* 9. FULL-WIDTH CASE STUDY READER VIEW */}
      {selectedProject && (
        <div 
          ref={readerRef}
          className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased no-print animate-in fade-in duration-150"
        >
          
          {/* Sticky Top Bar */}
          <div className="sticky top-0 z-30 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
              
              {/* Back button */}
              <button
                onClick={() => setSelectedSlug(null)}
                className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Portfolio</span>
              </button>

              {/* Title indicator */}
              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-xs">
                <span>{selectedProject.metadata.company}</span>
                <span>/</span>
                <span className="text-zinc-800 dark:text-zinc-200 truncate font-medium">
                  {selectedProject.metadata.title.split("—")[0].trim()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {selectedProject.metadata.githubUrl && (
                  <a
                    href={selectedProject.metadata.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    title="View Source on GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}

                {selectedProject.metadata.liveUrl && (
                  <a
                    href={selectedProject.metadata.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    <span>{selectedProject.metadata.company === "Open Source" ? "Live Demo" : "Live Production"}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setSelectedSlug(null)}
                  className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Centered Case Study Article Column */}
          <main className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14 space-y-10">
            
            {/* Case Study Header */}
            <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                {selectedProject.metadata.company && (
                  <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-300">
                    {selectedProject.metadata.company}
                  </span>
                )}
                <span className="text-zinc-400 dark:text-zinc-500">
                  {selectedProject.metadata.period}
                </span>
                {selectedProject.metadata.status && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {selectedProject.metadata.status}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                {selectedProject.metadata.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {selectedProject.metadata.tagline}
              </p>

              {/* Technologies */}
              {selectedProject.metadata.tags && selectedProject.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Impact Metrics (if present) */}
            {selectedProject.metadata.metrics && selectedProject.metadata.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                {selectedProject.metadata.metrics.map((m, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {m.label}
                    </div>
                    <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
                      {m.value}
                    </div>
                    {m.sub && (
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                        {m.sub}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Markdown Case Study Body */}
            <article
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: selectedProject.htmlContent }}
            />

            {/* Bottom Footer Navigation */}
            <div className="pt-10 pb-16 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedSlug(null)}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portfolio</span>
              </button>

              <button
                onClick={() => {
                  readerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                ↑ Back to top
              </button>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
