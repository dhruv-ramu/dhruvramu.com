import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectsArchive } from "@/components/ProjectsArchive";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical work, research systems, strategy tools, and experiments.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return <ProjectsArchive projects={projects} />;
}
