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
  badge?: string;
  description?: string;
  shippedProjects?: string[];
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
    title: "Lead Software Engineer & Systems Architect",
    journalVolume: "Vol. IV · Systems Architecture & Distributed Systems Chronicle",
    editorialSubtitle: "Specializing in distributed systems, Turborepo monorepos, type-safe oRPC APIs, million-row sheet virtualization, and microservice architectures.",
    shortBio: "Lead Software Engineer specializing in distributed systems, type-safe API contracts (oRPC), monorepos (Turborepo), and scalable microservices. Proven engineering track record across Sitgram, Yupsis, and Shunno IT delivering production SaaS platforms, million-cell sheet engines, and edge computing architectures.",
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
      "At Sitgram: Architected Willro multi-tenant Turborepo monorepo and virtualized 1,000,000+ spreadsheet cells in Elizn.",
      "At Yupsis: Architected Two-Zone Split Architecture for Zotlyx, combining Cloudflare Workers with Supabase PostgreSQL.",
      "At Yupsis: Built Torongo Cloud MikroTik Hotspot Billing Platform using oRPC edge workers and Supabase Hyperdrive.",
      "At Shunno IT: Lead Full-Stack Architect for Hisabnikash multi-store inventory SaaS and NetFee ISP billing engine.",
      "At Shunno IT: Built internal enterprise platforms: SupportTicket SLA engine, Shunno Pay, and Shunno Storage.",
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
      company: "Sitgram",
      role: "Lead Software Engineer",
      location: "Rajshahi, Bangladesh · On-site",
      period: "Dec 2024 – Present · 1 yr 11 mos",
      type: "Full-time",
      summary: "Leading engineering teams, owning architecture decisions across multiple enterprise platforms, establishing monorepos with Turborepo, introducing oRPC type safety, and managing Linux VPS infrastructure.",
      highlights: [
        "Led a team of developers — task delegation, code reviews, and technical mentorship to maintain delivery standards",
        "Owned architecture decisions across multiple projects — service boundaries, database design, API structure, and scalability planning",
        "Established Monorepo structure with Turborepo — unified tooling and shared packages across all team projects",
        "Introduced oRPC for end-to-end type-safe API contracts — reducing bugs across client-server boundaries",
        "Designed Microservices with RabbitMQ and Redis — async messaging and distributed caching at scale",
        "Set up and maintained CI/CD pipelines on AWS and GCP — automated deployments and zero-downtime releases",
        "Managed Linux VPS infrastructure — Nginx, SSL, PM2, and server security",
      ],
      projectsMentioned: ["Willro", "Elizn"],
      technologies: [
        "Software Infrastructure",
        "System Design",
        "Turborepo",
        "oRPC",
        "Microservices",
        "RabbitMQ",
        "Redis",
        "AWS",
        "GCP",
        "CI/CD",
        "Linux VPS",
        "Nginx",
        "PM2",
        "Next.js",
        "TypeScript",
      ],
    },
    {
      company: "Yupsis",
      role: "Software Engineer",
      location: "Rajshahi, Bangladesh · Hybrid",
      period: "Sep 2024 – Dec 2025 · 1 yr 4 mos",
      type: "Part-time",
      summary: "Architected full-stack applications end-to-end, built Turborepo monorepos, implemented type-safe oRPC layers, and deployed asynchronous messaging pipelines.",
      highlights: [
        "Architected full-stack applications end-to-end — system design, database schema, and deployment",
        "Built Monorepo structure with Turborepo — unified tooling across multiple apps and shared packages",
        "Implemented type-safe API layers with oRPC — end-to-end TypeScript contracts between client and server",
        "Set up Microservices with RabbitMQ for async messaging and Redis for caching and session management",
        "Built real-time features with SocketIO — live notifications and event-driven UI updates",
        "Configured CI/CD pipelines on AWS and GCP with GitHub Actions — automated builds and zero-downtime deploys",
        "Managed Linux VPS environments — Nginx, SSL, PM2, and server hardening",
      ],
      projectsMentioned: ["Zotlyx", "Torongo", "Eazlock"],
      technologies: [
        "Software Infrastructure",
        "Turborepo",
        "oRPC",
        "Microservices",
        "RabbitMQ",
        "Redis",
        "SocketIO",
        "Cloudflare Workers",
        "Durable Objects",
        "PostgreSQL",
        "Supabase",
        "GitHub Actions",
        "Linux VPS",
      ],
    },
    {
      company: "Shunno IT",
      role: "Junior Software Engineer",
      location: "Rajshahi, Bangladesh · On-site",
      period: "Dec 2022 – Jun 2025 · 2 yrs 7 mos",
      type: "Full-time",
      summary: "Full-stack architecture and engineering across production commercial SaaS applications and internal platforms, including Hisabnikash, NetFee, SupportTicket, Shunno Pay, and Shunno Storage.",
      highlights: [
        "Designed and maintained full-stack applications using React, NodeJS, ExpressJS, NestJS, and MongoDB — covering both frontend UI and backend API layers",
        "Built a real-time notification system using SocketIO that auto-updated users without page refresh, reducing manual refresh dependency entirely",
        "Architected and implemented Microservices using RabbitMQ for message queuing and Redis for caching, improving system scalability and response time",
        "Configured and managed DevOps pipelines on AWS and GCP with GitHub Actions — handling deployments, environment management, and CI/CD workflows",
        "Provisioned and maintained multiple Linux VPS environments, including server setup, security hardening, and uptime monitoring",
        "Diagnosed and resolved critical bugs across frontend and backend layers, ensuring stable production performance",
      ],
      projectsMentioned: ["Hisabnikash", "NetFee", "SupportTicket", "Shunno Pay", "Shunno Storage"],
      technologies: [
        "Node.js",
        "Redux.js",
        "NestJS",
        "ExpressJS",
        "React",
        "MongoDB",
        "PostgreSQL",
        "Prisma",
        "RabbitMQ",
        "Redis",
        "SocketIO",
        "GitHub Actions",
        "AWS",
        "GCP",
        "Linux VPS",
      ],
    },
    {
      company: "WorldSoftZone",
      role: "Frontend Web Developer",
      location: "Meherpur District, Khulna, Bangladesh · On-site",
      period: "Jan 2020 – Aug 2022 · 2 yrs 8 mos",
      type: "Full-time",
      summary: "Converted Figma designs to pixel-perfect responsive layouts and built customized e-commerce storefronts with WooCommerce and WordPress.",
      highlights: [
        "Converted Figma designs to pixel-perfect, responsive HTML/CSS layouts — matching design specs across all screen sizes",
        "Built and customized WordPress sites — themes, plugins, and WooCommerce setups for e-commerce clients",
        "Developed e-commerce storefronts with clean UI, product pages, cart flows, and checkout optimization",
        "Translated client briefs and wireframes into fully functional web pages with attention to spacing, typography, and visual consistency",
        "Collaborated directly with designers to ensure Figma-to-browser accuracy on every project",
      ],
      projectsMentioned: [],
      technologies: [
        "WordPress",
        "Theme Development",
        "WooCommerce",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Figma",
        "Bootstrap",
        "AJAX",
      ],
    },
  ],
  skillCategories: [
    {
      title: "Edge & Distributed Systems",
      icon: "Cloud",
      badge: "< 250ms Edge Delivery",
      description: "Low-latency serverless runtimes, stateful Durable Objects coordination, asynchronous queue workers, and connection pooling.",
      shippedProjects: ["Zotlyx", "Torongo", "Willro"],
      skills: [
        { name: "Cloudflare Workers", highlight: true },
        { name: "Durable Objects", highlight: true },
        { name: "Cloudflare Queues", highlight: true },
        { name: "Cloudflare Vectorize", highlight: true },
        { name: "Hyperdrive (Pooling)", highlight: true },
        { name: "Cloudflare KV & R2" },
        { name: "RabbitMQ & Redis", highlight: true },
        { name: "Docker & Linux VPS", highlight: true },
        { name: "Nginx Reverse Proxy" },
      ],
    },
    {
      title: "High-Performance Engines & Big Data",
      icon: "Database",
      badge: "1M+ Cells · 60 FPS",
      description: "Million-row dataset virtualization, off-thread compute workers, zero-copy buffer sharing, and relational database scaling.",
      shippedProjects: ["Elizn", "Hisabnikash", "NetFee"],
      skills: [
        { name: "Million-Row Sheet Virtualization", highlight: true },
        { name: "Web Workers (Off-Thread Compute)", highlight: true },
        { name: "ArrayBuffer Zero-Copy Sharing", highlight: true },
        { name: "PostgreSQL & Supabase", highlight: true },
        { name: "Prisma ORM & Drizzle", highlight: true },
        { name: "Handsontable Virtual Grid", highlight: true },
        { name: "Redis Distributed Caching", highlight: true },
        { name: "MongoDB" },
      ],
    },
    {
      title: "Backend Architecture & Type-Safe APIs",
      icon: "Server",
      badge: "Zero-Drift End-to-End",
      description: "End-to-end type safety across client-server boundaries, microservice event brokers, monorepo tooling, and idempotent payment pipelines.",
      shippedProjects: ["Willro", "Hisabnikash", "Shunno Pay"],
      skills: [
        { name: "TypeScript & Node.js", highlight: true },
        { name: "NestJS Framework", highlight: true },
        { name: "oRPC (Type-Safe RPC)", highlight: true },
        { name: "Turborepo Monorepos", highlight: true },
        { name: "RabbitMQ Microservices", highlight: true },
        { name: "Socket.io Real-Time", highlight: true },
        { name: "Idempotent Payment APIs", highlight: true },
        { name: "Cryptographic HMAC Webhooks" },
        { name: "Hono & Express.js" },
      ],
    },
    {
      title: "AI Systems & Vector Search (RAG)",
      icon: "Cpu",
      badge: "68% Token Cost Reduction",
      description: "Sub-second semantic search, multilingual vector embeddings, LLM burst debounce orchestration, and automated agent routing.",
      shippedProjects: ["Zotlyx", "Zotlyx Inbox"],
      skills: [
        { name: "RAG Architecture", highlight: true },
        { name: "Cloudflare Vectorize", highlight: true },
        { name: "BGE-M3 Multilingual Embeddings", highlight: true },
        { name: "Cloudflare Workers AI", highlight: true },
        { name: "Claude 3.5 Sonnet & OpenAI", highlight: true },
        { name: "DO Burst Debounce", highlight: true },
        { name: "Prompt Synthesis & Guardrails" },
      ],
    },
    {
      title: "Modern Frontend & Data Visualization",
      icon: "Layout",
      badge: "Sub-Second First Load",
      description: "Zero-latency UI updates, virtualized table rendering, optimistic concurrency mutations, and sleek responsive design systems.",
      shippedProjects: ["Willro", "Elizn", "Torongo"],
      skills: [
        { name: "Next.js 15 (App Router)", highlight: true },
        { name: "React 19", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "TanStack Virtual", highlight: true },
        { name: "WebSocket & Socket.io", highlight: true },
        { name: "Zustand State Isolation" },
        { name: "Radix UI & Shadcn" },
      ],
    },
    {
      title: "Workflow Automation & Hardware Telemetry",
      icon: "Cpu",
      badge: "99.99% Reliability",
      description: "Automated webhook orchestrations, IoT sensor data ingestion, microcontroller robotics, and real-time serial telemetry.",
      shippedProjects: ["IOT-101", "Eazlock", "Torongo"],
      skills: [
        { name: "n8n Workflow Automation", highlight: true },
        { name: "IoT & Arduino Microcontrollers", highlight: true },
        { name: "Sensor Interfacing (MQ-6, DHT11)", highlight: true },
        { name: "MQTT & Serial Telemetry", highlight: true },
        { name: "Hardware GPIO & Event Webhooks", highlight: true },
        { name: "MikroTik RouterOS API" },
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
  ],
};
