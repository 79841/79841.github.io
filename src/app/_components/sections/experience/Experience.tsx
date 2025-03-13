import { TExperienceData } from "@/types";

type TExperienceProps = {
  experience: TExperienceData;
};
export const Experience = ({ experience }: TExperienceProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="overflow-hidden whitespace-normal break-keep">
        {experience.title}
      </div>
      <div className="text-xs text-zinc-600">
        {experience.content?.map((content) => (
          <div key={content}>{content}</div>
        ))}
      </div>
    </div>
  );
};
