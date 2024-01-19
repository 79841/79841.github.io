import { TProjectData } from "@/types/Project";

export const projectsData: Record<string, TProjectData> = {
  chusinsa: {
    name: "Chusinsa",
    link: "/projects/chusinsa",
    description:
      "사용자의 성별, 키, 몸무게 정보를 이용하여 의류를 추천하는 웹 애플리케이션",
    content:
      "현재 존재하는 온라인 의류 쇼핑몰은 구매 이력, 상품 클릭 여부, 나이 등을 종합하여 개인에게 의류를 추천해 주는 쇼핑몰 입니다. 5명이서 진행한 프로젝트로 전반적인 프론트엔드와 백엔드의 전반적인 개발을 맡았습니다. 처리하는 데이터양이 방대하여 데이터베이스를 설계할때 정규화에 집중했습니다. 열정적인 팀원들과 함께 개발하며 협업의 재미를 느낄 수 있었던 프로젝트입니다.",
    techStack: ["Next.js", "Recoil", "Bootstrap", "Sass", "FastAPI", "Mysql"],
    date: "2022.04. ~ 2022.11.",
    images: [
      "/images/projects/chusinsa/chusinsa_1.avif",
      "/images/projects/chusinsa/chusinsa_2.avif",
      "/images/projects/chusinsa/chusinsa_3.avif",
    ],
    github: ["https://github.com/79841/chusinsa-front"],
  },
  letsdo: {
    name: "Let'sdo",
    link: "/projects/letsdo",
    description: "척수 장애인을 위한 건강관리 앱",
    content:
      "척수 장애인들에게 건강 관리를 위한 프로젝트를 제공하고 간편하게 상담할 수 있는 모바일 앱입니다. 사용자용과 관리자용으로 두가지 앱을 개발하고 백엔드까지 개발한 1인 프로젝트입니다. 사용자들의 과제 수행도를 확인하기 위한 대시보드와 상담을 위한 실시간 채팅 기능을 만들었습니다. 처음으로 진행한 플러터 프로젝트이면서 웹 소켓을 이용한 채팅 프로그램에 깊은 이해를 갖게 되어 의미가 있습니다.",
    techStack: [
      "Flutter",
      "Syncfusion flutter charts",
      "Web socket channel",
      "FastAPI",
      "Mysql",
      "Redis",
    ],
    date: "2023.06. ~ 2023.10.",
    images: [
      "/images/projects/letsdo/letsdo_1.avif",
      "/images/projects/letsdo/letsdo_2.avif",
      "/images/projects/letsdo/letsdo_3.avif",
      "/images/projects/letsdo/letsdo_4.avif",
      "/images/projects/letsdo/letsdo_5.avif",
      "/images/projects/letsdo/letsdo_6.avif",
      "/images/projects/letsdo/letsdo_7.avif",
    ],
    github: [
      "https://github.com/79841/letsdo-app",
      "https://github.com/79841/letsdo-admin-app",
      "https://github.com/79841/letsdo-back",
    ],
  },
  metflix: {
    name: "Metflix",
    link: "/",
    description: "TMDB를 사용한 나만의 영화 웹 사이트",
    content: "",
    techStack: ["HTML", "CSS", "Javascript"],
    date: "",
    images: [
      "/images/projects/metflix/metflix-1.png",
      "/images/projects/metflix/metflix-2.png",
      "/images/projects/metflix/metflix-3.png",
    ],
    github: [],
  },
  portfolio: {
    name: "Portfolio",
    link: "/projects/portfolio",
    description: "포트폴리오 사이트",
    content:
      "직접 개발한 포트폴리오 사이트 입니다. Nextjs14 app router과 shacn을 이용하여 개발하였습니다. shadcn을 처음 사용한 프로젝트이면서 opengraph에 대해 이해할 수 있었던 의미있는 프로젝트입니다. 깃허브 페이지로 배포하고 있고 지속적으로 기능을 추가할 계획입니다.",
    techStack: ["Next.js14", "Tailwindcss", "Shadcn"],
    date: "2023.12.",
    images: [
      "/images/projects/portfolio/portfolio-light.avif",
      "/images/projects/portfolio/portfolio-experience.avif",
      "/images/projects/portfolio/portfolio-dark.avif",
      "/images/projects/portfolio/portfolio-skill.avif",
    ],
    github: ["https://github.com/79841/portfolio"],
  },
  securityGym: {
    name: "Security Gym",
    link: "/projects/security-gym",
    description: "침해사고가 발생했을 시 즉각적인 대응을 위한 훈련 시스템",
    content:
      "기업에 침해사고 발생시 즉각적인 대응(Incident Response)을 위한 시스템입니다. BoB에서 진행한 5인 프로젝트로 시스템 구축과 포렌식을 맡아서 했습니다. 처음 진행한 협업 프로젝트이기에 의미가 큽니다. PHP와 Flask를 이용하여 서버를 개발했고 Docker와 VMware로 가상환경을 구현했습니다.",
    images: [],
    techStack: ["Python", "PHP", "Flask", "Mysql", "Docker", "VMware"],
    date: "2017.09. ~ 2017.12.",
  },
  dreamShare: {
    name: "Dream Share",
    link: "/projects/dream-share",
    description: "서로의 꿈을 공유하는 앱입니다.",
    content:
      "꿈 일기를 작성하고 공유하는 앱입니다. 현재 개발 중인 3인 프로젝트로 웹과 앱 개발을 동시에 진행하고 있습니다. 프론트엔드와 앱 개발을 맡고 있으며 백엔드는 코드리뷰로 참여하고 있고 Jira와 Slack을 통해 협업하고 있으면 Agile 방법론으로 개발하고 있습니다. 프로젝트 초기부터 체계적으로 설계한 프로젝트이고 Slack과 코드리뷰를 통해 적극적인 협업 중인 프로젝트이기에 의미가 큽니다. 또한 카카오와 구글 등의 소셜로그인을 구현하면서 OAuth와 OIDC에 대한 개념을 다질 수 있었습니다.",
    techStack: [
      "Next.js",
      "Recoil",
      "Tanstack-query",
      "Styled components",
      "Flutter",
      "Spring Boot",
      "Mysql",
    ],
    images: [],
    date: "2023.10. ~ 진행중",
    github: ["https://github.com/Dream-share"],
  },
};
