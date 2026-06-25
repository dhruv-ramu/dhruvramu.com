import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { MDXContent } from "@/lib/mdx";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <PageTransition>
      <Container narrow className="py-12 md:py-20">
        <Link
          href="/projects"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-ink transition-colors"
        >
          ← All projects
        </Link>

        <header className="mt-8 md:mt-12">
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
            {frontmatter.title}
          </h1>
          {frontmatter.subtitle && (
            <p className="mt-4 font-body text-xl md:text-2xl italic text-muted">
              {frontmatter.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted border-y border-line py-4">
            <span>{formatDate(frontmatter.date)}</span>
            <span>{frontmatter.category}</span>
            <span>{frontmatter.status}</span>
            {frontmatter.role && <span>{frontmatter.role}</span>}
          </div>

          {frontmatter.tools && (
            <div className="mt-4 flex flex-wrap gap-2">
              {frontmatter.tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
          )}
        </header>

        <PhotoPlaceholder
          variant="hero"
          label="Project figure"
          caption={frontmatter.title}
          className="mt-10"
        />

        <article className="prose-article mt-12 md:mt-16">
          <MDXContent source={content} />
        </article>

        {frontmatter.links && frontmatter.links.length > 0 && (
          <div className="mt-12 pt-8 border-t border-line flex flex-wrap gap-4">
            {frontmatter.links.map((link) => (
              <Button key={link.url} href={link.url} external>
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </Container>
    </PageTransition>
  );
}
