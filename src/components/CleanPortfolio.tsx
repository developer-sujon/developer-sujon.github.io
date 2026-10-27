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
  ArrowUpRight,
  Layers,
  Sparkles,
  Zap,
  Clock,
  Database
} from "lucide-react";

interface CleanPortfolioProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

export function CleanPortfolio({ projects }: CleanPortfolioProps) {
  const [isDark, setIsDark] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

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

  const selectedProject = selectedSlug
    ? projects.find((p) => p.metadata.slug === selectedSlug)
    : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-12 sm:py-20 space-y-14">
        
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
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for high-impact roles" />
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

            <a
              href={`tel:${profile.phone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{profile.phone}</span>
            </a>

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

        {/* 2. KEY METRICS ROW (Clean Minimal Stats) */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-[var(--border)] text-center sm:text-left">
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

        {/* 3. SELECTED SYSTEMS & PROJECTS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-1.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Selected Systems &amp; Case Studies
            </h2>
            <span className="text-[11px] text-[var(--text-muted)] font-mono">Click to inspect</span>
          </div>

          <div className="space-y-3">
            {projects.map(({ metadata }) => (
              <div
                key={metadata.slug}
                onClick={() => setSelectedSlug(metadata.slug)}
                className="group p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-zinc-500/50 dark:hover:border-zinc-400/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
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
                  <span>Deep dive</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WORK EXPERIENCE SECTION */}
        <section className="space-y-5">
          <div className="pb-1.5 border-b border-[var(--border)]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Work Experience
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
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {exp.summary}
                </p>

                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pl-4 list-disc leading-relaxed">
                  {exp.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNICAL CAPABILITIES */}
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

        {/* 6. EDUCATION & FOOTER */}
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

      {/* 7. SLIDE-OVER CASE STUDY DRAWER */}
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
