import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { ProjectMetadata } from "@/data/resumeData";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        title: data.title || "Untitled Project",
        slug: data.slug || fileName.replace(/\.md$/, ""),
        tagline: data.tagline || "",
        role: data.role || "Lead Engineer",
        period: data.period || "",
        status: data.status || "Production",
        featured: Boolean(data.featured),
        badge: data.badge || "",
        stars: data.stars || "",
        metrics: data.metrics || [],
        tags: data.tags || [],
        githubUrl: data.githubUrl || "",
        liveUrl: data.liveUrl || "",
        content: content,
      } as ProjectMetadata;
    });

  // Sort featured first
  return allProjects.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
}

export async function getProjectBySlug(slug: string): Promise<{
  metadata: ProjectMetadata;
  htmlContent: string;
} | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const htmlContent = await marked.parse(content);

  const metadata: ProjectMetadata = {
    title: data.title || "Untitled Project",
    slug: data.slug || slug,
    tagline: data.tagline || "",
    role: data.role || "Lead Engineer",
    period: data.period || "",
    status: data.status || "Production",
    featured: Boolean(data.featured),
    badge: data.badge || "",
    stars: data.stars || "",
    metrics: data.metrics || [],
    tags: data.tags || [],
    githubUrl: data.githubUrl || "",
    liveUrl: data.liveUrl || "",
    content: content,
  };

  return { metadata, htmlContent };
}
