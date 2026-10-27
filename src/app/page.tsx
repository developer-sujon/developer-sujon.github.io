import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { CleanPortfolio } from "@/components/CleanPortfolio";

export const metadata = {
  title: "Muhammad Sujon · Lead Systems Architect & Distributed Cloud Engineer",
  description: "Systems Architect & Senior Full-Stack Engineer at Yupsis and Sitgram. Specializing in Cloudflare edge computing, million-row sheet virtualization, and IoT command queues.",
  keywords: [
    "Muhammad Sujon",
    "Systems Architect",
    "Yupsis",
    "Sitgram",
    "Zotlyx",
    "Elizn",
    "Eazlock",
    "Torongo",
    "Cloudflare Workers",
    "Next.js 15",
  ],
  authors: [{ name: "Muhammad Sujon" }],
  openGraph: {
    title: "Muhammad Sujon · Lead Systems Architect",
    description: "Systems portfolio of Muhammad Sujon featuring Zotlyx Two-Zone Edge Architecture and Elizn Million-Row Sheet Virtualization.",
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
    <main>
      <CleanPortfolio projects={projectsWithHtml} />
    </main>
  );
}
