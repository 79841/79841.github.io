import { SectionLayout } from "@/components/ui/layout/section";
import { SectionTitle } from "@/components/ui/title";
import React from "react";
import { navigationLinks } from "@/data";
import { ContactForm } from "./contact-form";
import { ScrollRisingBox } from "@/components/animation";

export const ContactSection = () => {
  return (
    <SectionLayout id="contact" nextSection={navigationLinks.home}>
      <div className="pb-24">
        <ScrollRisingBox>
          <SectionTitle title="Contact" />
        </ScrollRisingBox>
      </div>
      <ContactForm />
    </SectionLayout>
  );
};
