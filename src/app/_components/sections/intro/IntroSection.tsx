import React from "react";
import { ProfileImage } from "./ProfileImage";
import { IntroPhrase } from "./IntroPhrase";
import { SectionLayout } from "@/components/ui/layout/section";

export const IntroSection = () => {
  return (
    <SectionLayout>
      <div className="flex flex-col items-center gap-24">
        <ProfileImage />
        <div className="flex flex-col border gap-4">
          <IntroPhrase />
          <div className="flex justify-center">
            <button className="border w-fit p-2">Contact</button>
            <button className="border w-fit p-2">Resume</button>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};
