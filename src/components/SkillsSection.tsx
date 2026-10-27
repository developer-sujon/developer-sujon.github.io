import { Cpu, Cloud, Server, Database, Layout, GraduationCap, CheckCircle2 } from "lucide-react";
import { resumeData, SkillCategory } from "@/data/resumeData";

export function SkillsSection() {
  const { skillCategories, education } = resumeData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cloud":
        return Cloud;
      case "Server":
        return Server;
      case "Cpu":
        return Cpu;
      case "Database":
        return Database;
      default:
        return Layout;
    }
  };

  return (
    <section id="skills" className="py-12 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Skills & Core Competencies
          </h2>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, idx) => {
            const Icon = getIcon(cat.icon);

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                          skill.highlight
                            ? "bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/30 font-semibold"
                            : "bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        }`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education Section */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 font-mono">
              Academic Background
            </h3>
          </div>

          <div className="space-y-4">
            {education.map((edu, eIdx) => (
              <div key={eIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h4>
                  <div className="text-xs font-mono text-sky-600 dark:text-sky-400">
                    {edu.institution}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                    {edu.details}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
