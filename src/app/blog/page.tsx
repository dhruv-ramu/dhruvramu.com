import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Card, Flex, Text, Box, Button } from "@radix-ui/themes";

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
    <Box asChild style={{ padding: "4rem 0" }}>
      <main className="max-w-5xl mx-auto">
        <Flex gap="8" align="start">
          <Box style={{ flex: 3 }}>
            <Text as="div" size="7" weight="bold" align="center" style={{ fontFamily: 'serif', marginBottom: 40 }} className="text-4xl">Blog</Text>
            <Flex direction="column" gap="6">
              {posts.map((post, idx) => (
                <Card key={idx} size="3" style={{ background: '#fff' }}>
                  <Flex direction="column" gap="2">
                    <Text as="div" size="5" weight="bold" style={{ fontFamily: 'serif' }} className="text-2xl">{post.title}</Text>
                    <Text as="span" size="3" color="gray">{post.date}</Text>
                    <Text as="p" size="3" style={{ color: '#444' }}>{post.excerpt}</Text>
                    <Flex gap="2" wrap="wrap" mt="1">
                      {post.tags && (post.tags as string[]).map((tag: string, i: number) => (
                        <Box key={i} px="3" py="1" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 999, fontSize: 13, fontWeight: 500, margin: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
                          {tag}
                        </Box>
                      ))}
                    </Flex>
                    <Button asChild size="2" radius="full" color="blue" highContrast mt="2" style={{ alignSelf: 'flex-start' }}>
                      <a href="#">Read More →</a>
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Box>
          <Box style={{ flex: 1, minWidth: 240 }}>
            <Card size="2" style={{ background: '#f9fafb', marginBottom: 24 }}>
              <Text as="div" size="4" weight="bold" style={{ fontFamily: 'serif', marginBottom: 12 }}>Categories</Text>
              <Text as="div" size="2" color="gray">(Coming soon)</Text>
            </Card>
            <Card size="2" style={{ background: '#f9fafb', marginBottom: 24 }}>
              <Text as="div" size="4" weight="bold" style={{ fontFamily: 'serif', marginBottom: 12 }}>Recent Posts</Text>
              <Text as="div" size="2" color="gray">(Coming soon)</Text>
            </Card>
            <Card size="2" style={{ background: '#f9fafb' }}>
              <Text as="div" size="4" weight="bold" style={{ fontFamily: 'serif', marginBottom: 12 }}>Tag Cloud</Text>
              <Text as="div" size="2" color="gray">(Coming soon)</Text>
            </Card>
          </Box>
        </Flex>
      </main>
    </Box>
  );
} 