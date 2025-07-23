import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogClient from "./BlogClient";

const POSTS_DIR = path.join(process.cwd(), "posts");

type BlogPost = {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  slug: string;
};

function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(POSTS_DIR);
  return files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return { ...data, slug: file.replace(/\.mdx?$/, "") } as BlogPost;
  });
}

export default function BlogPage() {
  const allPosts = getAllPosts().sort((a, b) => (b.date > a.date ? 1 : -1));
  return (
    <div style={{ padding: '4rem 1.5rem 8rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <BlogClient allPosts={allPosts} />
    </div>
  );
} 