"use client";
import { cn } from "@/lib/utils";
import { TProjectData } from "@/types";
import { useInView } from "react-intersection-observer";
import { ProjectGithubLinks } from "./ProjectGithubLinks";
import { ProjectImages } from "./ProjectImages";
import { ProjectTechStack } from "./ProjectTechStack";

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
      <div className="flex w-full flex-col gap-2">
        <ProjectImages inView={inView} images={project.images} />
        <ProjectTechStack techStack={project.techStack} />
      </div>
    </div>
  );
};
