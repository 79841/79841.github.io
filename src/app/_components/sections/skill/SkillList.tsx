import { TSkillData } from "@/types";
import React from "react";

type TSkillListProps = {
  skills: TSkillData[];
};
export const SkillList = ({ skills }: TSkillListProps) => {
  return (
    <div className="flex flex-col">
      {skills.map((skill) => (
        <div key={skill.name}>{skill.name}</div>
      ))}
    </div>
  );
};
