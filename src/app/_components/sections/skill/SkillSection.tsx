import React from "react";
import { skillsData } from "@/data/skillsData";
import { SkillCategory } from "./SkillCategory";
import { SectionTitle } from "@/components/ui/title";
import { SectionLayout } from "@/components/ui/layout/section";

export const SkillSection = () => {
  return (
    <SectionLayout>
      <SectionTitle title="Skill" />
      <div className="flex gap-4">
        {skillsData.map((skillCategory) => (
          <SkillCategory
            key={skillCategory.name}
            skillCategory={skillCategory}
          />
        ))}
      </div>
    </SectionLayout>
  );
};
