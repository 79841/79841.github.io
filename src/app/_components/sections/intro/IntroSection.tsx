import React from "react";
import { ProfileImage } from "./ProfileImage";
import { IntroPhrase } from "./IntroPhrase";
import { SectionLayout } from "@/components/ui/layout/section";
import { ContactButton, ResumeButton } from "./buttons";

export const IntroSection = () => {
  return (
    <SectionLayout id={"home"}>
      <div className="flex flex-col items-center gap-24">
        <ProfileImage />
        <div className="animate-rising flex flex-col gap-8">
          <IntroPhrase />
          <div className="flex justify-center gap-4">
            <ContactButton />
            <ResumeButton />
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
