import { ImageFrame } from "@/components/ui/image-frame/ImageFrame";
import { TProjectData } from "@/types";
import Image from "next/image";
import React from "react";

type TProjectProps = {
  project: TProjectData;
};
export const Project = ({ project }: TProjectProps) => {
  return (
    <div>
      <h1 className="text-3xl">{project.name}</h1>
      <div>
        <div className="relative w-80 h-60 border">
          {/* <Image src={project.images[0]} alt={project.name} fill /> */}
          <ImageFrame src={project.images[0]} />
        </div>
      </div>
    </div>
  );
};
