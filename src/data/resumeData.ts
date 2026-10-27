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
    yearsOfExperience: string;
    coreHighlights: string[];
    journalVolume: string;
    editorialSubtitle: string;
    statusTicker: string[];
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
    journalVolume: "Vol. IV · Systems Architecture & Distributed Systems",
    editorialSubtitle: "Specializing in multi-tenant monorepos, edge APIs, microservices, and high-performance web systems.",
    shortBio: "Lead Software Engineer and Systems Architect with 5+ years of experience building scalable web platforms, type-safe APIs, and cloud infrastructure across Sitgram, Yupsis, and Shunno IT.",
    location: "Rajshahi, Bangladesh",
    phone: "+8801772703036",
    email: "muhammad.sujon.cse@gmail.com",
    github: "https://github.com/developer-sujon",
    githubUsername: "developer-sujon",
    linkedin: "https://www.linkedin.com/in/muhammadsujon",
    website: "https://devsujon.com",
    avatarUrl: "/sujon-avatar.png",
    status: "Available for Senior Roles & Architecture Consulting",
    statusTicker: [
      "Open to senior engineering roles",
      "Turborepo monorepos & oRPC",
      "High-scale web platforms",
      "Replies within 24 hours",
    ],
    yearsOfExperience: "5+ Years",
    coreHighlights: [
      "At Sitgram: Architected Willro multi-tenant Turborepo monorepo and virtualized large spreadsheets in Elizn.",
      "At Yupsis: Architected Two-Zone Split Architecture for Zotlyx, combining Cloudflare Workers with Supabase PostgreSQL.",
      "At Yupsis: Built Torongo Cloud MikroTik Hotspot Billing Platform using oRPC edge workers and Supabase Hyperdrive.",
      "At Shunno IT: Led full-stack development for Hisabnikash multi-store inventory SaaS and NetFee ISP billing engine.",
      "At Shunno IT: Built internal enterprise platforms: SupportTicket SLA engine, Shunno Pay, and Shunno Storage.",
    ],
  },
  metrics: [
    {
      label: "Architecture",
      value: "Multi-Tenant",
      sub: "Turborepo & Microservices",
    },
    {
      label: "Full Stack",
      value: "Next.js & Node",
      sub: "TypeScript, NestJS, React",
    },
    {
      label: "Cloud & Edge",
      value: "Cloudflare & VPS",
      sub: "Workers, Nginx, Docker",
    },
    {
      label: "Networking",
      value: "MikroTik API",
      sub: "Automated billing & queues",
    },
  ],
  experiences: [
    {
      company: "Sitgram",
      role: "Lead Software Engineer",
      location: "Rajshahi, Bangladesh · On-site",
      period: "Dec 2024 – Present",
      type: "Full-time",
      summary: "Leading engineering teams, establishing Turborepo monorepo standards, introducing type-safe oRPC APIs, and managing Linux VPS infrastructure for multi-tenant web platforms.",
      highlights: [
        "Led engineering team workflows — task planning, pull request reviews, and technical mentorship",
        "Owned system design and architectural boundaries across multiple enterprise platforms and client portals",
        "Established unified Turborepo monorepos with shared UI components, configs, and validation packages",
        "Implemented oRPC for end-to-end type-safe API contracts between frontend dashboards and backend services",
        "Configured asynchronous messaging with RabbitMQ and distributed caching with Redis",
        "Maintained CI/CD pipelines on AWS, GCP, and Linux VPS environments with Nginx and PM2",
      ],
      projectsMentioned: ["Willro", "Elizn"],
      technologies: [
        "Turborepo",
        "Next.js 15",
        "React 19",
        "TypeScript",
        "oRPC",
        "Microservices",
        "RabbitMQ",
        "Redis",
        "Linux VPS",
        "Nginx",
        "PM2",
        "Docker",
        "AWS",
        "GCP",
      ],
    },
    {
      company: "Yupsis",
      role: "Software Engineer",
      location: "Rajshahi, Bangladesh · Hybrid",
      period: "Sep 2024 – Dec 2025",
      type: "Part-time",
      summary: "Architected edge computing backends on Cloudflare Workers, built IoT device command queues, and developed multi-channel AI customer support platforms.",
      highlights: [
        "Architected full-stack cloud applications from system design to database schema and production deployment",
        "Built edge serverless pipelines on Cloudflare Workers, Durable Objects, and Cloudflare Queues",
        "Integrated multi-channel messaging webhooks for Facebook Messenger, Instagram, WhatsApp, and Telegram",
        "Implemented type-safe API layers with oRPC, connecting Next.js clients to serverless workers",
        "Designed asynchronous command queues and scheduled cron workers for IoT device locking in Eazlock",
        "Configured automated deployments via GitHub Actions and managed Linux VPS environments",
      ],
      projectsMentioned: ["Zotlyx", "Torongo", "Eazlock"],
      technologies: [
        "Cloudflare Workers",
        "Durable Objects",
        "Cloudflare Queues",
        "oRPC",
        "Hono",
        "TypeScript",
        "Next.js",
        "PostgreSQL",
        "Supabase",
        "Drizzle ORM",
        "Redis",
        "Turborepo",
        "GitHub Actions",
      ],
    },
    {
      company: "Shunno IT",
      role: "Junior Software Engineer",
      location: "Rajshahi, Bangladesh · On-site",
      period: "Dec 2022 – Jun 2025",
      type: "Full-time",
      summary: "Developed full-stack SaaS applications, retail inventory systems, ISP billing platforms, and internal financial services using NestJS, React, and PostgreSQL.",
      highlights: [
        "Built and maintained full-stack production platforms using React, Node.js, NestJS, Express, and PostgreSQL",
        "Engineered multi-store inventory synchronization and double-entry accounting ledgers for Hisabnikash",
        "Connected NetFee billing software directly to physical MikroTik routers using RouterOS API sockets",
        "Built real-time agent presence and live notification updates using Socket.io and Redis",
        "Implemented secure HMAC signature verification and webhook idempotency for Shunno Pay",
        "Set up streaming file upload pipelines in Node.js to eliminate out-of-memory server crashes in Shunno Storage",
      ],
      projectsMentioned: ["Hisabnikash", "NetFee", "SupportTicket", "Shunno Pay", "Shunno Storage"],
      technologies: [
        "NestJS",
        "Node.js",
        "React",
        "TypeScript",
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "MikroTik RouterOS API",
        "RabbitMQ",
        "Redis",
        "Socket.io",
        "BullMQ",
        "Linux VPS",
        "Docker",
      ],
    },
    {
      company: "WorldSoftZone",
      role: "Frontend Web Developer",
      location: "Meherpur, Khulna, Bangladesh · On-site",
      period: "Jan 2020 – Aug 2022",
      type: "Full-time",
      summary: "Converted Figma and PSD designs into responsive, pixel-perfect frontend layouts and built custom e-commerce storefronts.",
      highlights: [
        "Converted Figma and client design mockups into clean, responsive HTML, CSS, and JavaScript layouts",
        "Developed and customized WordPress themes and WooCommerce storefronts for client e-commerce projects",
        "Built accessible user interfaces with cross-browser compatibility and optimized mobile responsiveness",
        "Collaborated directly with designers and business clients to iterate quickly on UI feedback",
      ],
      projectsMentioned: [],
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "Responsive Design",
        "Bootstrap",
        "WordPress",
        "WooCommerce",
        "Figma",
      ],
    },
  ],
  skillCategories: [
    {
      title: "Frontend & Full Stack",
      icon: "Layout",
      skills: [
        { name: "Next.js (App Router)" },
        { name: "React 19" },
        { name: "TypeScript" },
        { name: "JavaScript (ES6+)" },
        { name: "Tailwind CSS" },
        { name: "TanStack Virtual" },
        { name: "Zustand" },
        { name: "Radix UI" },
      ],
    },
    {
      title: "Backend & Microservices",
      icon: "Server",
      skills: [
        { name: "Node.js" },
        { name: "NestJS" },
        { name: "Express.js" },
        { name: "Hono" },
        { name: "oRPC (Type-Safe RPC)" },
        { name: "REST APIs" },
        { name: "Microservice Architecture" },
        { name: "RabbitMQ" },
      ],
    },
    {
      title: "Databases & Caching",
      icon: "Database",
      skills: [
        { name: "PostgreSQL" },
        { name: "Supabase" },
        { name: "MongoDB" },
        { name: "Redis" },
        { name: "Prisma ORM" },
        { name: "Drizzle ORM" },
      ],
    },
    {
      title: "Cloud, Edge & DevOps",
      icon: "Cloud",
      skills: [
        { name: "Cloudflare Workers" },
        { name: "Durable Objects" },
        { name: "Cloudflare Queues" },
        { name: "Docker" },
        { name: "Linux VPS" },
        { name: "Nginx" },
        { name: "PM2" },
        { name: "GitHub Actions CI/CD" },
        { name: "AWS & GCP" },
      ],
    },
    {
      title: "Real-Time, IoT & Automation",
      icon: "Cpu",
      skills: [
        { name: "WebSockets" },
        { name: "Socket.io" },
        { name: "n8n Workflow Automation" },
        { name: "MikroTik RouterOS API" },
        { name: "MQTT & Serial Communication" },
        { name: "Arduino & Sensor Interfacing" },
      ],
    },
    {
      title: "AI & Vector Search (RAG)",
      icon: "Sparkles",
      skills: [
        { name: "Cloudflare Vectorize" },
        { name: "Workers AI" },
        { name: "Multilingual Embeddings (BGE-M3)" },
        { name: "Claude API" },
        { name: "OpenAI API" },
      ],
    },
  ],
  education: [
    {
      degree: "Diploma in Computer Science & Engineering (Diploma in CSE)",
      institution: "Meherpur College of Engineering and Technology",
      period: "Technical Education",
      details: "Comprehensive coursework in Data Structures, Algorithms, Software Engineering, and Computer Networks.",
    },
  ],
};
