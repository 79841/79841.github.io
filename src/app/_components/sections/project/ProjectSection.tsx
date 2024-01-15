import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import { projectsData } from "@/data";
import React from "react";
import { Project } from "./Project";

export const ProjectSection = () => {
  return (
    <section className="flex flex-col border w-full">
      <SectionTitle title="Project" />
      {Object.values(projectsData).map((project) => (
        <Project key={project.name} project={project} />
      ))}
    </section>
  );
};
