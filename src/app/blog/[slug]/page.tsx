import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import BlogPostClientWrapper from "./BlogPostClientWrapper";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "posts");

type Post = {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  content: string;
  slug: string;
};

function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR);
  return files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);
    return { ...data, content, slug: file.replace(/\.mdx?$/, "") } as Post;
  });
}

function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  return { ...data, content, slug } as Post;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  // Always coerce date to string
  post.date = typeof post.date === 'string' ? post.date : String(post.date);
  const allPosts = getAllPosts().map(p => ({
    ...p,
    date: typeof p.date === 'string' ? p.date : String(p.date),
  }));
  const related = allPosts.filter(p => p.slug !== slug).slice(0, 3);
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
    },
  });
  const { content, ...meta } = post;
  return (
    <BlogPostClientWrapper post={meta} mdxSource={mdxSource} related={related} />
  );
} 