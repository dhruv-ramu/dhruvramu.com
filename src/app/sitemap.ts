import { getAllProjects, getAllWriting } from "@/lib/content";

export default function sitemap() {
  const baseUrl = "https://dhruvramu.com";

  const staticPages = [
    "",
    "/projects",
    "/writing",
    "/library",
    "/about",
    "/resume",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectPages = getAllProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const writingPages = getAllWriting().map((p) => ({
    url: `${baseUrl}/writing/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...writingPages];
}
