"use client";
import dynamic from "next/dynamic";

const ResearchAnimatedClient = dynamic(() => import("../../components/ResearchAnimatedClient"), { ssr: false });

export default function ResearchPageClient({ projects, publications, talks }: { projects: any[]; publications: any[]; talks: any[] }) {
  return <ResearchAnimatedClient projects={projects} publications={publications} talks={talks} />;
} 