import React from "react";
import { TSkillCategory } from "@/types/Skill";
import { SkillList } from "./SkillList";

type TSkillCategoryProps = {
  skillCategory: TSkillCategory;
};
export const SkillCategory = ({ skillCategory }: TSkillCategoryProps) => {
  return (
    <div className="flex h-fit flex-col gap-2 rounded-lg p-6">
      <div className="mb-2 border-b pb-2 text-base font-[500]">
        {skillCategory.name}
      </div>
      <div key={skillCategory.name} className="rounded-lg">
        <SkillList skills={skillCategory.skills} />
      </div>
    </div>
  );
};
