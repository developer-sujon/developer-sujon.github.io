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
  Layers,
  Sparkles,
  Zap,
  Clock,
  Database,
  Briefcase,
  Send,
  Terminal,
  Cpu
} from "lucide-react";

export type SectionTab = "all" | "systems" | "experience" | "contact";
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
  const [activeTab, setActiveTab] = useState<SectionTab>("all");
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-20 space-y-12">
        
        {/* 1. HEADER SECTION (Minimalist Profile) */}
        <header className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            {/* Avatar & Identity */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[var(--border)] shrink-0 shadow-xs">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {profile.name}
                  </h1>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for high-impact systems roles" />
                </div>
                <p className="text-sm text-[var(--text-secondary)] font-medium">
                  {profile.title}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono pt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Theme & PDF) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
              </button>

              <a
                href="/Muhammad-Sujon-CV.pdf"
                download="Muhammad-Sujon-CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download CV</span>
                <span className="sm:hidden">CV</span>
              </a>
            </div>
          </div>

          {/* Bio text */}
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            I architect high-throughput distributed systems and data engines. Currently leading systems architecture at{" "}
            <span className="text-[var(--text-primary)] font-medium">Yupsis</span> building sub-second AI omnichannel platforms and IoT queue workers, and previously at{" "}
            <span className="text-[var(--text-primary)] font-medium">Sitgram</span> engineering million-row spreadsheet virtualization.
          </p>

          {/* Contact Links Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-[var(--text-secondary)] font-mono">
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{emailCopied ? "Email copied!" : profile.email}</span>
            </button>

            <button
              onClick={copyPhone}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{phoneCopied ? "Phone copied!" : profile.phone}</span>
            </button>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </header>

        {/* 2. ORGANIZED NAVIGATION MENU TABS */}
        <nav className="flex items-center justify-between border-y border-[var(--border)] py-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { id: "all", label: "Overview" },
              { id: "systems", label: "Systems & Projects" },
              { id: "experience", label: "Career" },
              { id: "contact", label: "Contact / Letter" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SectionTab)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium shadow-xs"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available</span>
          </div>
        </nav>

        {/* 3. KEY METRICS ROW */}
        {(activeTab === "all" || activeTab === "systems") && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-[var(--border)] text-center sm:text-left">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
                  {m.value}
                </div>
                <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase">
                  {m.label}
                </div>
                {m.sub && (
                  <div className="text-[10px] text-[var(--text-secondary)]">
                    {m.sub}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* 4. SELECTED SYSTEMS & PROJECTS */}
        {(activeTab === "all" || activeTab === "systems") && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                  Selected Systems &amp; Case Studies
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Production systems built across Yupsis, Sitgram, and ShunnoIT. Click to inspect.
                </p>
              </div>

              {/* Company Filter Chips */}
              <div className="flex items-center gap-1 font-mono text-xs">
                {(["all", "Yupsis", "Sitgram", "ShunnoIT"] as CompanyFilter[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCompanyFilter(c)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
                      companyFilter === c
                        ? "bg-[var(--tag-bg)] text-[var(--text-primary)] border-[var(--border)] font-medium"
                        : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)]"
                    }`}
                  >
                    {c === "all" ? "All Companies" : c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredProjects.map(({ metadata }) => (
                <div
                  key={metadata.slug}
                  onClick={() => setSelectedSlug(metadata.slug)}
                  className={`group p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-zinc-500/50 dark:hover:border-zinc-400/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    metadata.slug === "zotlyx" ? "ring-1 ring-sky-500/20" : ""
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-sky-400 transition-colors">
                        {metadata.title.split("—")[0].trim()}
                      </span>
                      {metadata.company && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--border)]">
                          {metadata.company}
                        </span>
                      )}
                      {metadata.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 hidden sm:inline-block">
                          Lead Architecture
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-1 leading-relaxed">
                      {metadata.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {metadata.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] shrink-0 self-end sm:self-center">
                    <span>Inspect</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. WORK EXPERIENCE SECTION */}
        {(activeTab === "all" || activeTab === "experience") && (
          <section className="space-y-5">
            <div className="pb-1.5 border-b border-[var(--border)]">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Work Experience &amp; Positions
              </h2>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                        {exp.role} · <span className="text-sky-400">{exp.company}</span>
                      </h3>
                      <span className="text-xs text-[var(--text-muted)] font-mono">
                        {exp.location}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pl-4 list-disc leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.technologies.slice(0, 6).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--border)]">
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
        {(activeTab === "all" || activeTab === "experience") && (
          <section className="space-y-4">
            <div className="pb-1.5 border-b border-[var(--border)]">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                Technical Capabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillCategories.map((cat, i) => (
                <div key={i} className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] space-y-1.5">
                  <div className="text-xs font-semibold font-mono text-[var(--text-primary)]">
                    {cat.title}
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] font-mono text-[var(--text-secondary)]">
                    {cat.skills.map((s, si) => (
                      <span key={si} className="bg-[var(--tag-bg)] px-1.5 py-0.5 rounded border border-[var(--border)]">
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
        {(activeTab === "all" || activeTab === "contact") && (
          <section className="space-y-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Letters &amp; Direct Inquiry
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Have an architecture challenge, high-throughput scaling bottleneck, or senior role? Write directly.
              </p>
            </div>

            {letterSent ? (
              <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                Letter received. Expect a prompt response within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSendLetter} className="space-y-2.5">
                <input
                  type="email"
                  value={letterEmail}
                  onChange={(e) => setLetterEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500"
                />
                <textarea
                  rows={3}
                  value={letterMsg}
                  onChange={(e) => setLetterMsg(e.target.value)}
                  placeholder="Tell me about your project, system architecture, or timeline..."
                  required
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-xs font-mono text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-sky-500 resize-y"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </section>
        )}

        {/* 8. EDUCATION & FOOTER */}
        <footer className="pt-8 border-t border-[var(--border)] space-y-6 text-xs text-[var(--text-muted)]">
          <div className="space-y-1">
            <div className="font-mono uppercase text-[var(--text-muted)] text-[11px]">Academic Background</div>
            <div className="text-[var(--text-primary)] font-medium">
              {education[0].degree}
            </div>
            <div>{education[0].institution} · {education[0].period}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[var(--border)] font-mono text-[11px]">
            <div>© 2026 {profile.name} · {profile.location}</div>
            <div className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)]">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="hover:text-[var(--text-primary)]">
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
          <div className="relative w-full max-w-xl bg-[var(--bg-primary)] border-l border-[var(--border)] h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--tag-bg)] text-[var(--tag-text)] border border-[var(--border)]">
                    {selectedProject.metadata.company || "Project"}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {selectedProject.metadata.period}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1">
                  {selectedProject.metadata.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSlug(null)}
                className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:underline"
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production ↗</span>
                </a>
              )}
            </div>

            {/* Metrics */}
            {selectedProject.metadata.metrics && selectedProject.metadata.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                {selectedProject.metadata.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">{m.label}</div>
                    <div className="text-base font-bold font-mono text-[var(--text-primary)]">{m.value}</div>
                    {m.sub && <div className="text-[10px] text-[var(--text-muted)]">{m.sub}</div>}
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
            <div className="pt-6 border-t border-[var(--border)]">
              <button
                onClick={() => setSelectedSlug(null)}
                className="w-full py-2.5 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
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
