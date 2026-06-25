import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllWriting,
  getWritingBySlug,
  getAdjacentWriting,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { MDXContent } from "@/lib/mdx";
import { Container } from "@/components/Container";
import { PageTransition } from "@/components/PageTransition";
import { Tag } from "@/components/Tag";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllWriting().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
    },
  };
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content } = post;
  const { prev, next } = getAdjacentWriting(slug);

  return (
    <PageTransition>
      <Container narrow className="py-12 md:py-20 relative">
        {/* Marginal note - desktop only */}
        <aside className="hidden xl:block absolute -right-48 top-32 w-36">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-light leading-relaxed">
            {frontmatter.category}
            <br />
            <br />
            {frontmatter.status}
          </p>
        </aside>

        <Link
          href="/#writing"
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-ink transition-colors"
        >
          ← All writing
        </Link>

        <header className="mt-8 md:mt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {frontmatter.category} · {formatDate(frontmatter.date)}
          </p>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-medium tracking-tight text-ink leading-[1.05]">
            {frontmatter.title}
          </h1>
          {frontmatter.subtitle && (
            <p className="mt-4 font-body text-xl md:text-2xl italic text-muted">
              {frontmatter.subtitle}
            </p>
          )}
          {frontmatter.tags && (
            <div className="mt-6 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </header>

        {frontmatter.featured && (
          <PhotoPlaceholder
            aspectRatio="16/9"
            label="Essay illustration"
            caption={frontmatter.title}
            className="mt-10"
          />
        )}

        <article className="prose-article mt-12 md:mt-16">
          <MDXContent source={content} />
        </article>

        <nav className="mt-16 pt-8 border-t border-line grid grid-cols-1 md:grid-cols-2 gap-8">
          {prev ? (
            <Link href={`/writing/${prev.slug}`} className="group">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Previous
              </p>
              <p className="mt-2 font-display text-xl font-medium text-ink group-hover:text-accent transition-colors">
                {prev.frontmatter.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link href={`/writing/${next.slug}`} className="group md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Next
              </p>
              <p className="mt-2 font-display text-xl font-medium text-ink group-hover:text-accent transition-colors">
                {next.frontmatter.title}
              </p>
            </Link>
          )}
        </nav>
      </Container>
    </PageTransition>
  );
}
