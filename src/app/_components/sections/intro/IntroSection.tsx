"use client";
import React from "react";
import { ProfileImage } from "./ProfileImage";
import { IntroPhrase } from "./IntroPhrase";
import { SectionLayout } from "@/components/ui/layout/section";
import { ContactButton, ResumeButton } from "./buttons";
import { navigationLinks } from "@/data";

export const IntroSection = () => {
  return (
    <SectionLayout id={"home"} nextSection={navigationLinks.skill}>
      <div className="flex flex-col items-center gap-24">
        <ProfileImage />
        <div className="flex animate-rising flex-col gap-8">
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
