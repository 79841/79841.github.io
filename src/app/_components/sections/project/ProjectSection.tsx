import { SectionTitle } from "@/components/ui/title";
import { navigationLinks, projectsData } from "@/data";
import React from "react";
import { Project } from "./Project";
import { SectionLayout } from "@/components/ui/layout/section";
import { ScrollRisingBox } from "@/components/animation";

export const ProjectSection = () => {
  return (
    <SectionLayout id={"project"} nextSection={navigationLinks.contact}>
      <div className="mb-12">
        <SectionTitle title="Project" />
      </div>
      <div className="flex flex-col items-center gap-12">
        {Object.values(projectsData).map((project) => (
          <ScrollRisingBox key={project.name}>
            <Project project={project} />
          </ScrollRisingBox>
        ))}
      </div>
    </SectionLayout>
  );
};
