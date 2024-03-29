import { SectionTitle } from "@/components/ui/title";
import { navigationLinks, projectsData } from "@/data";
import React from "react";
import { Project } from "./project";
import { SectionLayout } from "@/components/ui/layout/section";

export const ProjectSection = () => {
  return (
    <SectionLayout id={"project"} nextSection={navigationLinks.contact}>
      <div className="mb-24">
        <SectionTitle title="Project" />
      </div>
      <div className="flex flex-col items-center gap-24 pb-32">
        {Object.values(projectsData).map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </div>
    </SectionLayout>
  );
};
