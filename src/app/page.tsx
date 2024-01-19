import { IntroSection } from "./_components/sections/intro";
import { ExperienceSection } from "./_components/sections/experience";
import { SkillSection } from "./_components/sections/skill";
import { ProjectSection } from "./_components/sections/project";
import { ContactSection } from "./_components/sections/contact";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <IntroSection />
      <SkillSection />
      <ExperienceSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}
