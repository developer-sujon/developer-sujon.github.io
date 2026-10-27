import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { Navbar } from "@/components/Navbar";
import { ResumeHeader } from "@/components/ResumeHeader";
import { MetricsBento } from "@/components/MetricsBento";
import { InteractiveArchitecture } from "@/components/InteractiveArchitecture";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";

export const metadata = {
  title: "Muhammad Sujon | Lead Systems Architect & Full-Stack Cloud Engineer",
  description: "Executive engineering resume and portfolio of Muhammad Sujon. Specializing in Cloudflare Workers, Durable Objects, Vectorize RAG, Next.js 15, and distributed high-concurrency systems.",
  keywords: [
    "Muhammad Sujon",
    "Systems Architect",
    "Cloudflare Workers",
    "Durable Objects",
    "Vectorize",
    "RAG",
    "Next.js",
    "TypeScript",
    "Turborepo",
    "Drizzle ORM",
    "Zotlyx",
  ],
  authors: [{ name: "Muhammad Sujon" }],
  openGraph: {
    title: "Muhammad Sujon — Lead Systems Architect & Full-Stack Cloud Engineer",
    description: "Production-grade portfolio featuring Zotlyx Two-Zone Edge Architecture, Durable Object Burst Debouncers, and high-concurrency monorepos.",
    type: "website",
    url: "https://github.com/developer-sujon",
  },
};

export default async function HomePage() {
  const allProjects = await getAllProjects();

  // Pre-render HTML for each project markdown
  const projectsWithHtml = await Promise.all(
    allProjects.map(async (project) => {
      const data = await getProjectBySlug(project.slug);
      return {
        metadata: project,
        htmlContent: data?.htmlContent || "",
      };
    })
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      {/* Top Floating Glass Navigation */}
      <Navbar />

      {/* Main Resume Container */}
      <main className="relative">
        {/* Subtle Ambient Background Glow (Dark Mode) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* 1. Resume Header & Identity */}
        <ResumeHeader />

        {/* 2. Key Metrics & Engineering Highlights */}
        <MetricsBento />

        {/* 3. Interactive Systems Architecture (Zotlyx Two-Zone Split) */}
        <InteractiveArchitecture />

        {/* 4. Production Projects & Markdown Case Studies */}
        <ProjectsSection projects={projectsWithHtml} />

        {/* 5. Career History Timeline */}
        <ExperienceSection />

        {/* 6. Technical Competencies & Education */}
        <SkillsSection />

        {/* 7. Contact & Command Card */}
        <ContactSection />
      </main>
    </div>
  );
}
