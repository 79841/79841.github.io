/**
 * 포트폴리오의 모든 콘텐츠는 이 파일에서 관리합니다.
 * 문구·이미지 경로·링크를 수정하면 사이트에 그대로 반영됩니다.
 * 데이터 출처: brain vault(40_Areas/커리어/resume3.md)
 *            + 기존 포트폴리오(79841.github.io)의 projectsData·experiencesData·skillsData
 */

export const SITE_URL = "https://79841.github.io";

export interface WorkImage {
  src: string;
  width: number;
  height: number;
}

export interface WorkLink {
  label: string;
  href: string;
}

export interface Work {
  /** 상세 페이지 URL (/work/[slug]) */
  slug: string;
  name: string;
  /** 이름 옆 한 줄 요약 */
  tagline: string;
  /** 기간 — YYYY.MM — YYYY.MM 또는 "YYYY — 현재" */
  period?: string;
  /** 카드 이미지 위 배지 — "운영 중", "5인 팀" */
  badge?: string;
  /** 어두운 스크린샷 — 그 위의 유리 배지·캡션을 다크 유리로 뒤집는다 (대비 확보) */
  dark?: boolean;
  /** 카드 아래 설명 */
  description?: string;
  /** mono 표기 스택 */
  stack: string;
  /** 1장이면 풀블리드, 2장이면 폰 목업 나란히 */
  images: WorkImage[];
  /** 폰 스크린샷 여부 — 프레임 여백·그림자 처리에 사용 */
  phone?: boolean;
  /** true면 전체 폭 카드 */
  wide?: boolean;
  /** 상세 개요의 역할 — 무엇을 맡았는지 한 줄 */
  role: string;
  /** GitHub·라이브 등 외부 링크. 첫 번째가 대표 링크다 */
  links: WorkLink[];
  /* 상세 본문(요점·다이어그램·회고)은 src/content/work/<slug>.mdx에 쓴다 */
}

export interface MoreWork {
  name: string;
  period?: string;
  note: string;
  href?: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface ExperienceEntry {
  /** YYYY.MM — YYYY.MM, 진행 중이면 "현재" */
  period: string;
  org: string;
  role: string;
  /** 성과 한 줄 — /about 상세 타임라인에만 보인다 */
  desc: string;
  /** 키워드 뱃지 — 홈 타임라인은 이것만 보여준다 */
  tags: string[];
  /** 현재 재직 중 — 타임라인에서 채워진 점과 진한 유리 카드 */
  current?: boolean;
}

export interface Award {
  /** YYYY.MM */
  date: string;
  name: string;
  org: string;
}

export interface Stat {
  label: string;
  value: string;
  note: string;
}

export const profile = {
  name: "명인지",
  nameEn: "Myeong Inji",
  role: "Software Developer · Seoul",
  email: "79841@naver.com",
  github: "https://github.com/79841",
  githubLabel: "github.com/79841",
  resumeHref: "/docs/명인지_이력서.pdf",
  /** 히어로 한 줄 — 짧은 영어 단어 셋 */
  headline: "Simple. Fast. Precise.",
  summary:
    "실시간 데이터 시각화와 렌더링 성능 개선을 주로 다루는 소프트웨어 개발자입니다. 지금은 새솔테크에서 Electron·React 데스크톱 앱과 Next.js 서비스를 만들고 있습니다.",
  /** /about 머리 */
  aboutHeadline: "보안에서 소프트웨어 개발로.",
  aboutSummary:
    "보안 진단 5년을 거쳐 2024년부터 소프트웨어를 만듭니다. 렌더링 성능과 실시간 데이터 시각화를 주로 다룹니다.",
  location: "Seoul, Korea",
} as const;

/** 스크린샷이 있는 대표 작업 — 배열에 추가하면 카드와 상세 페이지가 늘어납니다 */
export const works: Work[] = [
  {
    slug: "argus",
    name: "Argus",
    tagline: "AI 코딩 에이전트의 비용과 토큰 사용량을 프로젝트별로 추적하는 데스크톱 모니터링 앱",
    period: "2025 — 현재",
    badge: "운영 중",
    description:
      "AI 코딩 에이전트의 비용과 토큰 사용량을 추적하는 데스크톱 앱. OTLP 수집 서버부터 Electron 트레이 앱까지 직접 만들었습니다.",
    stack: "Next.js 15 · Electron · OpenTelemetry · SQLite · Recharts",
    images: [{ src: "/work/argus.webp", width: 1280, height: 900 }],
    wide: true,
    dark: true,
    role: "수집 서버, 트레이 앱, 릴리즈 자동화까지 직접 구현",
    links: [
      { label: "GitHub", href: "https://github.com/79841/argus" },
    ],
  },
  {
    slug: "malgoum",
    name: "Malgoum",
    tagline: "검색, 즐겨찾기, 시간대별 예보를 갖춘 날씨 앱",
    period: "2026",
    badge: "라이브",
    description:
      "검색, 즐겨찾기, 시간대별 예보를 갖춘 날씨 앱. Vercel에서 운영 중입니다.",
    stack: "React · Vite · TypeScript · Jotai · TanStack Query",
    images: [{ src: "/work/malgoum.webp", width: 1280, height: 800 }],
    role: "설계부터 배포까지 혼자 개발",
    links: [
      { label: "라이브", href: "https://malgoum.vercel.app" },
      { label: "GitHub", href: "https://github.com/79841/Malgoum" },
    ],
  },
  {
    slug: "letsdo",
    name: "Let'sdo",
    tagline: "척수 장애인을 위한 건강관리 앱. 사용자 앱과 관리자 앱, 백엔드까지 혼자 개발했습니다.",
    period: "2023.06 — 2023.10",
    badge: "1인 풀스택",
    description:
      "척수 장애인 건강관리 앱. 사용자 앱, 관리자 앱, 백엔드를 혼자 개발했습니다.",
    stack: "Flutter · FastAPI · MySQL · Redis · WebSocket",
    images: [
      { src: "/work/letsdo1.webp", width: 483, height: 804 },
      { src: "/work/letsdo2.webp", width: 484, height: 808 },
    ],
    phone: true,
    role: "사용자 앱, 관리자 앱, API 서버를 혼자 개발",
    links: [
      { label: "앱 GitHub", href: "https://github.com/79841/letsdo-app" },
      { label: "관리자 앱", href: "https://github.com/79841/letsdo-admin-app" },
      { label: "API 서버", href: "https://github.com/79841/letsdo-back" },
    ],
  },
  {
    slug: "chusinsa",
    name: "Chusinsa",
    tagline: "체형 정보로 의류를 추천하는 쇼핑몰. 프론트엔드와 백엔드를 맡았습니다.",
    period: "2022.04 — 2022.11",
    badge: "5인 팀",
    description:
      "체형 정보로 의류를 추천하는 쇼핑몰. 프론트엔드와 백엔드를 맡았습니다.",
    stack: "Next.js · Recoil · FastAPI · MySQL",
    images: [{ src: "/work/chusinsa.webp", width: 1600, height: 1030 }],
    role: "5인 팀에서 프론트엔드와 백엔드 전반",
    links: [
      { label: "GitHub", href: "https://github.com/79841/chusinsa-front" },
    ],
  },
];

/** 텍스트 행으로 쌓이는 나머지 작업 — 확장은 여기에 한 줄씩 */
export const moreWorks: MoreWork[] = [
  {
    name: "Travel Docent",
    period: "개발 중",
    note: "위치 기반 여행 안내 앱 · React Native · NestJS",
  },
  {
    name: "Dream Share",
    period: "2023",
    note: "꿈 일기 공유 앱 · 3인 협업 · Next.js · Flutter · Spring Boot",
    href: "https://github.com/Dream-share",
  },
  {
    name: "Portfolio",
    period: "2023 —",
    note: "이 사이트 · Lighthouse 98 · LCP < 2s",
    href: "https://github.com/79841/79841.github.io",
  },
  {
    name: "Metflix",
    period: "2022",
    note: "TMDB 기반 영화 웹 · HTML · CSS · JavaScript",
    href: "https://github.com/79841/metflix",
  },
];

export const stackGroups: StackGroup[] = [
  {
    label: "FRONT-END",
    items: ["TypeScript", "React", "Next.js", "Jotai", "TanStack Query", "Tailwind CSS", "Recharts"],
  },
  { label: "APP", items: ["React Native", "Expo", "Electron", "Flutter"] },
  { label: "BACK-END", items: ["NestJS", "FastAPI", "PostgreSQL", "Prisma"] },
  { label: "TESTING", items: ["Jest", "React Testing Library", "MSW", "TDD"] },
  { label: "DEVOPS", items: ["GitHub Actions", "Docker", "GCP Cloud Run", "OpenTelemetry"] },
  {
    label: "AI TOOLING",
    items: ["Claude Code", "Cursor", "MCP 서버 개발", "Spec-Driven Development"],
  },
];

/** 연도 역순 경력 — 수상은 awards로 분리한다 */
export const experiences: ExperienceEntry[] = [
  {
    period: "2024.02 — 현재",
    org: "새솔테크",
    role: "Software Developer",
    desc: "Electron·React 자동화 테스트 데스크톱 앱, Next.js 권한 관리 플랫폼, 사내 인증 서비스 개발·운영",
    tags: ["Electron", "React", "Next.js", "NestJS", "성능 최적화"],
    current: true,
  },
  {
    period: "2023.03 — 현재",
    org: "비욘드 코딩",
    role: "Programming Instructor",
    desc: "HTML·CSS·JavaScript·Python 커리큘럼 개발·강의",
    tags: ["JavaScript", "Python", "커리큘럼 개발"],
  },
  {
    period: "2022.04 — 2022.06",
    org: "토스페이먼츠",
    role: "Security Engineer",
    desc: "웹 애플리케이션 취약점 진단, 보안 리스크 평가",
    tags: ["웹 취약점 진단", "리스크 평가"],
  },
  {
    period: "2018.08 — 2020.05",
    org: "공군 사이버 작전센터",
    role: "체계 개발 · 취약점 분석",
    desc: "사이버 방호 체계 개발, 취약점 분석 (군 복무)",
    tags: ["사이버 방호", "취약점 분석"],
  },
  {
    period: "2017.06 — 2018.02",
    org: "Best of the Best 7기",
    role: "차세대 보안리더 양성프로그램",
    desc: "취약점 분석 과정 수료, 시큐리티짐 프로젝트 웹 보안·시스템 분석",
    tags: ["웹 보안", "시스템 최적화", "네트워크 분석"],
  },
];

/** 수상 — 타임라인 아래 한 줄 칩으로 */
export const awards: Award[] = [
  { date: "2021.12", name: "FIESTA 금융보안 위협분석 대회 3위", org: "금융보안원" },
  { date: "2020.12", name: "FIESTA 금융보안 위협분석 대회 우승", org: "금융보안원" },
  { date: "2020.01", name: "네이버 버그바운티 명예의전당", org: "NAVER" },
  { date: "2019.11", name: "사이버공격방어대회 CCE 기관팀 3위", org: "국가정보원" },
];

/** /about 상단 요약 숫자 — 경력 연차와 프로젝트 수 */
export const stats: Stat[] = [
  { label: "DEVELOPMENT", value: "2년+", note: "2024.02 — 현재" },
  { label: "SECURITY", value: "5년", note: "2017 — 2022" },
  { label: "PROJECTS", value: "8", note: "운영 중 2" },
];
