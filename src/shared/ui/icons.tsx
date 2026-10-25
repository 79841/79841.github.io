import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 14, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

/** 외부 링크 — 대각 화살표 */
export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12L12 4" />
      <path d="M6 4h6v6" />
    </svg>
  );
}

/** 다음 — 수평 화살표 */
export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

/** 이전 — 수평 화살표 */
export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 8H3" />
      <path d="M7 4L3 8l4 4" />
    </svg>
  );
}

export function Trophy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 2h6v4a3 3 0 0 1-6 0V2z" />
      <path d="M5 3H3v1.5A2.5 2.5 0 0 0 5.5 7" />
      <path d="M11 3h2v1.5A2.5 2.5 0 0 1 10.5 7" />
      <path d="M8 9v3" />
      <path d="M5.5 14h5" />
    </svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <svg {...base({ size: 12, ...props })}>
      <rect x="5" y="5" width="9" height="9" rx="2" />
      <path d="M11 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base({ size: 12, ...props })}>
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

/** 크게 보기 — 바깥으로 벌어지는 두 모서리 */
export function Expand(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 2.5h4v4" />
      <path d="M13.5 2.5L9 7" />
      <path d="M6.5 13.5h-4v-4" />
      <path d="M2.5 13.5L7 9" />
    </svg>
  );
}

/** 닫기 — 엇갈린 두 선 */
export function Close(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4l8 8" />
      <path d="M12 4l-8 8" />
    </svg>
  );
}

/**
 * 메뉴 아이콘 — Phosphor Icons(MIT, phosphoricons.com) Regular 굵기의 경로를 그대로 옮겼다.
 * 256 격자에 면으로 그린 선이라 fill로 칠한다.
 */
function phosphor({ size = 14, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 256 256",
    fill: "currentColor",
    "aria-hidden": true,
    ...props,
  };
}

/** Home — house */
export function NavHome(props: IconProps) {
  return (
    <svg {...phosphor(props)}>
      <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z" />
    </svg>
  );
}

/** Work — squares-four */
export function NavWork(props: IconProps) {
  return (
    <svg {...phosphor(props)}>
      <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" />
    </svg>
  );
}

/** Blog — bookmark-simple */
export function NavBlog(props: IconProps) {
  return (
    <svg {...phosphor(props)}>
      <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,177.57-51.77-32.35a8,8,0,0,0-8.48,0L72,209.57V48H184Z" />
    </svg>
  );
}

/** About — at (핸들 앞의 @) */
export function NavAbout(props: IconProps) {
  return (
    <svg {...phosphor(props)}>
      <path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
    </svg>
  );
}
