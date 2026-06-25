import { PageTransition } from "@/components/PageTransition";
import { HomeHero } from "@/components/HomeHero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { WritingSection } from "@/components/sections/WritingSection";
import { LibrarySection } from "@/components/sections/LibrarySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getAllProjects, getAllWriting } from "@/lib/content";

// import { AtlasOfRecurringQuestions } from "@/components/atlas/AtlasOfRecurringQuestions";
// Atlas lives at /atlas only — not on the one-page homepage.

export default function HomePage() {
  const projects = getAllProjects();
  const writing = getAllWriting();

  return (
    <PageTransition>
      <HomeHero />
      <ProjectsSection projects={projects} />
      <WritingSection posts={writing} />
      <LibrarySection />
      <AboutSection />
      <ContactSection />

      {/*
      <EditorialSection label="Atlas" invert>
        <AtlasOfRecurringQuestions compact invert />
      </EditorialSection>
      */}
    </PageTransition>
  );
}
