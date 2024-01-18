import React from "react";

type TProjectTechStackProps = {
  techStack: string[];
};
export const ProjectTechStack = ({ techStack }: TProjectTechStackProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((tech) => (
        <div
          key={tech}
          className="rounded-xl border p-1 px-2 text-xs text-zinc-500"
        >
          {tech}
        </div>
      ))}
    </div>
  );
};
