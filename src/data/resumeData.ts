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
    phone: string;
    email: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    website: string;
    avatarUrl: string;
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
    shortBio: "Architecting high-throughput edge systems and high-scale data engines. Proven engineering track record across Yupsis, Sitgram, and ShunnoIT delivering sub-second AI omnichannel pipelines, 1,000,000+ virtualized spreadsheet cells, and zero-loss IoT command queues.",
    location: "Rajshahi, Bangladesh",
    phone: "+8801772703036",
    email: "muhammad.sujon.cse@gmail.com",
    github: "https://github.com/developer-sujon",
    githubUsername: "developer-sujon",
    linkedin: "https://www.linkedin.com/in/muhammadsujon",
    website: "https://devsujon.com",
    avatarUrl: "/sujon-avatar.png",
    status: "Available for High-Impact Roles & Systems Consulting",
    statusTicker: [
      "Open to high-impact systems roles",
      "Sub-second edge AI pipelines",
      "1,000,000+ rows sheet virtualization",
      "Replies within 24 hours",
    ],
    yearsOfExperience: "5+ Years",
    coreHighlights: [
      "At Yupsis: Architected Two-Zone Split Architecture for Zotlyx, combining Cloudflare Workers with Supabase PostgreSQL.",
      "At Yupsis: Engineered stateful 5s Durable Object Debounce Session, slashing redundant LLM calls by 68%.",
      "At Sitgram: Virtualized and rendered 1,000,000+ data cells in Elizn inside a single sheet with zero main-thread freezing.",
      "At Yupsis: Built resilient asynchronous pending command queues for Eazlock IoT device installment enforcement.",
      "At ShunnoIT: Shipped NetFee ISP Billing SaaS and Hisabnikash Inventory Systems with Nest.js, Redis, and RabbitMQ.",
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
      company: "ShunnoIT",
      role: "Software Engineer",
      location: "Hybrid · Rajshahi, Bangladesh",
      period: "Nov 2022 – 2023",
      type: "Full-Time",
      summary: "Engineered enterprise billing platforms, inventory management microservices, and automated payment gateways.",
      highlights: [
        "Architected and deployed NetFee ISP Billing SaaS, automating customer online payments, automatic bandwidth on/off triggers, and reseller accounting.",
        "Developed Hisabnikash inventory management system supporting multi-store stock tracking, customer installments, and automated SMS notifications using Nest.js & React.",
        "Built Shunno Pay, a webhook-based payment gateway facilitating automated merchant settlements via Express.js, PostgreSQL, and Prisma.",
        "Implemented RabbitMQ and Redis microservice message brokers, real-time Socket.io notifications, and AWS/GCP DevOps workflows.",
      ],
      projectsMentioned: ["Hisabnikash", "NetFee", "Shunno Pay", "Shunno Storage"],
      technologies: ["Nest.js", "Express.js", "React", "Node.js", "MongoDB", "PostgreSQL", "RabbitMQ", "Redis", "Docker", "Socket.io"],
    },
    {
      company: "WorldSoftZone",
      role: "Frontend Developer",
      location: "Hybrid · Meherpur, Bangladesh",
      period: "Dec 2020 – Aug 2022",
      type: "Full-Time",
      summary: "Developed modern web applications, e-commerce storefronts, and client management systems.",
      highlights: [
        "Created and tested scalable web applications using JavaScript, Tailwind CSS, Bootstrap, and AJAX.",
        "Troubleshot frontend rendering bottlenecks and collaborated with UI designers to implement responsive specifications.",
      ],
      projectsMentioned: ["WorldSoftZone Portal", "Aristo Computer Inventory"],
      technologies: ["JavaScript", "React", "Tailwind CSS", "Bootstrap", "AJAX", "WordPress"],
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
        { name: "RabbitMQ & Redis", highlight: true },
        { name: "Docker & VPS DevOps", highlight: true },
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
        { name: "PostgreSQL & Supabase", highlight: true },
        { name: "Drizzle ORM & Prisma", highlight: true },
        { name: "MongoDB", highlight: true },
      ],
    },
    {
      title: "Backend & API Engineering",
      icon: "Server",
      skills: [
        { name: "TypeScript & JavaScript", highlight: true },
        { name: "Node.js & Nest.js", highlight: true },
        { name: "Hono & Express.js", highlight: true },
        { name: "oRPC (Type-Safe RPC)", highlight: true },
        { name: "Socket.io Real-Time", highlight: true },
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
        { name: "React 19 & Redux", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "Zustand State Isolation" },
        { name: "Radix UI & Shadcn" },
        { name: "Print & Editorial Typography", highlight: true },
      ],
    },
  ],
  education: [
    {
      degree: "Diploma in Computer Science & Engineering (Diploma in CSE)",
      institution: "Meherpur College of Engineering and Technology",
      period: "Technical Education",
      details: "Comprehensive coursework in Data Structures, Algorithms, Microservices, and Computer Networks.",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Amjhupi Secondary School",
      period: "Passing Year: 2018",
      details: "GPA: 3.87",
    },
  ],
};
