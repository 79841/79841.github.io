import { SectionTitle } from "@/components/ui/title";
import { projectsData } from "@/data";
import React from "react";
import { Project } from "./Project";

export const ProjectSection = () => {
  return (
    <section className="flex w-full flex-col border">
      <SectionTitle title="Project" />
      <div className="flex flex-col">
        {Object.values(projectsData).map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};
