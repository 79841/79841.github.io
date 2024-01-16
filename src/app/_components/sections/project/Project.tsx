import { Carousel } from "@/components/carousel";
import { TProjectData } from "@/types";
import React from "react";

type TProjectProps = {
  project: TProjectData;
};
export const Project = ({ project }: TProjectProps) => {
  return (
    <div>
      <h1 className="text-xl">{project.name}</h1>

      <div className="border">
        {project.images.length > 0 ? (
          <Carousel height="20rem" images={project.images} />
        ) : (
          <div>No Images</div>
        )}
      </div>
    </div>
  );
};
