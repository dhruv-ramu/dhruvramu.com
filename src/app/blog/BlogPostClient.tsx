"use client";
import { Card, Flex, Text, Box, Button } from "@radix-ui/themes";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { motion } from "framer-motion";
import Link from "next/link";
import { TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

interface PostMeta {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  slug: string;
  author?: string;
  reading_time?: string;
  pdf?: string;
  logo?: string;
}

interface Props {
  post: PostMeta;
  mdxSource: MDXRemoteSerializeResult;
  related: PostMeta[];
}

// PDF embed component
function Pdf({ src, title }: { src: string; title?: string }) {
  // Only allow embedding from /pdf/
  if (!src.startsWith('/pdf/')) return null;
  return (
    <Box my="4">
      <iframe
        src={src}
        title={title || 'PDF'}
        width="100%"
        height="600px"
        style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}
        allowFullScreen
      />
      <Text as="div" size="2" color="gray" align="center" mt="2">
        <a href={src} target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
      </Text>
    </Box>
  );
}

export default function BlogPostClient({ post, mdxSource, related }: Props) {
  const { slug } = post;
  // Format date for display
  function formatDate(date: string) {
    if (!date) return "";
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date;
  }
  return (
    <Box asChild style={{ padding: "0 0 6rem 0" }}>
      <main className="max-w-3xl mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Box
            style={{
              background: "linear-gradient(120deg, #e0e7ff 0%, #f5faff 100%)",
              borderRadius: 24,
              marginTop: 40,
              marginBottom: 32,
              padding: "2.5rem 2rem 2rem 2rem",
              boxShadow: "0 4px 32px 0 rgba(80, 120, 200, 0.08)",
            }}
          >
            <Button asChild size="2" color="blue" variant="soft" style={{ marginBottom: 24 }}>
              <Link href="/blog">← Back to Blog</Link>
            </Button>
            {post.logo && (
              <img src={post.logo} alt="Post logo" style={{ maxWidth: 80, borderRadius: 12, marginBottom: 16 }} />
            )}
            <Text
              as="div"
              size="8"
              weight="bold"
              style={{ fontFamily: "var(--font-ibm-plex-serif)" }}
              className="text-4xl"
            >
              {post.title}
            </Text>
            <Flex gap="2" align="center" wrap="wrap" mt="2">
              <Text as="span" size="3" color="gray">
                {formatDate(post.date)}
              </Text>
              {post.author && (
                <Text as="span" size="3" color="gray">• {post.author}</Text>
              )}
              {post.reading_time && (
                <Text as="span" size="3" color="gray">• {post.reading_time} read</Text>
              )}
              {post.tags &&
                post.tags.map((tag, i) => (
                  <Box
                    key={i}
                    px="3"
                    py="1"
                    style={{
                      background: "#e0e7ff",
                      color: "#2563eb",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 500,
                      margin: 2,
                      boxShadow: "0 1px 2px 0 rgba(0,0,0,0.03)",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
            </Flex>
            {post.pdf && (
              <Button asChild size="2" color="blue" variant="solid" style={{ marginTop: 18, marginBottom: 0 }}>
                <a href={post.pdf} target="_blank" rel="noopener noreferrer">Download PDF</a>
              </Button>
            )}
            <Flex gap="2" mt="2">
              <Button asChild size="2" color="blue" variant="soft">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    post.title
                  )}&url=${encodeURIComponent(`https://dhruvramu.com/blog/${slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterLogoIcon /> Share
                </a>
              </Button>
              <Button asChild size="2" color="blue" variant="soft">
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    `https://dhruvramu.com/blog/${slug}`
                  )}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInLogoIcon /> Share
                </a>
              </Button>
              <Button asChild size="2" color="blue" variant="soft">
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    post.title
                  )}&body=${encodeURIComponent(
                    `https://dhruvramu.com/blog/${slug}`
                  )}`}
                >
                  <span style={{ fontWeight: 600 }}>Email</span>
                </a>
              </Button>
            </Flex>
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Card
            size="3"
            style={{
              background: "#fff",
              marginBottom: 40,
              padding: 32,
              boxShadow: "0 4px 32px 0 rgba(80, 120, 200, 0.08)",
            }}
          >
            <MDXRemote
              {...mdxSource}
              components={{
                h1: (props: any) => (
                  <h1
                    {...props}
                    style={{
                      fontFamily: "var(--font-ibm-plex-serif)",
                      fontWeight: 700,
                      fontSize: 36,
                      margin: "2rem 0 1rem",
                    }}
                  />
                ),
                h2: (props: any) => (
                  <h2
                    {...props}
                    style={{
                      fontFamily: "var(--font-ibm-plex-serif)",
                      fontWeight: 700,
                      fontSize: 28,
                      margin: "2rem 0 1rem",
                    }}
                  />
                ),
                h3: (props: any) => (
                  <h3
                    {...props}
                    style={{
                      fontFamily: "var(--font-ibm-plex-serif)",
                      fontWeight: 700,
                      fontSize: 22,
                      margin: "2rem 0 1rem",
                    }}
                  />
                ),
                code: (props: any) => (
                  <code
                    {...props}
                    style={{
                      background: "#f3f4f6",
                      borderRadius: 6,
                      padding: "2px 6px",
                      fontSize: 15,
                    }}
                  />
                ),
                pre: (props: any) => (
                  <pre
                    {...props}
                    style={{
                      background: "#f3f4f6",
                      borderRadius: 8,
                      padding: 16,
                      overflowX: "auto",
                      margin: "1.5rem 0",
                    }}
                  />
                ),
                img: (props: any) => (
                  <img
                    {...props}
                    src={props.src?.startsWith('/logos/') || props.src?.startsWith('/pdf/') || props.src?.startsWith('/public/') ? props.src : `/public/${props.src}`}
                    style={{
                      maxWidth: "100%",
                      borderRadius: 8,
                      margin: "1.5rem 0",
                    }}
                  />
                ),
                Pdf,
              }}
            />
          </Card>
        </motion.div>
        <Box mt="8">
          <Text
            as="div"
            size="5"
            weight="bold"
            style={{ fontFamily: "var(--font-ibm-plex-serif)" }}
            className="text-2xl"
            mb="4"
          >
            Related Posts
          </Text>
          <Flex gap="4" wrap="wrap">
            {related.map((rel) => (
              <Card key={rel.slug} size="2" style={{ minWidth: 220, background: "#f9fafb" }}>
                <Flex direction="column" gap="2">
                  <Text
                    as="div"
                    size="4"
                    weight="bold"
                    style={{ fontFamily: "var(--font-ibm-plex-serif)" }}
                  >
                    {rel.title}
                  </Text>
                  <Text as="span" size="2" color="gray">
                    {rel.date}
                  </Text>
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