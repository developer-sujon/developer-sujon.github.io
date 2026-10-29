"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectMetadata, resumeData } from "@/data/resumeData";
import { GithubIcon, LinkedinIcon, WhatsAppIcon, VerifiedBadgeIcon, MediumIcon } from "./icons";
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
  BookOpen,
  Cpu,
  Server,
  Database,
  Cloud,
  CheckCircle2
} from "lucide-react";

export type SectionTab = "overview" | "projects" | "articles" | "experience" | "contact";
export type CompanyFilter = "all" | "Sitgram" | "Yupsis" | "Shunno IT" | "Open Source";

interface CleanPortfolioProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

export function CleanPortfolio({ projects }: CleanPortfolioProps) {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<SectionTab>("overview");
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>("all");
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [letterEmail, setLetterEmail] = useState("");
  const [letterMsg, setLetterMsg] = useState("");
  const [letterSent, setLetterSent] = useState(false);

  const { profile, experiences, metrics, skillCategories, education, articles } = resumeData;

  useEffect(() => {
    // Sync with system theme initialized by layout head script
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    setIsDark(isCurrentlyDark);

    // Listen to system changes if user hasn't explicitly set a preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem("theme");
      if (!saved) {
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);



  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch (e) {}
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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

  const navigateToTab = (tab: SectionTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-6 sm:pt-10 pb-16 sm:pb-24 space-y-10">
        
        {/* 1. HERO & IDENTITY */}
        <header className="space-y-4">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            
            {/* Avatar & Title */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Active online dot */}
                <span
                  className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#09090b] pointer-events-none"
                  title="Active now"
                />
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                    {profile.name}
                  </h1>
                  <VerifiedBadgeIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pt-0.5 sm:pt-1">
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
                aria-label="Download Resume"
                title="Download Resume"
                className="w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Software Engineer building web platforms and cloud infrastructure. Currently working at{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Sitgram</span>, with core engineering experience across{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Yupsis</span> and{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Shunno IT</span> building multi-tenant monorepos, edge APIs, IoT command queues, and production SaaS platforms.
          </p>

          {/* Clean Contact Links */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
            <button
              onClick={copyEmail}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer flex items-center gap-1.5 break-all sm:break-normal"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>{emailCopied ? "Email copied!" : profile.email}</span>
            </button>

            <a
              href="https://wa.me/8801772703036"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{profile.phone}</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1 shrink-0"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub ↗</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1 shrink-0"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn ↗</span>
            </a>

            <a
              href={profile.medium || "https://medium.com/@muhammad-sujon"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1 shrink-0"
            >
              <MediumIcon className="w-3.5 h-3.5" />
              <span>Medium ↗</span>
            </a>
          </div>
        </header>

        {/* 2. NAVIGATION TABS */}
        <nav className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-xs overflow-x-auto no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0">
          {[
            { id: "overview", label: "Overview" },
            { id: "projects", label: "Projects" },
            { id: "articles", label: "Articles" },
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
                  I&apos;m a Software Engineer with 5+ years of experience building and scaling web platforms. Currently at{" "}
                  <span className="text-zinc-900 dark:text-zinc-100 font-medium">Sitgram</span>, working on Turborepo monorepo architecture and type-safe microservices with oRPC.
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
                  <Link
                    key={metadata.slug}
                    href={`/projects/${metadata.slug}`}
                    className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-3 block"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
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
                  </Link>
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

            {/* 4. Technologies & Core Skills */}
            <section className="space-y-3">
              <div className="pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Skills &amp; Technologies
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {skillCategories.map((cat) => (
                  <div key={cat.title}>
                    <span className="font-mono text-zinc-400 dark:text-zinc-500 block mb-1">
                      {cat.title}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {cat.skills.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Articles & Writing Preview */}
            <section className="space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Articles &amp; Writing
                </h2>
                <button
                  onClick={() => navigateToTab("articles")}
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>All Articles ({articles.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {articles.slice(0, 3).map((art) => (
                  <a
                    key={art.slug}
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex items-start justify-between gap-3 block"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                          {art.publication || "Medium"}
                        </span>
                        <span>·</span>
                        <span>{art.publishedAt}</span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h3 className="font-medium text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors line-clamp-1">
                        {art.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 font-normal">
                        {art.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </section>

            {/* 6. Contact CTA */}
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
                <Link
                  key={metadata.slug}
                  href={`/projects/${metadata.slug}`}
                  className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 block"
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
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 3: ARTICLES (Medium Articles & Technical Writing)          */}
        {/* ============================================================== */}
        {activeTab === "articles" && (
          <section className="space-y-6">
            <div className="space-y-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                    Articles &amp; Publications ({articles.length})
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Engineering deep-dives into NestJS architecture patterns, networking internals, and distributed systems.
                  </p>
                </div>

                <a
                  href={profile.medium || "https://medium.com/@muhammad-sujon"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors w-fit shrink-0 cursor-pointer"
                >
                  <MediumIcon className="w-3.5 h-3.5" />
                  <span>Follow on Medium</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </div>

            <div className="space-y-3.5">
              {articles.map((art) => (
                <a
                  key={art.slug}
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/20 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                        <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium">
                          {art.publication || "Medium"}
                        </span>
                        <span>·</span>
                        <span>{art.publishedAt}</span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                      </div>

                      <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors leading-snug">
                        {art.title}
                      </h3>
                    </div>

                    <div className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {art.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {art.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 4: EXPERIENCE (Work History Timeline & Education Only)     */}
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
                              <Link
                                key={projName}
                                href={`/projects/${matchingProject.metadata.slug}`}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>{projName}</span>
                                <ArrowUpRight className="w-2.5 h-2.5" />
                              </Link>
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


    </div>
  );
}
