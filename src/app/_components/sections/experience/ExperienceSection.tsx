import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import { experiencesData } from "@/data";
import React from "react";
import { ExperiencesByYear } from "./ExperiencesByYear";

export const ExperienceSection = () => {
  return (
    <SectionLayout>
      <SectionTitle title="Experience" />
      <div className="flex flex-col gap-4">
        {Object.entries(experiencesData).map(([year, experiences]) => (
          <ExperiencesByYear key={year} experiences={experiences} year={year} />
        ))}
      </div>
    </SectionLayout>
  );
};
