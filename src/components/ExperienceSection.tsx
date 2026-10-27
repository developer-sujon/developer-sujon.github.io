import { Briefcase, Calendar, MapPin } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export function ExperienceSection() {
  const { experiences } = resumeData;

  return (
    <section id="experience" className="py-12 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Work History & Engineering Roles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Professional Experience
          </h2>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start gap-4 sm:gap-6 pl-1 sm:pl-2 group">
              {/* Timeline Marker Dot */}
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 flex items-center justify-center shrink-0 z-10 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
              </div>

              {/* Card Content */}
              <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 group-hover:border-sky-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-sky-600 dark:text-sky-400 font-mono">
                      {exp.company} <span className="text-slate-400 font-normal">({exp.type})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0 mt-1 sm:mt-0">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-1 shrink-0">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
