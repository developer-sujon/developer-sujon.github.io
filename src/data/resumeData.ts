export interface MetricItem {
  label: string;
  value: string;
  sub?: string;
}

export interface ProjectMetadata {
  title: string;
  slug: string;
  tagline: string;
  company?: string;
  kicker?: string;
  role: string;
  period: string;
  status: string;
  featured: boolean;
  badge?: string;
  stars?: string;
  metrics?: MetricItem[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  content?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  projectsMentioned: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level?: string; highlight?: boolean }[];
}

export interface ResumeData {
  profile: {
    name: string;
    englishName: string;
    title: string;
    journalVolume: string;
    editorialSubtitle: string;
    shortBio: string;
    location: string;
    email: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    status: string;
    statusTicker: string[];
    yearsOfExperience: string;
    coreHighlights: string[];
  };
  metrics: MetricItem[];
  experiences: ExperienceItem[];
  skillCategories: SkillCategory[];
  education: {
    degree: string;
    institution: string;
    period: string;
    details: string;
  }[];
}

export const resumeData: ResumeData = {
  profile: {
    name: "Muhammad Sujon",
    englishName: "Muhammad Sujon",
    title: "Lead Systems Architect & Distributed Cloud Engineer",
    journalVolume: "Vol. IV · Systems Architecture & Edge Computing Chronicle",
    editorialSubtitle: "Specializing in Cloudflare Edge computing, million-row sheet virtualization, sub-second AI RAG pipelines, and high-concurrency monorepos.",
    shortBio: "Architecting high-throughput edge systems and high-scale data engines. Proven track record at Yupsis and Sitgram delivering sub-second AI omnichannel pipelines, 1,000,000+ virtualized spreadsheet cells, and zero-loss IoT command queues.",
    location: "Dhaka, Bangladesh • Open to Global Remote",
    email: "muhammad.sujon.cse@gmail.com",
    github: "https://github.com/developer-sujon",
    githubUsername: "developer-sujon",
    linkedin: "https://linkedin.com/in/muhammad-sujon",
    status: "Available for High-Impact Roles & Systems Consulting",
    statusTicker: [
      "Open to high-impact systems roles",
      "Sub-second edge AI pipelines",
      "1,000,000+ rows sheet virtualization",
      "Replies within 24 hours",
    ],
    yearsOfExperience: "4+ Years",
    coreHighlights: [
      "At Yupsis: Architected Two-Zone Split Architecture for Zotlyx, combining Cloudflare Workers with Supabase PostgreSQL.",
      "At Yupsis: Engineered stateful 5s Durable Object Debounce Session, slashing redundant LLM calls by 68%.",
      "At Sitgram: Virtualized and rendered 1,000,000+ data cells in Elizn inside a single sheet with zero main-thread freezing.",
      "At Yupsis: Built resilient asynchronous pending command queues for Eazlock IoT device installment enforcement.",
    ],
  },
  metrics: [
    {
      label: "Edge AI Delivery",
      value: "< 250ms",
      sub: "Zotlyx Two-Zone Pipeline",
    },
    {
      label: "Sheet Virtualization",
      value: "1M+ Cells",
      sub: "Elizn 60 FPS Scrolling",
    },
    {
      label: "LLM Cost Reduction",
      value: "68%",
      sub: "Via DO Burst Debounce",
    },
    {
      label: "Command Reliability",
      value: "99.99%",
      sub: "Eazlock IoT Consumers",
    },
  ],
  experiences: [
    {
      company: "Yupsis",
      role: "Lead Systems Architect & Full-Stack Engineer",
      location: "Remote / Hybrid",
      period: "2024 – Present",
      type: "Full-Time Core Architect",
      summary: "Leading backend, edge computing, and AI systems architecture across flagship enterprise products: Zotlyx, Eazlock, and Torongo.",
      highlights: [
        "Architected Zotlyx Two-Zone Split Architecture, segregating edge ingestion (Cloudflare Workers, Queues, Vectorize) from transactional PostgreSQL (Supabase/Hyperdrive).",
        "Engineered the DebounceSession Durable Object with 5s inactivity alarms, eliminating message-burst race conditions and cutting LLM token costs by 68%.",
        "Designed and deployed multilingual RAG pipeline using Cloudflare Vectorize and bge-m3 embeddings for sub-35ms semantic context retrieval.",
        "Built Eazlock IoT asynchronous pending command consumers (DevicePendingCommandProcessor), guaranteeing zero dropped commands for offline devices upon reconnection.",
        "Developed Torongo Pay payment gateway abstraction with idempotent request hashing and cryptographic webhook signature validation.",
      ],
      projectsMentioned: ["Zotlyx", "Eazlock", "Torongo Pay"],
      technologies: [
        "Cloudflare Workers",
        "Durable Objects",
        "Cloudflare Queues",
        "Vectorize (RAG)",
        "Next.js 15",
        "Hono",
        "oRPC",
        "Drizzle ORM",
        "Supabase PostgreSQL",
        "Turborepo",
      ],
    },
    {
      company: "Sitgram",
      role: "Senior Frontend & Data Systems Engineer",
      location: "Remote",
      period: "2023 – 2024",
      type: "Core Contributor",
      summary: "Engineered massive-scale data visualization, spreadsheet virtualization, and monorepo tooling across Elizn and Willro.",
      highlights: [
        "Solved the complex million-row spreadsheet bottleneck in Elizn: virtualized 1,000,000+ data cells in a single sheet using Handsontable with 60 FPS scrolling and zero UI thread freeze.",
        "Offloaded formula calculations, CSV exports, and event diff aggregation to Web Workers via zero-copy ArrayBuffer transferables.",
        "Engineered real-time employee activity event pipelines connecting Supabase Edge Functions with PostgreSQL time-series partitioning and PostHog telemetry.",
        "Architected Willro multi-tenant Turborepo monorepo, consolidating customer sites and admin dashboards with shared packages and 4.5x faster builds.",
      ],
      projectsMentioned: ["Elizn", "Willro"],
      technologies: [
        "Next.js 15",
        "Handsontable",
        "Web Workers",
        "Supabase PostgreSQL",
        "Drizzle ORM",
        "Zustand",
        "PostHog",
        "Turborepo",
        "Docker",
      ],
    },
    {
      company: "Independent Systems & Web Engineering",
      role: "Full-Stack Engineer",
      location: "Remote",
      period: "2021 – 2023",
      type: "Contract",
      summary: "Built high-performance web applications, REST APIs, and database schemas for SaaS clients globally.",
      highlights: [
        "Developed full-stack web applications and microservices using React, Node.js, Express, and PostgreSQL.",
        "Optimized client rendering pipelines for 95+ Google Lighthouse scores and sub-second First Contentful Paint.",
      ],
      projectsMentioned: [],
      technologies: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Docker"],
    },
  ],
  skillCategories: [
    {
      title: "Edge & Distributed Systems",
      icon: "Cloud",
      skills: [
        { name: "Cloudflare Workers", highlight: true },
        { name: "Durable Objects", highlight: true },
        { name: "Cloudflare Queues", highlight: true },
        { name: "Cloudflare Vectorize", highlight: true },
        { name: "Hyperdrive (Pooling)", highlight: true },
        { name: "Cloudflare KV & R2" },
        { name: "OpenNext" },
        { name: "Docker" },
      ],
    },
    {
      title: "Big Data & Spreadsheet Engines",
      icon: "Database",
      skills: [
        { name: "Million-Row Sheet Virtualization", highlight: true },
        { name: "Handsontable", highlight: true },
        { name: "Web Workers (Off-Thread Compute)", highlight: true },
        { name: "ArrayBuffer Zero-Copy Sharing", highlight: true },
        { name: "Time-Series Partitioning" },
        { name: "PostgreSQL & Supabase", highlight: true },
        { name: "Drizzle ORM", highlight: true },
      ],
    },
    {
      title: "Backend & API Engineering",
      icon: "Server",
      skills: [
        { name: "TypeScript", highlight: true },
        { name: "Node.js", highlight: true },
        { name: "Hono", highlight: true },
        { name: "oRPC (Type-Safe RPC)", highlight: true },
        { name: "Idempotent Payment APIs" },
        { name: "Cryptographic HMAC Webhooks" },
        { name: "Turborepo & Monorepos", highlight: true },
      ],
    },
    {
      title: "AI & Vector Search (RAG)",
      icon: "Cpu",
      skills: [
        { name: "RAG Architecture", highlight: true },
        { name: "Cloudflare Vectorize", highlight: true },
        { name: "BGE-M3 Multilingual Embeddings", highlight: true },
        { name: "Claude 3.5 Sonnet & OpenAI" },
        { name: "Prompt Synthesis & Guardrails" },
      ],
    },
    {
      title: "Frontend & UI Design",
      icon: "Layout",
      skills: [
        { name: "Next.js 15 (App Router)", highlight: true },
        { name: "React 19", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "Zustand State Isolation" },
        { name: "Radix UI & Shadcn" },
        { name: "Print & Editorial Typography", highlight: true },
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)",
      institution: "Dhaka International University (DIU)",
      period: "Graduated",
      details: "Focus on Distributed Systems, Algorithms, Database Management Systems, and Software Architecture.",
    },
  ],
};
