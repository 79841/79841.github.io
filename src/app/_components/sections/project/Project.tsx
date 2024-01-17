"use client";
import { Carousel } from "@/components/carousel";
import { TProjectData } from "@/types";
import React from "react";
import { useInView } from "react-intersection-observer";

type TProjectProps = {
  project: TProjectData;
};
export const Project = ({ project }: TProjectProps) => {
  const [ref, inView] = useInView();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="flex items-center border-b pb-2 text-base">
        {project.name}
      </h1>
      <div className="flex flex-[1] justify-center">
        {project.images.length > 0 ? (
          <div className="h-96" ref={ref}>
            {inView && <Carousel height="20rem" images={project.images} />}
          </div>
        ) : (
          <div>No Images</div>
        )}
      </div>
    </div>
  );
};
