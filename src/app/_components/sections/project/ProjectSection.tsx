import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import { navigationLinks, projectsData } from "@/data";
import { Project } from "./project";

export const ProjectSection = () => {
  return (
    <SectionLayout id={"project"} nextSection={navigationLinks.contact}>
      <div className="mb-24">
        <SectionTitle title="Project" />
      </div>
      <div className="flex flex-col items-center gap-24 pb-32">
        {Object.values(projectsData)
          .reverse()
          .map((project) => (
            <Project key={project.name} project={project} />
          ))}
      </div>
    </SectionLayout>
  );
};
