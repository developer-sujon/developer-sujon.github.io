"use client";

import { useState } from "react";
import { ExternalLink, ArrowRight, Code } from "lucide-react";
import { GithubIcon } from "./icons";
import { ProjectMetadata } from "@/data/resumeData";
import { CaseStudyModal } from "./CaseStudyModal";

interface ProjectsSectionProps {
  projects: {
    metadata: ProjectMetadata;
    htmlContent: string;
  }[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<{
    metadata: ProjectMetadata;
    htmlContent: string;
  } | null>(null);

  const [activeTag, setActiveTag] = useState<string>("All");

  // Collect all unique tags
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.metadata.tags)))].slice(0, 8);

  const filteredProjects = activeTag === "All"
    ? projects
    : projects.filter((p) => p.metadata.tags.includes(activeTag));

  return (
    <section id="projects" className="py-12 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 mb-2">
              <Code className="w-3.5 h-3.5" />
              <span>Production Systems & Monorepos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured Engineering Projects
            </h2>
          </div>

          {/* Tag Filter Pills */}
          <div className="no-print flex flex-wrap gap-1.5">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeTag === tag
                    ? "bg-sky-500 text-slate-950 font-bold"
                    : "bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
          {filteredProjects.map(({ metadata, htmlContent }) => {
            const isFeatured = metadata.featured;

            return (
              <div
                key={metadata.slug}
                className={`p-5 sm:p-7 rounded-2xl transition-all relative overflow-hidden group ${
                  isFeatured
                    ? "bg-white dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-950/90 border-2 border-sky-500/30 dark:border-sky-500/40 shadow-xl shadow-sky-500/5"
                    : "bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {metadata.badge && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">
                          {metadata.badge}
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {metadata.role} • {metadata.period}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-sky-400 transition-colors">
                      {metadata.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="no-print flex items-center gap-2 shrink-0">
                    {metadata.githubUrl && (
                      <a
                        href={metadata.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {metadata.liveUrl && (
                      <a
                        href={metadata.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        title="Live Site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject({ metadata, htmlContent })}
                      className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition-all flex items-center gap-1.5 active:scale-95 shadow-sm cursor-pointer"
                    >
                      <span>Deep Dive Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tagline / Overview */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed max-w-3xl">
                  {metadata.tagline}
                </p>

                {/* Metrics Callout */}
                {metadata.metrics && metadata.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 mb-5">
                    {metadata.metrics.map((m, idx) => (
                      <div key={idx}>
                        <div className="text-[10px] font-mono uppercase text-slate-400">{m.label}</div>
                        <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-sky-400">{m.value}</div>
                        {m.sub && <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.sub}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Case Study Modal */}
        <CaseStudyModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={selectedProject?.metadata || null}
          htmlContent={selectedProject?.htmlContent || ""}
        />
      </div>
    </section>
  );
}
