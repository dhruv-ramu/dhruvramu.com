import type { Metadata } from "next";
import { getAllWriting } from "@/lib/content";
import { WritingArchive } from "@/components/WritingArchive";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays, notes, book reviews, research logs, and unfinished thoughts.",
};

export default function WritingPage() {
  const posts = getAllWriting();
  return <WritingArchive posts={posts} />;
}
