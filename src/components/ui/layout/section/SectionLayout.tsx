import React, { PropsWithChildren } from "react";

type TSectionLayout = PropsWithChildren;
export const SectionLayout = ({ children }: TSectionLayout) => {
  return (
    <section className="h-screen border w-full flex flex-col justify-center gap-8">
      {children}
    </section>
  );
};
