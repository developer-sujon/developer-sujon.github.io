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
  ChevronRight, 
  X, 
  MapPin, 
  Phone, 
  Sparkles,
  Zap,
  Clock,
  Database,
  ArrowUpRight,
  Briefcase,
  Send,
  Terminal,
  Cpu,
  Layers
} from "lucide-react";

export type SectionTab = "overview" | "systems" | "experience" | "contact";
export type CompanyFilter = "all" | "Yupsis" | "Sitgram" | "ShunnoIT";

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

  // Filter projects by company if selected
  const filteredProjects = companyFilter === "all"
    ? projects
    : projects.filter((p) => p.metadata.company?.toLowerCase() === companyFilter.toLowerCase());

  const selectedProject = selectedSlug
    ? projects.find((p) => p.metadata.slug === selectedSlug)
    : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-sky-500/20 selection:text-sky-400 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-20 space-y-12">
        
        {/* 1. HERO & IDENTITY */}
        <header className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            
            {/* Avatar & Title */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {profile.name}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available
                  </span>
                </div>
                
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {profile.title}
                </p>

                <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Theme & CV Download) */}
            <div className="flex items-center gap-2 shrink-0 pt-1">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
              </button>

              <a
                href="/Muhammad-Sujon-CV.pdf"
                download="Muhammad-Sujon-CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            I architect high-throughput distributed systems and data engines. Currently leading systems architecture at{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Yupsis</span> building sub-second AI omnichannel platforms and IoT queue workers, and previously at{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-medium">Sitgram</span> engineering million-row spreadsheet virtualization.
          </p>

          {/* Sleek Contact Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{emailCopied ? "Email copied!" : profile.email}</span>
            </button>

            <button
              onClick={copyPhone}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phoneCopied ? "Phone copied!" : profile.phone}</span>
            </button>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100/80 dark:bg-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </header>

        {/* 2. REFINED SEGMENTED NAVIGATION TABS */}
        <nav className="flex items-center justify-between border-y border-zinc-200 dark:border-zinc-800/80 py-2.5">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
            {[
              { id: "overview", label: "Overview" },
              { id: "systems", label: "Systems & Projects" },
              { id: "experience", label: "Career" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SectionTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            <span>Rajshahi, BD</span>
          </div>
        </nav>

        {/* 3. KEY ARCHITECTURAL METRICS */}
        {(activeTab === "overview" || activeTab === "systems") && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-zinc-200 dark:border-zinc-800/80">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {m.value}
                </div>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {m.label}
                </div>
                {m.sub && (
                  <div className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    {m.sub}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* 4. SYSTEMS & PROJECTS */}
        {(activeTab === "overview" || activeTab === "systems") && (
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  Selected Systems &amp; Case Studies
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Production systems built across Yupsis, Sitgram, and ShunnoIT. Click to inspect.
                </p>
              </div>

              {/* Company Filter Pills */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-xs">
                {(["all", "Yupsis", "Sitgram", "ShunnoIT"] as CompanyFilter[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCompanyFilter(c)}
                    className={`px-2 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                      companyFilter === c
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium shadow-2xs"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    {c === "all" ? "All" : c}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURED LEAD CARD: ZOTLYX (When All or Yupsis is selected) */}
            {(companyFilter === "all" || companyFilter === "Yupsis") && (
              <div
                onClick={() => setSelectedSlug("zotlyx")}
                className="group relative rounded-2xl border border-sky-500/20 dark:border-sky-500/30 bg-gradient-to-b from-sky-50/40 via-transparent to-transparent dark:from-sky-950/20 dark:via-transparent dark:to-transparent p-5 sm:p-6 transition-all hover:border-sky-500/40 dark:hover:border-sky-500/50 hover:shadow-sm cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                      Lead Architecture · Cloudflare Edge &amp; AI
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                      Yupsis · 2024–Present
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs text-sky-500 font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 transition-colors">
                    Zotlyx — AI Omnichannel Support &amp; RBAC Engine
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    Two-zone decoupled architecture combining Cloudflare Workers edge webhooks with 5-second stateful Durable Object debounce sessions and sub-35ms multilingual Vectorize RAG retrieval.
                  </p>
                </div>

                {/* Micro Metric Badges */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <div>
                    <div className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-mono">Latency</div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">&lt; 250ms Global</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-mono">Cost Cut</div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">68% DO Debounce</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-zinc-400 dark:text-zinc-500 font-mono">Channels</div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">WA, TG, IG, FB</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Cloudflare Workers", "Durable Objects", "Cloudflare Queues", "Vectorize (RAG)", "Next.js 15", "Supabase"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* OTHER SYSTEMS LIST */}
            <div className="space-y-2.5">
              {filteredProjects
                .filter((p) => p.metadata.slug !== "zotlyx" || companyFilter !== "all")
                .map(({ metadata }) => (
                  <div
                    key={metadata.slug}
                    onClick={() => setSelectedSlug(metadata.slug)}
                    className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/80 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 transition-colors">
                          {metadata.title.split("—")[0].trim()}
                        </span>
                        {metadata.company && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                            {metadata.company}
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
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* 5. WORK EXPERIENCE (CAREER TIMELINE) */}
        {(activeTab === "overview" || activeTab === "experience") && (
          <section className="space-y-5">
            <div className="pb-1.5 border-b border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                Work Experience &amp; Positions
              </h2>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative pl-5 border-l border-zinc-200 dark:border-zinc-800 space-y-2">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600 border-2 border-[var(--bg-primary)]" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        {exp.role} · <span className="text-sky-500">{exp.company}</span>
                      </h3>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                        {exp.location}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 pl-4 list-disc leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.slice(0, 6).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. TECHNICAL CAPABILITIES */}
        {(activeTab === "overview" || activeTab === "experience") && (
          <section className="space-y-4">
            <div className="pb-1.5 border-b border-zinc-200 dark:border-zinc-800/80">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                Technical Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillCategories.map((cat, i) => (
                <div key={i} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-2">
                  <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                    {cat.skills.map((s, si) => (
                      <span key={si} className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200/60 dark:border-zinc-700/60 font-mono">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. CONTACT / LETTERS DISPATCH */}
        {(activeTab === "overview" || activeTab === "contact") && (
          <section className="space-y-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Letters &amp; Direct Inquiry
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Have an architecture challenge, high-throughput scaling bottleneck, or senior role? Write directly. Replies usually go out within 24 hours.
              </p>
            </div>

            {letterSent ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                Letter received. Expect a prompt response within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSendLetter} className="space-y-3">
                <input
                  type="email"
                  value={letterEmail}
                  onChange={(e) => setLetterEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-sky-500 transition-colors shadow-2xs"
                />
                <textarea
                  rows={3}
                  value={letterMsg}
                  onChange={(e) => setLetterMsg(e.target.value)}
                  placeholder="Tell me about your project, system architecture challenge, or timeline..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-sky-500 transition-colors resize-y shadow-2xs"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </section>
        )}

        {/* 8. ACADEMIC & FOOTER */}
        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 space-y-5 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="space-y-1">
            <div className="font-mono uppercase text-zinc-400 dark:text-zinc-500 text-[11px]">Academic Background</div>
            <div className="text-zinc-900 dark:text-zinc-100 font-medium">
              {education[0].degree}
            </div>
            <div>{education[0].institution} · {education[0].period}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80 font-mono text-[11px]">
            <div>© 2026 {profile.name} · {profile.location}</div>
            <div className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                LinkedIn
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Slide-over panel */}
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {selectedProject.metadata.company || "Project"}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    {selectedProject.metadata.period}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                  {selectedProject.metadata.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSlug(null)}
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick action links */}
            <div className="flex items-center gap-3">
              {selectedProject.metadata.githubUrl && (
                <a
                  href={selectedProject.metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-900 dark:text-zinc-100 hover:underline"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View Source Monorepo ↗</span>
                </a>
              )}
              {selectedProject.metadata.liveUrl && (
                <a
                  href={selectedProject.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-500 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production ↗</span>
                </a>
              )}
            </div>

            {/* Metrics */}
            {selectedProject.metadata.metrics && selectedProject.metadata.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80">
                {selectedProject.metadata.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500">{m.label}</div>
                    <div className="text-base font-bold text-zinc-900 dark:text-zinc-100">{m.value}</div>
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
                className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
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
