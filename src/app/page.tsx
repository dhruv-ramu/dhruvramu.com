"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Box, Flex, Text, Button, Card } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Box asChild style={{ minHeight: "70vh", padding: "4rem 0 0 0" }}>
        <section>
          <Flex direction="column" align="center" gap="6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ width: "100%" }}
            >
              <Text as="h1" size="8" weight="bold" align="center" style={{ fontFamily: 'serif', letterSpacing: -1 }}>
                Hello, I’m Dhruv Ramu
              </Text>
              <Text as="p" size="4" align="center" style={{ color: '#666', marginTop: 12, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                Researcher, Front-End Engineer, and lifelong learner passionate about building impactful digital experiences.
              </Text>
              <Flex gap="4" justify="center" mt="5">
                <motion.div whileHover={{ scale: 1.03, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
                  <Button asChild size="3" radius="full" color="blue" highContrast>
                    <Link href="#experience">View Experience</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
                  <Button asChild size="3" radius="full" color="gray">
                    <Link href="/blog">Read Blog</Link>
                  </Button>
                </motion.div>
              </Flex>
            </motion.div>
          </Flex>
        </section>
      </Box>
      <Box asChild style={{ padding: "4rem 0" }}>
        <section id="about">
          <Flex direction="column" align="center" gap="6">
            <Card size="3" style={{ maxWidth: 600, width: "100%", background: "#fff" }}>
              <Flex direction="column" align="center" gap="4">
                <Box style={{ width: 112, height: 112, borderRadius: "50%", overflow: "hidden", border: "4px solid #e0e7ff", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)" }}>
                  {/* Replace with actual portrait */}
                  <img src="/portrait-placeholder.png" alt="Dhruv Ramu portrait" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
                <Text as="h2" size="6" weight="bold" align="center" style={{ fontFamily: 'serif', marginTop: 8 }}>
                  About Me
                </Text>
                <Text as="p" size="4" align="center" style={{ color: '#444', maxWidth: 480 }}>
                  I’m a researcher and front-end engineer with a passion for mathematical modeling, data analysis, and building robust digital tools. My work bridges computational and wet lab research, and I thrive on collaborating with interdisciplinary teams. Currently, I focus on leveraging modern web technologies to communicate science and research impactfully.
                </Text>
                <Flex gap="8" justify="center" mt="4">
                  <Flex direction="column" align="center">
                    <Text as="span" size="6" weight="bold" color="blue">12</Text>
                    <Text as="span" size="2" color="gray">Publications</Text>
                  </Flex>
                  <Flex direction="column" align="center">
                    <Text as="span" size="6" weight="bold" color="blue">8</Text>
                    <Text as="span" size="2" color="gray">Projects</Text>
                  </Flex>
                </Flex>
                <Flex gap="2" wrap="wrap" justify="center" mt="4">
                  {['Mathematical Modelling', 'Data Analysis (Python/R)', 'LaTeX', 'Wet Lab', 'React', 'TypeScript'].map(skill => (
                    <Box key={skill} px="3" py="1" style={{ background: '#e0e7ff', color: '#2563eb', borderRadius: 999, fontSize: 13, fontWeight: 500, margin: 2, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
                      {skill}
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </section>
      </Box>
      <Box asChild style={{ padding: "4rem 0" }}>
        <section id="contact">
          <Flex direction="column" align="center" gap="6">
            <Card size="3" style={{ maxWidth: 400, width: "100%", background: "#fff" }}>
              <Flex direction="column" align="center" gap="4">
                <Text as="h2" size="5" weight="bold" align="center" style={{ fontFamily: 'serif' }}>
                  Contact
                </Text>
                <Text as="p" size="3" align="center" style={{ color: '#444', maxWidth: 320 }}>
                  Interested in collaborating, hiring, or just want to say hello? Reach out and I’ll get back to you soon.
                </Text>
                <Button asChild size="3" radius="full" color="blue" highContrast mt="4">
                  <a href="mailto:dhruvramu@gmail.com">Email Me</a>
                </Button>
              </Flex>
            </Card>
          </Flex>
        </section>
      </Box>
    </>
  );
}
