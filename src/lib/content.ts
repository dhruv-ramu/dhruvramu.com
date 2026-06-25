import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Book,
  BookFrontmatter,
  Project,
  ProjectFrontmatter,
  Writing,
  WritingFrontmatter,
} from "./types";

const contentDirectory = path.join(process.cwd(), "content");

function getMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readContent<T>(type: "projects" | "writing" | "books", slug: string) {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as T, content };
}

export function getAllProjects(): Project[] {
  const slugs = getMdxFiles(path.join(contentDirectory, "projects"));
  return slugs
    .map((slug) => readContent<ProjectFrontmatter>("projects", slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    return readContent<ProjectFrontmatter>("projects", slug);
  } catch {
    return null;
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured);
}

export function getAllWriting(): Writing[] {
  const slugs = getMdxFiles(path.join(contentDirectory, "writing"));
  return slugs
    .map((slug) => readContent<WritingFrontmatter>("writing", slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getWritingBySlug(slug: string): Writing | null {
  try {
    return readContent<WritingFrontmatter>("writing", slug);
  } catch {
    return null;
  }
}

export function getAllBooks(): Book[] {
  const slugs = getMdxFiles(path.join(contentDirectory, "books"));
  return slugs.map((slug) => readContent<BookFrontmatter>("books", slug));
}

export function getAdjacentWriting(slug: string) {
  const posts = getAllWriting();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
