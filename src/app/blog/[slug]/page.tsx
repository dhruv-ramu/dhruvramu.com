import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Card, Flex, Text, Box, Button } from "@radix-ui/themes";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();
  const allPosts = getAllPosts();
  const related = allPosts.filter(p => p.slug !== params.slug).slice(0, 3);
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
    },
  });
  return (
    <Box asChild style={{ padding: "4rem 0" }}>
      <main className="max-w-3xl mx-auto">
        <Card size="4" style={{ background: '#fff', marginBottom: 40, padding: 32 }}>
          <Flex direction="column" gap="4">
            <Text as="div" size="8" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-4xl">
              {post.title}
            </Text>
            <Flex gap="2" align="center" wrap="wrap">
              <Text as="span" size="3" color="gray">{post.date}</Text>
              {post.tags && post.tags.map((tag, i) => (
                <Box key={i} px="3" py="1" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 999, fontSize: 13, fontWeight: 500, margin: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
                  {tag}
                </Box>
              ))}
            </Flex>
            <Flex gap="2" mt="2">
              <Button asChild size="2" color="blue" variant="soft">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://dhruvramu.com/blog/${params.slug}`)}`} target="_blank" rel="noopener noreferrer"><TwitterLogoIcon /> Share</a>
              </Button>
              <Button asChild size="2" color="blue" variant="soft">
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://dhruvramu.com/blog/${params.slug}`)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer"><LinkedInLogoIcon /> Share</a>
              </Button>
              <Button asChild size="2" color="blue" variant="soft">
                <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`https://dhruvramu.com/blog/${params.slug}`)}`}><span style={{ fontWeight: 600 }}>Email</span></a>
              </Button>
            </Flex>
          </Flex>
        </Card>
        <Card size="3" style={{ background: '#fff', marginBottom: 40, padding: 32 }}>
          <MDXRemote
            {...{
              ...mdxSource,
              components: {
                h1: (props: any) => <h1 {...props} style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 700, fontSize: 36, margin: '2rem 0 1rem' }} />,
                h2: (props: any) => <h2 {...props} style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 700, fontSize: 28, margin: '2rem 0 1rem' }} />,
                h3: (props: any) => <h3 {...props} style={{ fontFamily: 'var(--font-ibm-plex-serif)', fontWeight: 700, fontSize: 22, margin: '2rem 0 1rem' }} />,
                code: (props: any) => <code {...props} style={{ background: '#f3f4f6', borderRadius: 6, padding: '2px 6px', fontSize: 15 }} />,
                pre: (props: any) => <pre {...props} style={{ background: '#f3f4f6', borderRadius: 8, padding: 16, overflowX: 'auto', margin: '1.5rem 0' }} />,
                img: (props: any) => <img {...props} style={{ maxWidth: '100%', borderRadius: 8, margin: '1.5rem 0' }} />,
              },
            }}
          />
        </Card>
        <Box mt="8">
          <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-2xl" mb="4">Related Posts</Text>
          <Flex gap="4" wrap="wrap">
            {related.map((rel) => (
              <Card key={rel.slug} size="2" style={{ minWidth: 220, background: '#f9fafb' }}>
                <Flex direction="column" gap="2">
                  <Text as="div" size="4" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }}>{rel.title}</Text>
                  <Text as="span" size="2" color="gray">{rel.date}</Text>
                  <Button asChild size="1" color="blue" variant="soft" mt="2">
                    <Link href={`/blog/${rel.slug}`}>Read</Link>
                  </Button>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Box>
      </main>
    </Box>
  );
} 