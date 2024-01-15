export type TSkillData = {
  name: string;
  proficiency: number;
  proficiencyDetail: string;
  defaultImage: string;
  darkModeImage?: string;
};

export type TSkillCategory = {
  name: string;
  skills: TSkillData[];
};
