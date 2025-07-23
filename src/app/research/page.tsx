import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RESEARCH_DIR = path.join(process.cwd(), "content/research");

function getAllResearch() {
  const files = fs.readdirSync(RESEARCH_DIR);
  return files.map((file) => {
    const filePath = path.join(RESEARCH_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return data;
  });
}

export default function ResearchPage() {
  const research = getAllResearch();
  // For now, treat all as publications. Later, split by type if needed.
  const publications = research.sort((a, b) => (b.year > a.year ? 1 : -1));
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Research & Publications</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Publications</h2>
        <ul className="divide-y divide-gray-200">
          {publications.map((pub, idx) => (
            <li key={idx} className="py-4">
              <div className="italic font-medium">{pub.title}</div>
              <div className="text-sm text-gray-600">{pub.authors}, {pub.journal}, {pub.year}.</div>
              <div className="flex gap-2 mt-1">
                {pub.doi && (
                  <a href={`https://doi.org/${pub.doi}`} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">DOI</a>
                )}
                {pub.pdf && (
                  <a href={pub.pdf} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">PDF</a>
                )}
                {pub.arxiv && (
                  <a href={pub.arxiv} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">arXiv</a>
                )}
              </div>
              <div className="flex gap-2 mt-1 flex-wrap">
                {pub.tags && (pub.tags as string[]).map((tag: string, i: number) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm">{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
} 