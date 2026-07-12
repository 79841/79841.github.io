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

export interface WorkDetailSection {
  heading: string;
  body: string;
}

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkDetail {
  /** 문제 → 설계 → 결과 순의 본문 섹션 */
  sections: WorkDetailSection[];
  /** 갤러리 이미지 (듀오톤 적용) */
  gallery: WorkImage[];
  /** GitHub·라이브 등 외부 링크 */
  links: WorkLink[];
}

export interface Work {
  /** 상세 페이지 URL (/work/[slug]) */
  slug: string;
  name: string;
  /** 이름 옆 한 줄 요약 */
  tagline: string;
  /** 기간 */
  period?: string;
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
  detail: WorkDetail;
}

export interface MoreWork {
  name: string;
  period?: string;
  note: string;
  href?: string;
}

export interface StackGroup {
  label: string;
  items: string;
}

export interface ExperienceEntry {
  period: string;
  org: string;
  role: string;
  desc: string;
}

export const profile = {
  name: "명인지",
  nameEn: "Myeong Inji",
  role: "FRONT-END DEVELOPER · SEOUL",
  email: "79841@naver.com",
  github: "https://github.com/79841",
  githubLabel: "github.com/79841",
  resumeHref: "/docs/명인지_이력서.pdf",
  thesis: ["복잡한 문제를 단순한 구조로.", "성능은 숫자로, 화면은 손끝으로."],
  summary:
    "실시간 데이터 시각화와 렌더링 최적화를 다루는 프론트엔드 개발자. 반복은 AI 에이전트에게 맡기고, 아낀 시간을 마지막 픽셀에 씁니다.",
} as const;

/** 스크린샷이 있는 대표 작업 — 배열에 추가하면 카드와 상세 페이지가 늘어납니다 */
export const works: Work[] = [
  {
    slug: "argus",
    name: "Argus",
    tagline: "AI 코딩 에이전트 모니터링 — 릴리즈 운영 중",
    period: "2025 —",
    description:
      "복수 AI 에이전트의 비용·토큰·세션을 통합 추적할 수단이 없어 직접 만들었습니다. OTLP 텔레메트리 인제스트부터 Electron 트레이 앱 릴리즈까지.",
    stack: "Next.js 15 · Electron · OpenTelemetry · SQLite · Recharts",
    images: [{ src: "/work/argus.webp", width: 1280, height: 900 }],
    wide: true,
    detail: {
      sections: [
        {
          heading: "문제",
          body: "Claude Code, Codex, Gemini CLI — 매일 쓰는 AI 코딩 에이전트가 늘어날수록 비용과 토큰 사용량은 블랙박스가 됐습니다. 프로젝트별로 얼마를 쓰는지, 어떤 프롬프트 전략이 토큰을 아끼는지 정량적으로 알 수 없었습니다.",
        },
        {
          heading: "설계",
          body: "Next.js API Route로 OTLP 인제스트 엔드포인트(/v1/logs)를 열고 에이전트별 자동 태깅·파싱을 붙였습니다. 저장은 SQLite WAL 모드(agent_logs · pricing_model · config_snapshots), 시각화는 Recharts 대시보드, 상주는 Electron 트레이 앱 — 백그라운드에서 OTLP를 수신하며 macOS/Windows를 모두 지원합니다. CLAUDE.md와 .mcp.json 같은 에이전트 설정도 프로젝트 표준에 포함시켰습니다.",
        },
        {
          heading: "결과",
          body: "프로젝트별 에이전트 비용을 정량 추적해 도구 선택의 근거로 쓰고 있고, 텔레메트리 분석으로 프롬프트 전략과 토큰 효율을 개선했습니다. GitHub Actions로 릴리즈를 자동화해 크로스 플랫폼 데스크톱 앱으로 운영 중입니다.",
        },
      ],
      gallery: [],
      links: [
        { label: "GitHub ↗", href: "https://github.com/79841/argus" },
      ],
    },
  },
  {
    slug: "malgoum",
    name: "Malgoum",
    tagline: "Simple. Smart. Weather. · 라이브",
    period: "2026",
    description:
      "검색·즐겨찾기·시간대별 예보를 담은 날씨 앱. 불필요한 것을 덜어낸 인터페이스로 Vercel에서 운영 중입니다.",
    stack: "Next.js · TypeScript · Vercel",
    images: [{ src: "/work/malgoum.webp", width: 1280, height: 800 }],
    detail: {
      sections: [
        {
          heading: "개요",
          body: "날씨 앱은 넘치지만 대부분 광고와 정보 과잉으로 무겁습니다. Malgoum은 반대로 갑니다 — 지금 필요한 날씨 하나를 가장 빠르고 깨끗하게. 검색, 즐겨찾기, 시간대별 예보만 남기고 전부 덜어냈습니다.",
        },
        {
          heading: "만듦새",
          body: "Next.js와 TypeScript로 만들어 Vercel에서 운영합니다. 위치 검색과 예보 데이터 캐싱, 반응형 레이아웃까지 — 작지만 프로덕션 품질로 유지하는 것이 목표입니다.",
        },
      ],
      gallery: [],
      links: [
        { label: "라이브 ↗", href: "https://malgoum.vercel.app" },
        { label: "GitHub ↗", href: "https://github.com/79841/Malgoum" },
      ],
    },
  },
  {
    slug: "letsdo",
    name: "Let'sdo",
    tagline: "척수 장애인 건강관리 앱 · 1인 풀스택",
    period: "2023.06 — 2023.10",
    description:
      "사용자용·관리자용 두 앱과 백엔드까지 혼자 개발했습니다. 과제 수행도 대시보드와 WebSocket 실시간 상담 채팅이 핵심.",
    stack: "Flutter · FastAPI · MySQL · Redis · WebSocket",
    images: [
      { src: "/work/letsdo1.webp", width: 483, height: 804 },
      { src: "/work/letsdo2.webp", width: 484, height: 808 },
    ],
    phone: true,
    detail: {
      sections: [
        {
          heading: "문제",
          body: "척수 장애인은 꾸준한 건강 관리 과제와 전문가 상담이 필요하지만, 이를 하나의 흐름으로 묶어주는 도구가 없었습니다. 사용자와 관리자(상담사)가 같은 데이터를 서로 다른 화면으로 봐야 하는 것도 과제였습니다.",
        },
        {
          heading: "설계",
          body: "사용자용 앱과 관리자용 앱 두 개를 Flutter로, 백엔드를 FastAPI + MySQL + Redis로 — 셋 다 혼자 개발했습니다. 과제 수행도를 한눈에 보는 대시보드와 WebSocket 기반 실시간 상담 채팅이 핵심 기능입니다.",
        },
        {
          heading: "배움",
          body: "첫 Flutter 프로젝트이자 WebSocket 실시간 통신을 깊게 이해하게 된 작업입니다. 사용자·관리자·서버 세 방향의 상태를 동기화하며 실시간 시스템의 상태 설계를 몸으로 배웠습니다.",
        },
      ],
      gallery: [
        { src: "/work/letsdo-g1.webp", width: 483, height: 805 },
        { src: "/work/letsdo-g2.webp", width: 482, height: 802 },
        { src: "/work/letsdo-g4.webp", width: 484, height: 806 },
        { src: "/work/letsdo-g6.webp", width: 484, height: 802 },
        { src: "/work/letsdo-g7.webp", width: 485, height: 807 },
      ],
      links: [
        { label: "앱 GitHub ↗", href: "https://github.com/79841/letsdo-app" },
        { label: "관리자 앱 ↗", href: "https://github.com/79841/letsdo-admin-app" },
        { label: "백엔드 ↗", href: "https://github.com/79841/letsdo-back" },
      ],
    },
  },
  {
    slug: "chusinsa",
    name: "Chusinsa",
    tagline: "체형 기반 의류 추천 커머스 · 5인 팀",
    period: "2022.04 — 2022.11",
    description:
      "성별·키·몸무게로 의류를 추천하는 쇼핑몰. 프론트엔드와 백엔드 전반을 맡았고, 방대한 상품 데이터를 다루며 데이터베이스 정규화에 집중했습니다.",
    stack: "Next.js · Recoil · FastAPI · MySQL",
    images: [{ src: "/work/chusinsa.webp", width: 1600, height: 1030 }],
    detail: {
      sections: [
        {
          heading: "문제",
          body: "기존 쇼핑몰의 추천은 구매 이력과 클릭 기반이라 신규 사용자에게 무력합니다. 성별·키·몸무게라는 명시적 신체 정보로 첫 방문부터 맞는 옷을 추천하는 것이 목표였습니다.",
        },
        {
          heading: "설계",
          body: "5인 팀에서 프론트엔드(Next.js + Recoil)와 백엔드(FastAPI + MySQL) 전반을 맡았습니다. 상품 데이터 규모가 커서 데이터베이스 정규화에 특히 집중했고, 카테고리·사이즈·가격 필터가 얽히는 검색 화면의 상태 관리를 설계했습니다.",
        },
        {
          heading: "배움",
          body: "열정적인 팀원들과 함께한 첫 규모 있는 협업 프로젝트입니다. 화면과 데이터 모델이 서로를 어떻게 제약하는지 — 풀스택 관점의 기초를 여기서 다졌습니다.",
        },
      ],
      gallery: [
        { src: "/work/chusinsa-2.webp", width: 1600, height: 1023 },
        { src: "/work/chusinsa-3.webp", width: 1600, height: 1006 },
        { src: "/work/chusinsa-arch.avif", width: 2278, height: 1062 },
      ],
      links: [
        { label: "GitHub ↗", href: "https://github.com/79841/chusinsa-front" },
      ],
    },
  },
];

/** 텍스트 행으로 쌓이는 나머지 작업 — 확장은 여기에 한 줄씩 */
export const moreWorks: MoreWork[] = [
  {
    name: "Travel Docent",
    period: "개발 중",
    note: "위치·관심사 기반 AI 여행 도슨트 앱 — RN 0.79 · Expo 53 · NestJS · 6-role 에이전트 오케스트레이션 · SDD · 테스트 커버리지 Service 100%",
  },
  {
    name: "Dream Share",
    period: "2023.10 —",
    note: "꿈 일기 공유 앱, 3인 협업 — Next.js · Flutter · Spring Boot · OAuth/OIDC 소셜 로그인 · Jira 애자일",
    href: "https://github.com/Dream-share",
  },
  {
    name: "Metflix",
    period: "2022",
    note: "TMDB 기반 영화 웹 — HTML · CSS · JavaScript · 반응형, 웹의 기본기를 다진 초기작",
    href: "https://github.com/79841/metflix",
  },
  {
    name: "Portfolio",
    period: "2023 —",
    note: "이 사이트 — Lighthouse 98 · 번들 2MB → 200KB · 이미지 로딩 500ms → 100ms · LCP < 2s",
    href: "https://github.com/79841/79841.github.io",
  },
];

export const aboutParagraphs: string[] = [
  "보안에서 시작했습니다. 토스페이먼츠에서 취약점을 분석했고, BoB와 대회들(Fiesta 우승, 네이버 버그바운티 명예의전당)에서 남들이 못 보는 곳을 먼저 보는 법을 배웠습니다.",
  "지금은 그 눈으로 화면을 만듭니다. 밀리초 단위의 프레임을 재고, 병목을 찾고, 구조를 단순하게 유지합니다. 반복 작업은 멀티 에이전트 오케스트레이션과 SDD 워크플로우로 자동화하고 — 그렇게 아낀 시간을 전부 사용자가 만지는 마지막 픽셀에 씁니다.",
];

export const stackGroups: StackGroup[] = [
  {
    label: "FRONT-END",
    items:
      "TypeScript · React · Next.js · Vite · Jotai · TanStack Query · Tailwind CSS · Recharts · shadcn/ui",
  },
  {
    label: "APP",
    items: "React Native · Expo · NativeWind · Electron · Flutter",
  },
  {
    label: "BACK-END",
    items: "NestJS · FastAPI · PostgreSQL · Prisma · MySQL · SQLite",
  },
  {
    label: "TESTING",
    items: "Jest · React Testing Library · MSW · Vitest · TDD",
  },
  {
    label: "DEVOPS",
    items: "GitHub Actions · Docker · GCP Cloud Run · Vercel · OpenTelemetry",
  },
  {
    label: "AI TOOLING",
    items:
      "Claude Code · Cursor · MCP 서버 개발 · Spec-Driven Development · n8n",
  },
  {
    label: "COLLABORATION",
    items: "Git · GitHub · Jira · Confluence · Slack · Figma",
  },
];

/** 연도 역순 타임라인 — 기존 사이트의 전체 이력을 그대로 계승 */
export const experiences: ExperienceEntry[] = [
  {
    period: "2024.02 — 현재",
    org: "새솔테크",
    role: "Front-End Developer",
    desc: "Electron+React 자동화 테스트 데스크톱 앱(OmniAir 인증, 3사 납품) · Next.js 권한 관리 플랫폼 · React+NestJS 인증 서비스 운영 — Frame Drop 85% 감소 · IPC 1.2s → 0.8s · 배포 15분 → 6분",
  },
  {
    period: "2023 — ",
    org: "비욘드 코딩",
    role: "Programming Instructor",
    desc: "HTML·CSS·JavaScript·Python 커리큘럼 개발 및 강의 — 만족도 4.8/5.0 · 완주율 65% → 80%",
  },
  {
    period: "2022.04 — 06",
    org: "토스페이먼츠",
    role: "Security Engineer",
    desc: "웹 애플리케이션 취약점 진단 및 보안 리스크 평가",
  },
  {
    period: "2021.12",
    org: "FIESTA 금융보안 위협분석 대회 3위",
    role: "금융보안원",
    desc: "웹 취약점 분석 및 리포트 작성",
  },
  {
    period: "2020",
    org: "네이버 버그바운티 명예의전당 · FIESTA 우승 · K-사이버 본선",
    role: "Security Research",
    desc: "취약점 제보(1월) · 금융보안 위협분석 대회 우승(12월) · 개인정보 비식별 챌린지 본선(12월)",
  },
  {
    period: "2019.11",
    org: "사이버공격방어대회 CCE 기관팀 3위",
    role: "국가정보원",
    desc: "웹 취약점 분석 및 Incident Response",
  },
  {
    period: "2018.08 — 2020.05",
    org: "공군 사이버 작전센터",
    role: "체계 개발·취약점 분석",
    desc: "군 복무 중 사이버 방호 체계 개발 및 취약점 분석 수행",
  },
  {
    period: "2017.06 — 2018.02",
    org: "Best of the Best 7기",
    role: "차세대 보안리더 양성프로그램",
    desc: "취약점 분석 · 시큐리티짐 프로젝트 — 웹 보안, 시스템 최적화, 네트워크 성능 분석",
  },
];

export const footerNote = "reviewed by human, accelerated by AI" as const;
