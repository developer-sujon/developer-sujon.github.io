"use client";

import { useState } from "react";
import { Mail, MapPin, Check, Copy, FileText, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { resumeData } from "@/data/resumeData";

export function ResumeHeader() {
  const [copied, setCopied] = useState(false);
  const { profile } = resumeData;

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="pt-24 pb-8 sm:pt-28 sm:pb-12 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{profile.status}</span>
        </div>

        {/* Header Main Block */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:white">
              {profile.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-sky-600 dark:text-sky-400 font-mono">
              {profile.title}
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {profile.shortBio}
            </p>
          </div>

          {/* Quick CTA Actions (no-print) */}
          <div className="no-print flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 pt-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs tracking-wide transition-all shadow-lg shadow-sky-500/20 active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Print / Download Resume</span>
            </button>
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition-all active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </div>

        {/* Contact & Social Links Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>{profile.location}</span>
          </div>

          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors group cursor-pointer"
            title="Click to copy email address"
          >
            <Mail className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
            <span className="font-mono">{profile.email}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors group"
          >
            <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
            <span className="font-mono">github.com/{profile.githubUsername}</span>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors group"
          >
            <LinkedinIcon className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Core Architectural Highlights */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Architectural Focus & Philosophy</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
            {profile.coreHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
