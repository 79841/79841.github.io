import React from "react";

type TSectionTitle = {
  title: string;
};
export const SectionTitle = ({ title }: TSectionTitle) => {
  return <div className="text-3xl font-bold">{title}</div>;
};
