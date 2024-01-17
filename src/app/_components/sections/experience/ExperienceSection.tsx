import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import { experiencesData, navigationLinks } from "@/data";
import React from "react";
import { ExperiencesByYear } from "./ExperiencesByYear";
import { ScrollRisingBox } from "@/components/animation";

export const ExperienceSection = () => {
  return (
    <SectionLayout id={"experience"} nextSection={navigationLinks.project}>
      <div className="mb-12">
        <ScrollRisingBox>
          <SectionTitle title="Experience" />
        </ScrollRisingBox>
      </div>
      <div className="flex w-fit flex-col gap-4">
        {Object.entries(experiencesData).map(([year, experiences]) => (
          <ScrollRisingBox key={year}>
            <ExperiencesByYear experiences={experiences} year={year} />
          </ScrollRisingBox>
        ))}
      </div>
    </SectionLayout>
  );
};
