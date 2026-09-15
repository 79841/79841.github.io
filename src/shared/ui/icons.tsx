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
