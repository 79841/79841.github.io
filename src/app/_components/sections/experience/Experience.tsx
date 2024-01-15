import { TExperienceData } from "@/types";
import React from "react";

type TExperienceProps = {
  experience: TExperienceData;
};
export const Experience = ({ experience }: TExperienceProps) => {
  return <div>{experience.title}</div>;
};
