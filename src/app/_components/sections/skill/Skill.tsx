import { TSkillData } from "@/types";
import React from "react";

type TSkillProps = {
  skill: TSkillData;
};
export const Skill = ({ skill }: TSkillProps) => {
  return <div>{skill.name}</div>;
};
