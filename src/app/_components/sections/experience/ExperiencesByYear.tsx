import { TExperienceData } from "@/types";
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
    <div className="flex gap-5 pl-4 sm:p-4">
      <div className="flex w-12 min-w-12 items-center justify-start font-bold sm:w-24 sm:justify-center">
        {year}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {experiences.map((experience) => (
          <Experience key={experience.title} experience={experience} />
        ))}
      </div>
    </div>
  );
};
