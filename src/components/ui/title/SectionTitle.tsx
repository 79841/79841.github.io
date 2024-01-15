import React from "react";

type TSectionTitle = {
  title: string;
};
export const SectionTitle = ({ title }: TSectionTitle) => {
  return <div className="text-4xl">{title}</div>;
};
