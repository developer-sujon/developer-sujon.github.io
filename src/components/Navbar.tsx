"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Printer, Terminal } from "lucide-react";
import { GithubIcon } from "./icons";

export function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Default to dark mode
    const root = document.documentElement;
    root.classList.add("dark");

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
      scrolled ? "glass-nav py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="font-mono font-semibold text-sm tracking-tight text-slate-900 dark:text-slate-100">
            sujon<span className="text-sky-400">.sys</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
          <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
          <a href="#experience" className="hover:text-sky-400 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
          <a href="#architecture" className="hover:text-sky-400 transition-colors">Architecture</a>
          <a href="#skills" className="hover:text-sky-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Print / Download PDF Resume button */}
          <button
            onClick={handlePrint}
            title="Print or Save Resume as PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com/developer-sujon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
