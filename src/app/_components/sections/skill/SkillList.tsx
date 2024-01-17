import { TSkillData } from "@/types";
import Image from "next/image";
import React from "react";

type TSkillListProps = {
  skills: TSkillData[];
};
export const SkillList = ({ skills }: TSkillListProps) => {
  return (
    <div className="flex flex-col gap-6">
      {skills.map((skill) => (
        <div key={skill.name} className="flex items-center gap-2">
          <div className="relative h-4 w-4 overflow-hidden rounded-full">
            <Image
              src={skill.defaultImage}
              alt={skill.name}
              fill
              sizes="40px"
            />
          </div>
          <div>{skill.name}</div>
        </div>
      ))}
    </div>
  );
};
