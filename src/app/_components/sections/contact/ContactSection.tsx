import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import React from "react";
import { InputBox } from "./InputBox";

export const ContactSection = () => {
  return (
    <SectionLayout>
      <SectionTitle title="Contact" />
      <form className="flex w-1/2 flex-col">
        <InputBox />
        <InputBox />
        <InputBox />
        <textarea className="border" />
      </form>
    </SectionLayout>
  );
};
