import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "posts");

function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR);
  return files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return data;
  });
}

export default function BlogPage() {
  const posts = getAllPosts().sort((a, b) => (b.date > a.date ? 1 : -1));
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {posts.map((post, idx) => (
          <article key={idx} className="bg-white/80 rounded-xl shadow p-6 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <div className="text-sm text-gray-500 mb-2">{post.date}</div>
            <p className="text-gray-700 mb-2">{post.excerpt}</p>
            <div className="flex gap-2 flex-wrap mb-2">
              {post.tags && (post.tags as string[]).map((tag: string, i: number) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">{tag}</span>
              ))}
            </div>
            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">Read More →</a>
          </article>
        ))}
      </div>
    </main>
  );
} 