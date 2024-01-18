import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import React from "react";
import { InputBox } from "./InputBox";
import { navigationLinks } from "@/data";

export const ContactSection = () => {
  return (
    <SectionLayout id="contact" nextSection={navigationLinks.home}>
      <div className="pb-24">
        <SectionTitle title="Contact" />
      </div>
      <form className="flex w-1/2 flex-col gap-4">
        <InputBox placeholder="Name" className="focus:outline-none" />
        <InputBox placeholder="Email" />
        <textarea
          className="h-60 rounded-xl border p-4 focus:outline-none"
          placeholder="Content..."
        />
      </form>
    </SectionLayout>
  );
};
