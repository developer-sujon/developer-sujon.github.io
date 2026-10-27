import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { CleanPortfolio } from "@/components/CleanPortfolio";

export const dynamic = "force-static";

export const metadata = {
  title: "Muhammad Sujon · Software Engineer",
  description: "Software Engineer with 5+ years of experience building web platforms, Turborepo monorepos, and Cloudflare edge systems.",
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
