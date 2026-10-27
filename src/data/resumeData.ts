export interface MetricItem {
  label: string;
  value: string;
  sub?: string;
}

export interface ProjectMetadata {
  title: string;
  slug: string;
  tagline: string;
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
  highlights: string[];
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
    shortBio: string;
    location: string;
    email: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    status: string;
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
    title: "Lead Systems Architect & Full-Stack Cloud Engineer",
    shortBio: "Specializing in Cloudflare Edge computing (Workers, Durable Objects, Queues, Vectorize), sub-second AI RAG pipelines, distributed high-concurrency systems, and scalable TypeScript monorepos.",
    location: "Dhaka, Bangladesh • Open to Global Remote",
    email: "muhammad.sujon.cse@gmail.com",
    github: "https://github.com/developer-sujon",
    githubUsername: "developer-sujon",
    linkedin: "https://linkedin.com/in/muhammad-sujon",
    status: "Available for High-Impact Roles & Systems Consulting",
    yearsOfExperience: "4+ Years",
    coreHighlights: [
      "Architected Two-Zone Split Architecture for Zotlyx handling sub-second omnichannel AI messaging.",
      "Engineered stateful Cloudflare Durable Objects to debounce user bursts, slashing LLM token costs by 68%.",
      "Designed high-concurrency background cron & command queues for IoT device management in Eazlock.",
      "Built resilient type-safe APIs using oRPC, Hono, Next.js 15, Drizzle ORM, and Supabase PostgreSQL.",
    ],
  },
  metrics: [
    {
      label: "Edge Response Latency",
      value: "< 50ms",
      sub: "Global Cloudflare POPs",
    },
    {
      label: "LLM Cost Optimization",
      value: "68%",
      sub: "Via DO Burst Debounce",
    },
    {
      label: "Production Monorepos",
      value: "5+ Built",
      sub: "Turborepo & OpenNext",
    },
    {
      label: "Data Ingestion Pipeline",
      value: "99.99%",
      sub: "Zero Command Loss",
    },
  ],
  experiences: [
    {
      company: "Zotlyx",
      role: "Lead Systems Architect & Full-Stack Engineer",
      location: "Remote",
      period: "2024 – Present",
      type: "Full-Time / Core Architect",
      highlights: [
        "Architected and deployed the Two-Zone split architecture, decoupling edge webhook ingestion (Cloudflare Workers, Queues) from transactional database systems (PostgreSQL/Supabase).",
        "Invented an edge-native DebounceSession using Cloudflare Durable Objects with a 5-second inactivity alarm, aggregating user burst messages and eliminating 68% redundant LLM invocations.",
        "Engineered multilingual semantic vector search on Cloudflare Vectorize with `bge-m3` embeddings, achieving sub-35ms semantic context retrieval for commerce queries.",
        "Developed custom wildcard RBAC engine (`@workspace/access`) with end-to-end type safety between Next.js 15 dashboard and edge workers via oRPC.",
        "Implemented real-time bi-directional customer widget SSE relay backed by Durable Objects and Hyperdrive connection pooling.",
      ],
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
      company: "Eazlock",
      role: "Full-Stack & Background Processing Engineer",
      location: "Remote / Hybrid",
      period: "2024 – Present",
      type: "Core Developer",
      highlights: [
        "Designed asynchronous device pending command consumers (`DevicePendingCommandProcessor`), solving offline hardware disconnects with guaranteed delivery upon reconnection.",
        "Engineered scheduled cron workers calculating overdue interest, grace period alerts, and automated hardware restriction lock protocols.",
        "Built responsive merchant administrative portals with Next.js App Router, Tailwind CSS, and localized payment integrations (SSLCommerz, bKash).",
      ],
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Cron Scheduler",
        "Command Queues",
        "Tailwind CSS",
        "PostgreSQL",
        "Turborepo",
      ],
    },
    {
      company: "Torongo Pay",
      role: "Backend & Systems Engineer",
      location: "Dhaka, Bangladesh",
      period: "2023 – 2024",
      type: "Contract / Core Contributor",
      highlights: [
        "Architected an idempotent payment gateway abstraction service handling multi-provider routing and cryptographic HMAC signature validation.",
        "Implemented transactional reconciliation workflows and dead-letter queue auditing for failed merchant webhooks.",
        "Optimized PostgreSQL queries using Drizzle ORM and connection pooling for sub-10ms transaction ledgering.",
      ],
      technologies: [
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Drizzle ORM",
        "Turborepo",
        "Webhooks",
      ],
    },
    {
      company: "Independent Full-Stack Engineering",
      role: "Systems & Web Developer",
      location: "Remote",
      period: "2021 – 2023",
      type: "Freelance",
      highlights: [
        "Developed full-stack web platforms, REST APIs, and database architectures for SaaS clients worldwide.",
        "Authored reusable UI component libraries and optimized frontend loading performance for 95+ Google Lighthouse scores.",
      ],
      technologies: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Docker", "Tailwind CSS"],
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
        { name: "Hyperdrive (Connection Pooling)", highlight: true },
        { name: "Cloudflare KV & R2" },
        { name: "OpenNext (Cloudflare)" },
        { name: "Docker" },
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
        { name: "REST & Webhook Handlers" },
        { name: "Server-Sent Events (SSE)" },
        { name: "Microservices & Clean Architecture" },
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
        { name: "CLIP Visual Embeddings" },
        { name: "Prompt Synthesis & Guardrails" },
      ],
    },
    {
      title: "Databases & Storage",
      icon: "Database",
      skills: [
        { name: "PostgreSQL", highlight: true },
        { name: "Supabase", highlight: true },
        { name: "Drizzle ORM", highlight: true },
        { name: "Cloudflare D1 (SQLite)" },
        { name: "Redis & Upstash" },
        { name: "Database Migrations & Seeding" },
      ],
    },
    {
      title: "Frontend & UI Design",
      icon: "Layout",
      skills: [
        { name: "Next.js 15 (App Router)", highlight: true },
        { name: "React 19", highlight: true },
        { name: "Tailwind CSS 4", highlight: true },
        { name: "Lucide Icons" },
        { name: "Responsive UI & Dark/Light Mode" },
        { name: "Print & PDF Ready CSS" },
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
