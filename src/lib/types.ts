export interface ContentLink {
  label: string;
  url: string;
}

export interface BaseContent {
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  summary: string;
  status: string;
}

export interface ProjectFrontmatter extends BaseContent {
  tools: string[];
  links?: ContentLink[];
  role?: string;
}

export interface WritingFrontmatter extends BaseContent {}

export interface BookFrontmatter {
  title: string;
  author: string;
  status: "reading" | "reviewed" | "notes" | string;
  rating?: number;
  note?: string;
  reviewSlug?: string;
  theme?: string;
  date?: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

export type Project = ContentItem<ProjectFrontmatter>;
export type Writing = ContentItem<WritingFrontmatter>;
export type Book = ContentItem<BookFrontmatter>;
