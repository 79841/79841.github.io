"use client";
import { Indicator } from "@/components/indicator";
import { TNavigation } from "@/types/Navigation";
import React, { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

type TSectionLayout = {
  id: string;
  nextSection: TNavigation;
} & PropsWithChildren;
export const SectionLayout = ({
  id,
  children,
  nextSection,
}: TSectionLayout) => {
  const { ref, inView } = useInView();

  return (
    <section
      id={id}
      ref={ref}
      className="relative mb-32 flex min-h-screen w-full flex-col items-center justify-center gap-8"
    >
      <div className="mb-auto h-16"></div>
      {children}
      <div className="sticky bottom-12 mt-auto min-h-16 -translate-y-[2rem]">
        {inView && <Indicator nextSection={nextSection} />}
      </div>
    </section>
  );
};
