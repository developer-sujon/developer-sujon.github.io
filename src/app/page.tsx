import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { EditorialJournal } from "@/components/EditorialJournal";

export const metadata = {
  title: "Muhammad Sujon · Lead Systems Architect & Distributed Cloud Engineer",
  description: "Independent systems chronicle and technical portfolio of Muhammad Sujon. Systems architecture at Yupsis and Sitgram covering sub-second Cloudflare edge pipelines, million-row spreadsheet virtualization, and IoT command queues.",
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
    "Durable Objects",
    "Next.js 15",
  ],
  authors: [{ name: "Muhammad Sujon" }],
  openGraph: {
    title: "Muhammad Sujon · Lead Systems Architect & Distributed Cloud Engineer",
    description: "Independent software journal featuring Zotlyx Two-Zone Edge Architecture, Elizn Million-Row Spreadsheet Virtualization, and Eazlock IoT command queues.",
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
    <main className="min-h-screen bg-[var(--surface-1)] transition-colors duration-200">
      <EditorialJournal projects={projectsWithHtml} />
    </main>
  );
}
