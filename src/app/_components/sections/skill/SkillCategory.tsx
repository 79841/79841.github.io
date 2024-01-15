import React from "react";
import { TSkillCategory } from "@/types/Skill";
import { SkillList } from "./SkillList";

type TSkillCategoryProps = {
  skillCategory: TSkillCategory;
};
export const SkillCategory = ({ skillCategory }: TSkillCategoryProps) => {
  return (
    <div key={skillCategory.name} className="p-4 border">
      <div className="text-xl">{skillCategory.name}</div>
      <SkillList skills={skillCategory.skills} />
    </div>
  );
};
