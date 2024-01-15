import { TExperienceData } from "@/types";
import React from "react";
import { Experience } from "./Experience";

type TExperiencesByYear = {
  year: string;
  experiences: TExperienceData[];
};
export const ExperiencesByYear = ({
  year,
  experiences,
}: TExperiencesByYear) => {
  return (
    <div className="flex border gap-4 p-4">
      <div className="w-24 flex items-center justify-center">{year}</div>
      <div className="flex flex-col gap-2">
        {experiences.map((experience) => (
          <Experience key={experience.title} experience={experience} />
        ))}
      </div>
    </div>
  );
};
