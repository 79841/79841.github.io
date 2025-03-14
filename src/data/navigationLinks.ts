import { TNavigation } from "@/types/Navigation";

export const navigationLinks: Record<string, TNavigation> = {
  home: { name: "Home", path: "/#home" },
  skill: { name: "Skill", path: "/#skill" },
  experience: { name: "Experience", path: "/#experience" },
  project: { name: "Project", path: "/#project" },
  contact: { name: "Contact", path: "/#contact" },
  typingPractice: {
    name: "Typing",
    path: "/typing-practice",
    isSpecial: true,
  },
};
