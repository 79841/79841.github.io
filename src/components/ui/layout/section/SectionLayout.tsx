import React, { PropsWithChildren } from "react";

type TSectionLayout = {
  id: string;
} & PropsWithChildren;
export const SectionLayout = ({ id, children }: TSectionLayout) => {
  return (
    <section
      id={id}
      className="flex h-screen w-full flex-col justify-center gap-8 border"
    >
      {children}
    </section>
  );
};
