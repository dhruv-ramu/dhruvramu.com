"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Button, Flex, Text } from "@radix-ui/themes";

export default function PdfEmbedPage({ params }: { params: { filename: string } }) {
  const router = useRouter();
  // Decode in case of spaces or special chars
  const filename = decodeURIComponent(params.filename);
  const pdfPath = `/pdf/${filename}`;

  useEffect(() => {
    document.title = filename + " | PDF Viewer";
  }, [filename]);

  return (
    <Box style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5faff 0%, #f7f0ff 100%)", padding: "2rem 0" }}>
      <Flex direction="column" align="center" gap="4">
        <Flex gap="4" align="center" mb="4">
          <Button size="3" color="blue" variant="soft" onClick={() => router.back()}>
            ← Back
          </Button>
          <Button asChild size="3" color="blue" variant="solid">
            <a href={pdfPath} download target="_blank" rel="noopener noreferrer">Download PDF</a>
          </Button>
        </Flex>
        <Text as="div" size="6" weight="bold" align="center" style={{ fontFamily: 'var(--font-ibm-plex-serif)', marginBottom: 16 }}>{filename.replace(/_/g, ' ')}</Text>
        <Box style={{ width: "100%", maxWidth: 900, minHeight: 600, background: "#fff", borderRadius: 12, boxShadow: "0 4px 32px 0 rgba(80,120,200,0.08)", overflow: "hidden" }}>
          <iframe
            src={pdfPath}
            title={filename}
            width="100%"
            height="700px"
            style={{ border: "none", borderRadius: 12 }}
            allowFullScreen
          />
        </Box>
      </Flex>
    </Box>
  );
} 