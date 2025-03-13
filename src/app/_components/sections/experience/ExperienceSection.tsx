import { ScrollRisingBox } from "@/components/animation";
import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import { experiencesData, navigationLinks } from "@/data";
import { ExperiencesByYear } from "./ExperiencesByYear";

export const ExperienceSection = () => {
  return (
    <SectionLayout id={"experience"} nextSection={navigationLinks.project}>
      <div className="mb-12">
        <ScrollRisingBox>
          <SectionTitle title="Experience" />
        </ScrollRisingBox>
      </div>
      <div className="flex w-full flex-col items-start gap-4 sm:w-fit">
        {Object.entries(experiencesData).reverse().map(([year, experiences]) => (
          <ScrollRisingBox key={year}>
            <ExperiencesByYear experiences={experiences} year={year} />
          </ScrollRisingBox>
        ))}
      </div>
    </SectionLayout>
  );
};
