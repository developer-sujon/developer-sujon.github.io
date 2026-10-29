"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProjectMetadata } from "@/data/resumeData";
import { GithubIcon } from "./icons";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Share2, 
  Check, 
  Sun, 
  Moon, 
  Layers
} from "lucide-react";

interface ProjectDetailViewProps {
  project: {
    metadata: ProjectMetadata;
    htmlContent: string;
  };
  prevProject?: { slug: string; title: string } | null;
  nextProject?: { slug: string; title: string } | null;
}

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const { metadata, htmlContent } = project;
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Sync dark mode state
  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(isDarkClass);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareTitle = `${metadata.title} — Muhammad Sujon`;
    const shareText = metadata.tagline;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--bg-primary)]/90 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Back to Portfolio Link */}
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          {/* Breadcrumb Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-xs">
            <span>{metadata.company || "Project"}</span>
            <span>/</span>
            <span className="text-zinc-800 dark:text-zinc-200 truncate font-medium">
              {metadata.title.split("—")[0].trim()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Share / Copy Link Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
              title="Share this project link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {/* GitHub Repo Button */}
            {metadata.githubUrl && (
              <a
                href={metadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="View Source on GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Live Website Button */}
            {metadata.liveUrl && (
              <a
                href={metadata.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <span>{metadata.company === "Open Source" ? "Live Demo" : "Live Production"}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Case Study Article Container */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-14 space-y-10">
        
        {/* Project Header Info */}
        <div className="space-y-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            {metadata.company && (
              <span className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-medium text-zinc-700 dark:text-zinc-300">
                {metadata.company}
              </span>
            )}
            {metadata.role && (
              <span className="text-zinc-500 dark:text-zinc-400">
                {metadata.role}
              </span>
            )}
            {metadata.period && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <span className="text-zinc-400 dark:text-zinc-500">
                  {metadata.period}
                </span>
              </>
            )}
            {metadata.status && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {metadata.status}
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            {metadata.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {metadata.tagline}
          </p>

          {/* Tags / Tech Badges */}
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {metadata.tags.map((tag) => (
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

        {/* Impact Metrics Cards (if present) */}
        {metadata.metrics && metadata.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
            {metadata.metrics.map((m, i) => (
              <div key={i} className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {m.label}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
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
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Previous & Next Project Navigation Cards */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all flex flex-col justify-between"
              >
                <div className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                  <span>Previous Project</span>
                </div>
                <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white mt-1">
                  {prevProject.title.split("—")[0].trim()}
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-all flex flex-col justify-between text-right sm:text-right"
              >
                <div className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 flex items-center justify-end gap-1">
                  <span>Next Project</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white mt-1">
                  {nextProject.title.split("—")[0].trim()}
                </div>
              </Link>
            ) : <div />}
          </div>

          {/* Return & Back to Top */}
          <div className="pt-6 flex items-center justify-between gap-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              ↑ Back to top
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
