import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { ProjectDetailView } from "@/components/ProjectDetailView";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const { metadata } = project;
  const pageTitle = `${metadata.title} · Muhammad Sujon`;
  const description = metadata.tagline || `Deep dive case study into ${metadata.title} by Muhammad Sujon.`;

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      type: "article",
      url: `https://developer-sujon.github.io/projects/${slug}`,
      siteName: "Muhammad Sujon Portfolio",
      images: [
        {
          url: "/sujon-avatar.png",
          width: 460,
          height: 460,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: ["/sujon-avatar.png"],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);

  const prevProject =
    currentIndex > 0
      ? { slug: allProjects[currentIndex - 1].slug, title: allProjects[currentIndex - 1].title }
      : null;

  const nextProject =
    currentIndex < allProjects.length - 1
      ? { slug: allProjects[currentIndex + 1].slug, title: allProjects[currentIndex + 1].title }
      : null;

  return (
    <ProjectDetailView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
