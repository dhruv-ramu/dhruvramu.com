import { PageTransition } from "@/components/PageTransition";
import { HomeHero } from "@/components/HomeHero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getAllProjects, getAllWriting } from "@/lib/content";

export default function HomePage() {
  const projects = getAllProjects();
  const writing = getAllWriting();

  return (
    <PageTransition>
      <HomeHero />
      <ProjectsSection projects={projects} />
      <WritingSection posts={writing} />
      <AboutSection />
      <ContactSection />
    </PageTransition>
  );
}
