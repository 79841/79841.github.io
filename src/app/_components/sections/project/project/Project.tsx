"use client";
import { TProjectData } from "@/types";
import React from "react";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectImages } from "./ProjectImages";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ProjectGithubLinks } from "./ProjectGithubLinks";

type TProjectProps = {
  project: TProjectData;
};
export const Project = ({ project }: TProjectProps) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col gap-8 opacity-0 sm:w-[40rem]",
        inView && "animate-rising",
      )}
    >
      <div>
        <h1 className="flex items-center border-b pb-2 text-base font-semibold">
          {project.name}
        </h1>
        {project.github && <ProjectGithubLinks links={project.github} />}
      </div>
      <div className="flex flex-col gap-2">
        <ProjectImages inView={inView} images={project.images} />
        <ProjectTechStack techStack={project.techStack} />
      </div>
    </div>
  );
};
