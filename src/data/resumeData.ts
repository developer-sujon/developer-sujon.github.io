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

export interface ArticleItem {
  title: string;
  slug: string;
  url: string;
  publishedAt: string;
  readTime: string;
  description: string;
  tags: string[];
  publication?: string;
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
    medium: string;
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
  articles: ArticleItem[];
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
    medium: "https://medium.com/@muhammad-sujon",
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
      summary: "Developed full-stack SaaS applications, retail inventory systems, ISP billing platforms, and internal financial services using React, NestJS, Node.js, and MongoDB.",
      highlights: [
        "Built and maintained full-stack production platforms using React, Node.js, NestJS, Express, and MongoDB",
        "Engineered multi-store inventory synchronization and double-entry accounting ledgers for Hisabnikash",
        "Connected NetFee billing software directly to physical MikroTik routers using RouterOS API sockets",
        "Built real-time agent presence and live notification updates using Socket.io and Redis",
        "Implemented secure HMAC signature verification and webhook idempotency for Shunno Pay",
        "Set up streaming file upload pipelines in Node.js to eliminate out-of-memory server crashes in Shunno Storage",
      ],
      projectsMentioned: ["Hisabnikash", "NetFee", "SupportTicket", "Shunno Pay", "Shunno Storage"],
      technologies: [
        "React",
        "NestJS",
        "Node.js",
        "MongoDB",
        "Mongoose",
        "TypeScript",
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
  articles: [
    {
      title: "Building Scalable NestJS Applications: 4 Architecture Patterns That Actually Work",
      slug: "scalable-nestjs-architecture",
      url: "https://medium.com/@muhammad-sujon/building-scalable-nestjs-applications-4-architecture-patterns-that-actually-work-065f4068c103",
      publishedAt: "Dec 2025",
      readTime: "12 min read",
      description: "A comprehensive deep-dive into solving tight coupling, circular dependencies, and testing complexity in NestJS using Direct DB Access, Use-Case Pattern, Contract-Based interfaces, and Event-Driven architecture.",
      tags: ["NestJS", "TypeScript", "Clean Code", "Architecture"],
      publication: "Medium",
    },
    {
      title: "Repeater (রিপিটার) আসলে কী এবং কীভাবে কাজ করে?",
      slug: "repeater-guide",
      url: "https://medium.com/@muhammad-sujon/repeater-%E0%A6%B0%E0%A6%BF%E0%A6%AA%E0%A6%BF%E0%A6%9F%E0%A6%BE%E0%A6%B0-%E0%A6%86%E0%A6%B8%E0%A6%B2%E0%A7%87-%E0%A6%95%E0%A7%80-%E0%A6%8F%E0%A6%AC%E0%A6%82-%E0%A6%95%E0%A7%80%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87-%E0%A6%95%E0%A6%BE%E0%A6%9C-%E0%A6%95%E0%A6%B0%E0%A7%87-ecdb8d40d9cb",
      publishedAt: "Aug 2026",
      readTime: "4 min read",
      description: "দূরত্বের কারণে ক্যাবলে নেটওয়ার্ক সিগন্যাল যখন দুর্বল (Attenuation) হয়ে পড়ে, তখন রিপিটার কীভাবে সিগন্যাল রিফ্রেশ ও অ্যাম্প্লিফাই করে কিলোমিটারের পর কিলোমিটার পৌঁছে দেয়।",
      tags: ["Networking", "Hardware", "Basic Internet"],
      publication: "Medium",
    },
    {
      title: "নেটওয়ার্ক (Network) আসলে কী?",
      slug: "network-fundamentals",
      url: "https://medium.com/@muhammad-sujon/%E0%A6%A8%E0%A7%87%E0%A6%9F%E0%A6%93%E0%A7%9F%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%95-network-%E0%A6%86%E0%A6%B8%E0%A6%B2%E0%A7%87-%E0%A6%95%E0%A7%80-27de91cac208",
      publishedAt: "Aug 2026",
      readTime: "3 min read",
      description: "এক ডিভাইস থেকে আরেক ডিভাইসে ডেটা বা ট্রাফিক পারাপারের পথ, লজিক্যাল গ্রুপিং এবং নেটওয়ার্ক জ্যাম এড়াতে সাবনেটের (Subnets) গুরুত্ব ও কার্যপ্রণালী।",
      tags: ["Networking", "Subnets", "Computer Science"],
      publication: "Medium",
    },
    {
      title: "ইন্টারনেটের ডিজিটাল ঠিকানা: IP Address আসলে কী এবং কীভাবে কাজ করে?",
      slug: "ip-address-basics",
      url: "https://medium.com/@muhammad-sujon/%E0%A6%87%E0%A6%A8%E0%A7%8D%E0%A6%9F%E0%A6%BE%E0%A6%B0%E0%A6%A8%E0%A7%87%E0%A6%9F%E0%A7%87%E0%A6%B0-%E0%A6%A1%E0%A6%BF%E0%A6%9C%E0%A6%BF%E0%A6%9F%E0%A6%BE%E0%A6%B2-%E0%A6%A0%E0%A6%BF%E0%A6%95%E0%A6%BE%E0%A6%A8%E0%A6%BE-ip-address-%E0%A6%86%E0%A6%B8%E0%A6%B2%E0%A7%87-%E0%A6%95%E0%A7%80-%E0%A6%8F%E0%A6%AC%E0%A6%82-%E0%A6%95%E0%A7%80%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87-%E0%A6%95%E0%A6%BE%E0%A6%9C-%E0%A6%95%E0%A6%B0%E0%A7%87-8df83f2f3a97",
      publishedAt: "Aug 2026",
      readTime: "5 min read",
      description: "৩২-বিট IPv4 অকটেটের গঠন, Public IP বনাম Private IP এর কাজ, ডেটা প্যাকেটে Source ও Destination IP এবং IPv6 ও DNS কীভাবে কাজ করে।",
      tags: ["IP Address", "IPv4", "IPv6", "DNS"],
      publication: "Medium",
    },
    {
      title: "ইন্টারনেট কীভাবে কাজ করে? সহজ ভাষায় বুঝুন নেটওয়ার্কিংয়ের আসল হিরো ‘Host’ কে!",
      slug: "understanding-network-host",
      url: "https://medium.com/@muhammad-sujon/%E0%A6%87%E0%A6%A8%E0%A7%8D%E0%A6%9F%E0%A6%BE%E0%A6%B0%E0%A6%A8%E0%A7%87%E0%A6%9F-%E0%A6%95%E0%A7%80%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87-%E0%A6%95%E0%A6%BE%E0%A6%9C-%E0%A6%95%E0%A6%B0%E0%A7%87-%E0%A6%B8%E0%A6%B9%E0%A6%9C-%E0%A6%AD%E0%A6%BE%E0%A6%B7%E0%A6%BE%E0%A7%9F-%E0%A6%AC%E0%A7%81%E0%A6%9D%E0%A7%81%E0%A6%A8-%E0%A6%A8%E0%A7%87%E0%A6%9F%E0%A6%93%E0%A7%9F%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A6%BF%E0%A6%82%E0%A7%9F%E0%A7%87%E0%A6%B0-%E0%A6%86%E0%A6%B8%E0%A6%B2-%E0%A6%B9%E0%A6%BF%E0%A6%B0%E0%A7%8B-host-%E0%A6%95%E0%A7%87-b734588b87ed",
      publishedAt: "Aug 2026",
      readTime: "4 min read",
      description: "সহজ রেস্তোরাঁর রূপক দিয়ে ক্লায়েন্ট ও সার্ভারের সম্পর্ক, একটি ডিভাইস কীভাবে হোস্ট হিসেবে গণ্য হয়, এবং রাউটার ও হোস্টের মধ্যে বাস্তব পার্থক্য।",
      tags: ["Networking", "Client-Server", "Internet"],
      publication: "Medium",
    },
    {
      title: "কম্পিউটার কীভাবে কাজ করে? র‍্যাম, প্রসেসর আর ১০০ জিবি মুভির পেছনের আসল গল্প!",
      slug: "how-computers-work-ram-cpu",
      url: "https://medium.com/@muhammad-sujon/%EF%B8%8F-%E0%A6%95%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%BF%E0%A6%89%E0%A6%9F%E0%A6%BE%E0%A6%B0-%E0%A6%95%E0%A7%80%E0%A6%AD%E0%A6%BE%E0%A6%AC%E0%A7%87-%E0%A6%95%E0%A6%BE%E0%A6%9C-%E0%A6%95%E0%A6%B0%E0%A7%87-%E0%A6%B0-%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%AE-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%B8%E0%A7%87%E0%A6%B8%E0%A6%B0-%E0%A6%86%E0%A6%B0-%E0%A7%A7%E0%A7%A6%E0%A7%A6-%E0%A6%9C%E0%A6%BF%E0%A6%AC%E0%A6%BF-%E0%A6%AE%E0%A7%81%E0%A6%AD%E0%A6%BF%E0%A6%B0-%E0%A6%AA%E0%A7%87%E0%A6%9B%E0%A6%A8%E0%A7%87%E0%A6%B0-%E0%A6%86%E0%A6%B8%E0%A6%B2-%E0%A6%97%E0%A6%B2%E0%A7%8D%E0%A6%AA-f8a1d992b3b5",
      publishedAt: "Aug 2026",
      readTime: "6 min read",
      description: "বিট ও বাইটের মেমরি অ্যাড্রেসিং, ৩২-বিট আর্কিটেকচারের ৪ জিবি র‍্যামের হার্ডওয়্যার সীমাবদ্ধতা বনাম ৬৪-বিট প্রসেসর, এবং র‍্যাম ও এসএসডি স্টোরেজের কাজের পার্থক্য।",
      tags: ["Computer Science", "RAM", "CPU"],
      publication: "Medium",
    },
  ],
};
