"use client";

import { useState } from "react";
import { Server, ShieldCheck, Clock, Brain, Database, Send, Radio, ArrowRight, Info, Layers, CheckCircle } from "lucide-react";

interface PipelineStep {
  id: string;
  number: number;
  title: string;
  zone: "Edge Ingestion" | "Edge Processing & AI" | "Transactional Database";
  component: string;
  role: string;
  problemSolved: string;
  latencyImpact: string;
  techStack: string;
  icon: any;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: "webhook",
    number: 1,
    title: "Inbound Webhook & Cryptographic Verification",
    zone: "Edge Ingestion",
    component: "workers/receiver",
    role: "Validates incoming webhook signatures (Facebook HMAC-SHA256, Telegram bot token, Widget CORS) and maps channel IDs to merchants via KV.",
    problemSolved: "Blocks spoofed payloads and unauthorized traffic at Cloudflare edge before reaching origin servers.",
    latencyImpact: "< 15ms global edge verification",
    techStack: "Cloudflare Workers, Web Crypto API, Cloudflare KV",
    icon: ShieldCheck,
  },
  {
    id: "queue-inbound",
    number: 2,
    title: "Asynchronous Queue Enqueueing",
    zone: "Edge Ingestion",
    component: "zotlyx-inbound-messages (Queue)",
    role: "Receives normalized payload from receiver worker and immediately responds HTTP 200 to Meta / Telegram.",
    problemSolved: "Prevents webhook timeouts and duplicate retries from Meta when traffic surges.",
    latencyImpact: "Instant HTTP 200 ACK (< 45ms)",
    techStack: "Cloudflare Queues",
    icon: Radio,
  },
  {
    id: "debouncer",
    number: 3,
    title: "Durable Object Burst Debouncer (5s Window)",
    zone: "Edge Processing & AI",
    component: "workers/debouncer (DebounceSession)",
    role: "Stateful Cloudflare Durable Object that accumulates rapid-fire user messages within a 5-second inactivity window. Uploads attachments to R2.",
    problemSolved: "Eliminates multiple separate LLM calls when users send broken sentence fragments. Combines them into a single coherent prompt.",
    latencyImpact: "68% LLM token cost reduction, 0 race conditions",
    techStack: "Cloudflare Durable Objects, Alarm API, Cloudflare R2",
    icon: Clock,
  },
  {
    id: "rag",
    number: 4,
    title: "Multilingual Vector Search (RAG)",
    zone: "Edge Processing & AI",
    component: "workers/rag & Vectorize",
    role: "Converts customer prompt into embeddings using bge-m3 and queries Cloudflare Vectorize (knowledge-index-m3) for merchant product inventory and store policies.",
    problemSolved: "Enables sub-second contextual retrieval for mixed Bengali/Banglish/English commerce questions.",
    latencyImpact: "< 35ms vector search at the edge",
    techStack: "Cloudflare Vectorize, bge-m3, Workers AI",
    icon: Brain,
  },
  {
    id: "llm",
    number: 5,
    title: "AI Response Synthesis & Guardrails",
    zone: "Edge Processing & AI",
    component: "apps/processor-api (Hono)",
    role: "Synthesizes merchant instructions, vector matches, and chat history into Claude 3.5 Sonnet / OpenAI to produce precise answers and order links.",
    problemSolved: "Accurate product recommendations, stock availability, and human-like customer assistance.",
    latencyImpact: "Sub-second streaming completion",
    techStack: "Hono, Claude 3.5 Sonnet, Clean Architecture",
    icon: Server,
  },
  {
    id: "db",
    number: 6,
    title: "Hyperdrive Pooled PostgreSQL Ledger",
    zone: "Transactional Database",
    component: "workers/db & Supabase",
    role: "Executes pooled SQL writes through Cloudflare Hyperdrive to update conversation threads, order states, and trigger Supabase Realtime for human inbox UI.",
    problemSolved: "Prevents PostgreSQL connection pool exhaustion from hundreds of distributed edge workers.",
    latencyImpact: "Pooled connection reused (< 5ms)",
    techStack: "Supabase PostgreSQL, Drizzle ORM, Hyperdrive",
    icon: Database,
  },
  {
    id: "sender",
    number: 7,
    title: "Outbound Dispatch & Real-Time SSE Relay",
    zone: "Edge Ingestion",
    component: "workers/sender",
    role: "Dispatches the finalized response to Meta Graph API, WhatsApp Cloud API, Telegram, and updates live website widget users via SSE WidgetRelay Durable Object.",
    problemSolved: "Zero-lag outbound delivery with accurate seen and typing indicator indicators.",
    latencyImpact: "< 120ms platform delivery",
    techStack: "Cloudflare Workers, Durable Objects, SSE",
    icon: Send,
  },
];

export function InteractiveArchitecture() {
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(pipelineSteps[2]); // Default to Debouncer (the most unique innovation)

  return (
    <section id="architecture" className="py-12 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Systems Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Zotlyx Two-Zone Split Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Click on each step below to inspect how high-frequency webhook bursts are ingested at the edge, debounced using stateful Durable Objects, and served with sub-second RAG AI responses.
          </p>
        </div>

        {/* Step Selector Pipeline Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            const isSelected = selectedStep.id === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 cursor-pointer ${
                  isSelected
                    ? "bg-sky-500/10 border-sky-500/50 shadow-sm shadow-sky-500/10"
                    : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-400 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-sky-500 text-slate-950" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}>
                    0{step.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? "text-sky-400" : "text-slate-400"}`} />
                </div>
                <div>
                  <div className={`text-[11px] font-semibold line-clamp-2 ${
                    isSelected ? "text-sky-600 dark:text-sky-300" : "text-slate-800 dark:text-slate-200"
                  }`}>
                    {step.title.split(" ")[0]} {step.title.split(" ")[1]}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {step.component.split(" ")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/90 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  Step 0{selectedStep.number} of 07
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Zone: <strong className="text-slate-700 dark:text-slate-200">{selectedStep.zone}</strong>
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {selectedStep.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg shrink-0">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{selectedStep.latencyImpact}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            {/* Component & Role */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Monorepo Module
              </span>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 font-mono text-xs text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-slate-800">
                {selectedStep.component}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {selectedStep.role}
              </p>
            </div>

            {/* Problem Solved */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Engineering Challenge Solved
              </span>
              <div className="p-3 rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-amber-200/90 leading-relaxed">
                {selectedStep.problemSolved}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Technologies & APIs
              </span>
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedStep.techStack}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
