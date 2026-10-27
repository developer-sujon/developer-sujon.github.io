import { Zap, DollarSign, Layers, CheckCircle2 } from "lucide-react";
import { resumeData } from "@/data/resumeData";

export function MetricsBento() {
  const icons = [Zap, DollarSign, Layers, CheckCircle2];
  const iconColors = [
    "text-amber-400 bg-amber-400/10 border-amber-400/20",
    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    "text-sky-400 bg-sky-400/10 border-sky-400/20",
    "text-purple-400 bg-purple-400/10 border-purple-400/20",
  ];

  return (
    <section className="py-8 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {resumeData.metrics.map((metric, idx) => {
            const Icon = icons[idx % icons.length];
            const colorClass = iconColors[idx % iconColors.length];

            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-xs flex flex-col justify-between group hover:border-sky-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                    {metric.label}
                  </span>
                  <div className={`p-1.5 rounded-lg border ${colorClass}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
                    {metric.value}
                  </div>
                  {metric.sub && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {metric.sub}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
