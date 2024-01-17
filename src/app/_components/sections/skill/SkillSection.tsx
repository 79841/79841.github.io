import React from "react";
import { SkillCategory } from "./SkillCategory";
import { SectionTitle } from "@/components/ui/title";
import { SectionLayout } from "@/components/ui/layout/section";
import { navigationLinks, skillsData } from "@/data";
import { ScrollRisingBox } from "@/components/animation";

export const SkillSection = () => {
  return (
    <SectionLayout id={"skill"} nextSection={navigationLinks.experience}>
      <div className="mb-12">
        <ScrollRisingBox>
          <SectionTitle title="Skill" />
        </ScrollRisingBox>
      </div>
      <div className="flex w-full flex-col flex-wrap justify-center gap-12 sm:flex-row">
        <div className="flex flex-col sm:gap-8">
          <ScrollRisingBox>
            <SkillCategory skillCategory={skillsData[0]} />
          </ScrollRisingBox>
          <ScrollRisingBox>
            <SkillCategory skillCategory={skillsData[2]} />
          </ScrollRisingBox>
        </div>
        <div className="flex flex-col sm:gap-8">
          <ScrollRisingBox>
            <SkillCategory skillCategory={skillsData[1]} />
          </ScrollRisingBox>
          <ScrollRisingBox>
            <SkillCategory skillCategory={skillsData[4]} />
          </ScrollRisingBox>
        </div>
        <div className="flex flex-col sm:gap-8">
          <ScrollRisingBox>
            <SkillCategory skillCategory={skillsData[3]} />
          </ScrollRisingBox>

          <ScrollRisingBox>
            <SkillCategory skillCategory={skillsData[5]} />
          </ScrollRisingBox>
        </div>

        {/* {skillsData.map((skillCategory) => (
          <ScrollRisingBox key={skillCategory.name}>
            <SkillCategory skillCategory={skillCategory} />
          </ScrollRisingBox>
        ))} */}
      </div>
    </SectionLayout>
  );
};
