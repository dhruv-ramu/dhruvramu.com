"use client";
import { Card, Flex, Text, Box, Button } from "@radix-ui/themes";
import { useState } from "react";
import { motion } from "framer-motion";

type BlogPost = {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  slug: string;
};

function getAllTags(posts: BlogPost[]) {
  const tags = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) post.tags.forEach((tag: string) => tags.add(tag));
  });
  return Array.from(tags);
}

function getRecentPosts(posts: BlogPost[], count = 5) {
  return posts.slice(0, count);
}

export default function BlogClient({ allPosts }: { allPosts: BlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const posts = allPosts.slice(0, visibleCount);
  const tags = getAllTags(allPosts);
  const recentPosts = getRecentPosts(allPosts);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const filteredPosts = selectedTag ? allPosts.filter(post => post.tags && post.tags.includes(selectedTag)) : posts;

  return (
    <Flex gap="8" align="start">
      <Box style={{ flex: 3 }}>
        <Text as="div" size="7" weight="bold" align="center" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 40 }} className="text-4xl">Blog</Text>
        <Flex direction="column" gap="6">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              style={{ width: "100%" }}
            >
              <Card size="3" style={{ background: '#fff', padding: 32, boxShadow: '0 4px 32px 0 rgba(80, 120, 200, 0.08)' }}>
                <Flex direction="column" gap="2">
                  <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-2xl">{post.title}</Text>
                  <Text as="span" size="3" color="gray">{String(post.date)}</Text>
                  <Text as="p" size="3" style={{ color: '#444' }}>{post.excerpt}</Text>
                  <Flex gap="2" wrap="wrap" mt="1">
                    {post.tags && post.tags.map((tag, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.08, backgroundColor: '#2563eb', color: '#fff' }}
                        style={{ display: 'inline-block' }}
                      >
                        <Box
                          px="3"
                          py="1"
                          style={{
                            background: selectedTag === tag ? '#2563eb' : '#e0e7ff',
                            color: selectedTag === tag ? '#fff' : '#2563eb',
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 500,
                            margin: 2,
                            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                            cursor: 'pointer',
                            transition: 'background 0.2s, color 0.2s',
                          }}
                          onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                          {tag}
                        </Box>
                      </motion.div>
                    ))}
                  </Flex>
                  <motion.div whileHover={{ scale: 1.04, boxShadow: "0 2px 12px 0 rgba(80,120,200,0.10)" }} style={{ alignSelf: 'flex-start' }}>
                    <Button asChild size="2" radius="full" color="blue" highContrast mt="2">
                      <a href={`/blog/${post.slug}`}>Read More →</a>
                    </Button>
                  </motion.div>
                </Flex>
              </Card>
            </motion.div>
          ))}
        </Flex>
        {!selectedTag && visibleCount < allPosts.length && (
          <Flex justify="center" mt="6">
            <Button size="3" color="blue" variant="soft" onClick={() => setVisibleCount(visibleCount + 5)}>
              Load More
            </Button>
          </Flex>
        )}
      </Box>
      <Box style={{ flex: 1, minWidth: 240 }}>
        <Card size="2" style={{ background: '#f9fafb', marginBottom: 24, padding: 24 }}>
          <Text as="div" size="4" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 12 }}>Tag Cloud</Text>
          <Flex gap="2" wrap="wrap">
            {tags.map((tag, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, backgroundColor: '#2563eb', color: '#fff' }}
                style={{ display: 'inline-block' }}
              >
                <Box
                  px="3"
                  py="1"
                  style={{
                    background: selectedTag === tag ? '#2563eb' : '#e0e7ff',
                    color: selectedTag === tag ? '#fff' : '#2563eb',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 500,
                    margin: 2,
                    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  {tag}
                </Box>
              </motion.div>
            ))}
          </Flex>
        </Card>
        <Card size="2" style={{ background: '#f9fafb', marginBottom: 24, padding: 24 }}>
          <Text as="div" size="4" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 12 }}>Recent Posts</Text>
          <Flex direction="column" gap="2">
            {recentPosts.map((post, i) => (
              <Box key={i}>
                <a href={`/blog/${post.slug}`} style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 500 }}>{post.title}</a>
              </Box>
            ))}
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
} 