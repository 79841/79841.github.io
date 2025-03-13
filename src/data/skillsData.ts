import { TSkillCategory } from "@/types/Skill";

export const skillsData: TSkillCategory[] = [
  {
    name: "Front-End",
    skills: [
      // {
      //   name: "Javascript",
      //   defaultImage: "/images/skills/javascript-original.svg",
      //   proficiency: 100,
      //   proficiencyDetail:
      //     "2018년부터 사용한 사용하여 현재는 능숙하게 사용가능한 언어입니다. ECMA6 레퍼런스를 읽어가며 공부하였고 프론트엔드뿐아니라 여러가지 툴 개발과 백엔드 프로젝트를 진행했기에 가장 자신있는 언어입니다.",
      // },
      {
        name: "Typescript",
        proficiency: 90,
        defaultImage: "/images/skills/typescript-original.svg",
        proficiencyDetail:
          "작년부터 시작한 모든 프로젝트를 TS로 진행하고 있습니다. 스크립트 언어에 익숙해져 처음 TS를 사용하였을때, 많은 부분이 어색하여 이를 해결하기 위해 온라인 챌린지들을 해결하며 실력을 쌓았고 현재 능숙하게 사용가능합니다.",
      },
      {
        name: "React",
        proficiency: 80,
        proficiencyDetail:
          "메인으로 사용하는 JS 라이브러리 입니다. 리액트 관련 디자인패턴과 최적화에 관심이 많고 18버전에서 나온 서버 컴포넌트를 적극 사용중입니다.",
        defaultImage: "/images/skills/react-original.svg",
      },
      {
        name: "Next.js",
        proficiency: 80,
        proficiencyDetail:
          "가장 자신 있고 능숙한 리액트 프레임워크 입니다. 순수 리액트보다 Next를 이용하여 진행한 프로젝트가 더 많을 정도로 자주 사용하고 작년부터 app router를 사용하여 프로젝트를 진행하고 있습니다. SSR과 hydration 등 Next의 동작원리를 이해하고 있고 Image 컴포넌트를 사용한 이미지 최적화와 최근 이슈가 많은 서버 액션에 관심있습니다.",
        defaultImage: "/images/skills/nextjs-original.svg",
        darkModeImage: "/images/skills/nextjs-white.svg",
      },
      {
        name: "Jotai",
        proficiency: 80,
        proficiencyDetail: "",
        defaultImage: "/images/skills/jotai-original.svg",
        darkModeImage: "/images/skills/jotai-original.svg",
      },
      // {
      //   name: "Redux",
      //   proficiency: 70,
      //   proficiencyDetail:
      //     "가장 자주 사용한 상태관리 라이브러리입니다. 최근에 시작한 프로젝트에서는 다른 상태관리 라이브러리로 대체하고 있으나 Context 등을 사용할 때 redux에서 사용하는 패턴인 flux 패턴으로 개발하는 것을 선호합니다.",
      //   defaultImage: "/images/skills/redux-original.svg",
      // },
      // {
      //   name: "Recoil",
      //   proficiency: 70,
      //   proficiencyDetail:
      //     "상태관리를 하기 위해 필요한 코드가 리덕스에 비해 적고 간편하여 사용하게 되었습니다. 특히, 의존성이 있는 상태를 처리할 때 Selector를 유용하게 사용했습니다.",
      //   defaultImage: "/images/skills/recoil-logo.webp",
      // },
      {
        name: "Tanstack Query",
        proficiency: 70,
        proficiencyDetail:
          "Lazy 쿼리 사용시 invalidateQueires가 무시되는 문제를 캐시 타임을 조정하여 해결하면서 전반적인 개념을 깊이 다지게 되었습니다.",
        defaultImage: "/images/skills/tanstack-original.webp",
      },
      // {
      //   name: "Styled Components",
      //   proficiency: 70,
      //   proficiencyDetail:
      //     "JSON 형태로 스타일을 전달하는 inline style의 단점을 해결하기 위해 사용했습니다. CSS in JS이기에 재사용성이 뛰어나고 디자인을 로직에서 분리하는데 용이했으나 SSR 사용시 반짝임 문제(FUOC, 추가 설정으로 해결 가능)와 페이지 성능이 떨어지는 문제, 번들사이즈가 과하게 커지는 문제로 최근들어 사용하지 않고 있습니다.",
      //   defaultImage: "/images/skills/styled-components-logo.webp",
      // },
      {
        name: "Tailwindcss",
        proficiency: 80,
        proficiencyDetail:
          "가장 애용하는 CSS 프레임워크입니다. 공식문서에 나온 것과 같이 zero-runtime으로 빌드시에 CSS를 생성하여 성능이 좋습니다. 다양한 유틸리티를 제공하여 코드 퍼포먼스로 올라가기 때문에 애용하고 있습니다.",
        defaultImage: "/images/skills/tailwindcss-plain.svg",
      },
    ],
  },
  {
    name: "Back-End",
    skills: [
      // {
      //   name: "Node.js",
      //   proficiency: 100,
      //   proficiencyDetail:
      //     "브라우저를 제외한 대부분의 환경에서 Node를 사용했습니다. 순수 JS만 사용하기 보다는 프레임워크와 함께 사용했으며 백엔드의 경우 Express와 Nest를 사용했습니다.",
      //   defaultImage: "/images/skills/nodejs-logo.webp",
      // },
      // {
      //   name: "Express.js",
      //   proficiency: 70,
      //   proficiencyDetail:
      //     "프로젝트에서 개발 파트를 맡을 때 사용했습니다. 주로 RestAPI를 개발할 때 사용했으며 MVC 패턴으로 개발했습니다.",
      //   defaultImage: "/images/skills/express-original.svg",
      //   darkModeImage: "/images/skills/express-white.svg",
      // },
      {
        name: "Nest.js",
        proficiency: 80,
        proficiencyDetail: "",
        defaultImage: "/images/skills/nestjs-plain.svg",
        darkModeImage: "/images/skills/nestjs-plain.svg",
      },
      {
        name: "FastAPI",
        proficiency: 80,
        proficiencyDetail:
          "ML 엔지니어들과 협업하면서 사용하게 된 Python 백엔드 프레임워크 입니다. 백엔드 개발하면서 가장 많이 사용한 프레임워크로 RestAPI, 인증, 웹소켓 등 여러가지 기능을 구현해보았습니다.",
        defaultImage: "/images/skills/fastapi-original.svg",
      },
      // {
      //   name: "Firebase",
      //   proficiency: 40,
      //   proficiencyDetail:
      //     "앱 개발시 백엔드로 사용했습니다. 소셜로그인, DB, Realtime DB 등의 기능을 빠르게 구현하기 위해 사용했습니다.",
      //   defaultImage: "/images/skills/firebase-plain.svg",
      // },
      {
        name: "Mysql",
        proficiency: 80,
        proficiencyDetail:
          "가장 많이 사용한 DB입니다. 해킹 공부를 하면서 익힌 복잡한 쿼리 작성 능력과 개발 프로젝트를 하면서 쌓은 데이터 베이스 설계 능력으로 능숙하게 조작할 수 있습니다.",
        defaultImage: "/images/skills/mysql-original.svg",
      },
      {
        name: "Mongodb",
        proficiency: 60,
        proficiencyDetail:
          "JSON 형태로 데이터를 저장하여 데이터가 다양한 타입을 가질 수 있다는 장점이 매력적으로 느껴져 사용하기 시작했습니다. Atlas로 배포하여 프로젝트와 개인 블로그에 연결하여 사용하고 있고 있습니다.",
        defaultImage: "/images/skills/mongodb-original.svg",
      },
    ],
  },
  {
    name: "App",
    skills: [
      {
        name: "Electron",
        proficiency: 70,
        proficiencyDetail: "",
        defaultImage: "/images/skills/electron-original.ico",
      },
      {
        name: "React Native",
        proficiency: 70,
        proficiencyDetail: "",
        defaultImage: "/images/skills/react-native-original.ico",
      },
      {
        name: "Expo",
        proficiency: 70,
        proficiencyDetail: "",
        defaultImage: "/images/skills/expo-original.ico",
      },
      {
        name: "Flutter",
        proficiency: 70,
        proficiencyDetail:
          "앱 개발을 위해 RN과 Flutter를 고민했으나 React를 지금까지 사용해왔기에 Dart라는 새로운 언어가 궁금해져 사용하게 되었습니다. 덕분에 OOP와 여러 디자인 패턴을 접할 수 있었기에 큰 의미가 있었습니다. 프로젝트 경험은 적으나 그래프와 채팅 기능을 사용한 앱을 개발해보았기 때문에 자신있는 프레임워크입니다.",
        defaultImage: "/images/skills/flutter-original.svg",
      },
    ],
  },
  {
    name: "Deployments",
    skills: [
      // {
      //   name: "Vultr",
      //   proficiency: 40,
      //   proficiencyDetail:
      //     "리눅스 환경에서 코딩하기 위해 서버를 대여하여 사용하고 있습니다. 리눅스 환경에서의 개발이 편한 제게 굉장히 도움이 되고 있습니다.",
      //   defaultImage: "/images/skills/vultr-logo.webp",
      // },
      {
        name: "Github Actions",
        proficiency: 80,
        proficiencyDetail:
          "Vultr로 리눅스 서버를 대여하여 개발하였기 때문에 어디서든 원격으로 붙을 수 있어 Github를 자주 사용하지 않았습니다. 협업하는 프로젝트가 많아지고 프로젝트 크기가 커지면서 원격 서버에서 빌드하고 배포하는데 어려움이 생겨 Github를 제대로 사용하기 시작했습니다. 현재는 프로젝트 뿐아니라 공부 기록을 남겨두기 위해 사용하고 있습니다.",
        defaultImage: "/images/skills/github-original.svg",
      },
      {
        name: "Vercel",
        proficiency: 60,
        proficiencyDetail:
          "테스트 서버 같은 간단한 배포를 위해 자주 사용합니다. 현재 개인 블로그 또한 vercel로 배포하여 사용하고 있습니다.",
        defaultImage: "/images/skills/vercel-logo.webp",
      },
      {
        name: "Docker",
        proficiency: 30,
        proficiencyDetail:
          "과거 웹 해킹 관련 문제를 출제할 때, 간단한 웹 서버를 개발하고 취약점을 심어 Dockerfile로 제공했습니다. 여러 문제가 하나의 플랫폼에서 출제되기에 문제마다 서버의 성능이 떨어져 참가자들이 불편함을 겪을 수 있어 사용한 방식입니다.",
        defaultImage: "/images/skills/docker-plain.svg",
      },
    ],
  },
  {
    name: "Status Management",
    skills: [
      {
        name: "Github",
        proficiency: 80,
        proficiencyDetail:
          "Vultr로 리눅스 서버를 대여하여 개발하였기 때문에 어디서든 원격으로 붙을 수 있어 Github를 자주 사용하지 않았습니다. 협업하는 프로젝트가 많아지고 프로젝트 크기가 커지면서 원격 서버에서 빌드하고 배포하는데 어려움이 생겨 Github를 제대로 사용하기 시작했습니다. 현재는 프로젝트 뿐아니라 공부 기록을 남겨두기 위해 사용하고 있습니다.",
        defaultImage: "/images/skills/github-original.svg",
      },
      {
        name: "Git",
        proficiency: 80,
        proficiencyDetail:
          "협업을 자주하게 되면서 Git을 사용하기 시작했고 현재는 능숙하게 사용가능합니다. 23년부터 시작한 프로젝트는 Git flow를 사용해 branch를 나눠 프로젝트를 관리 및 개발하고 있습니다.",
        defaultImage: "/images/skills/git-original.svg",
      },
    ],
  },
  {
    name: "Communication",
    skills: [
      {
        name: "Jira",
        proficiency: 60,
        proficiencyDetail:
          "Agile 방법론으로 프로젝트를 진행하기 위해 사용한 협업 플랫폼입니다. 스프린트 단위로 기능을 구별하고 이슈단위로 개발을 진행하고 있습니다.",
        defaultImage: "/images/skills/jira-original.svg",
      },
      // {
      //   name: "Confluence",
      //   proficiency: 60,
      //   proficiencyDetail:
      //     "Jira와 함께 프로젝트에 도입하여 프로젝트 페이지로 사용하고 있습니다. 개발 명세나 피쳐 피라미드, 페르소나 같은 문서화를 confluence에서 관리하고 있습니다.",
      //   defaultImage: "/images/skills/confluence-original.svg",
      // },
      // {
      //   name: "Slack",
      //   proficiency: 70,
      //   proficiencyDetail:
      //     "BOB에서 처음으로 협업을 하면서 사용하게된 협업 툴입니다. 간단한 문제상황을 알리거나 의논, 회의 등을 할 때 Slack으로 진행하고 있으며 깃헙이나 폴리 같은 플러그인을 추가하여 협업 효율을 올리고 있습니다.",
      //   defaultImage: "/images/skills/slack-original.svg",
      // },
      // {
      //   name: "Discord",
      //   proficiency: 80,
      //   proficiencyDetail:
      //     "해킹 대회를 참가할때 주로 사용했던 협업 툴입니다. 문제상황을 스레드로 보내주고 보이스로 의논하는 형태로 사용했습니다.",
      //   defaultImage: "/images/skills/discord-logo.ico",
      // },
      // {
      //   name: "Gather",
      //   proficiency: 50,
      //   proficiencyDetail:
      //     "회의에 참여하면 자신만의 캐릭터가 생겨 도트형태의 VR 환경을 제공하는 온라인 회의 플랫폼입니다. 재미를 위해 사용하기 시작했으나 eraser같은 편리한 툴을 제공하여 지금까지 사용하고 있습니다.",
      //   defaultImage: "/images/skills/gather-logo.webp",
      // },
      {
        name: "Figma",
        proficiency: 20,
        proficiencyDetail:
          "디자인을 하거나 다지이너와 협업을 위해 사용했습니다. 간단한 템플릿을 사용하여 디자인을 만들고 플러그인을 통해 코드로 뽑을 수 있어 용이합니다.",
        defaultImage: "/images/skills/figma-original.svg",
      },
    ],
  },
];
