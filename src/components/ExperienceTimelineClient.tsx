"use client";
import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { motion } from "framer-motion";

export default function ExperienceTimelineClient({ experience }: { experience: any[] }) {
  return (
    <Flex direction="column" gap="6">
      {experience.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <Flex align="start" gap="4" style={{ position: "relative" }}>
            <Box style={{ width: 24, minWidth: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box style={{ width: 12, height: 12, borderRadius: 999, background: '#2563eb', marginTop: 8, marginBottom: 8, border: '2px solid #fff', boxShadow: '0 0 0 2px #2563eb' }} />
              {idx < experience.length - 1 && (
                <Box style={{ width: 2, flex: 1, background: '#e0e7ff', marginTop: 0 }} />
              )}
            </Box>
            <Card size="3" style={{ flex: 1, background: '#fff' }}>
              <Flex direction="column" gap="2">
                <Text as="div" size="5" weight="bold" style={{ fontFamily: 'var(--font-ibm-plex-serif)' }} className="text-2xl">
                  {exp.role}
                </Text>
                <Flex gap="2" align="center" wrap="wrap">
                  <Text as="span" size="4" color="blue" weight="medium">{exp.company}</Text>
                  <Text as="span" size="2" color="gray">• {exp.location}</Text>
                  <Text as="span" size="2" color="gray">{String(exp.start)} – {String(exp.end)}</Text>
                </Flex>
                <Text as="p" size="3" style={{ color: '#444', marginTop: 8 }}>{exp.summary}</Text>
                {exp.achievements && (
                  <Box asChild mt="2">
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                      {(exp.achievements as string[]).map((ach: string, i: number) => (
                        <li key={i} style={{ color: '#2563eb', fontWeight: 500, marginBottom: 4 }}>{ach}</li>
                      ))}
                    </ul>
                  </Box>
                )}
              </Flex>
            </Card>
          </Flex>
        </motion.div>
      ))}
    </Flex>
  );
} 