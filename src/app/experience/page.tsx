import fs from "fs";
import path from "path";
import matter from "gray-matter";

const EXPERIENCE_DIR = path.join(process.cwd(), "content/experience");

function getAllExperience() {
  const files = fs.readdirSync(EXPERIENCE_DIR);
  return files.map((file) => {
    const filePath = path.join(EXPERIENCE_DIR, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);
    return data;
  });
}

export default function ExperiencePage() {
  const experience = getAllExperience().sort((a, b) => (b.start > a.start ? 1 : -1));
  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Professional Experience</h1>
      <ol className="relative border-l border-blue-200">
        {experience.map((exp, idx) => (
          <li key={idx} className="mb-12 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ring-8 ring-white text-white font-bold">
              {experience.length - idx}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">{exp.role}</h2>
                <a href="#" className="text-blue-700 font-medium hover:underline">{exp.company}</a>
                <span className="ml-2 text-gray-500 text-sm">• {exp.location}</span>
              </div>
              <div className="text-gray-500 text-sm mt-2 sm:mt-0">
                {exp.start} – {exp.end}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{exp.summary}</p>
            <ul className="list-disc list-inside mt-2 text-gray-600">
              {exp.achievements && (exp.achievements as string[]).map((ach: string, i: number) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </main>
  );
} 