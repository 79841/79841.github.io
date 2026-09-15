"use client";

import { setTheme, useIsDark } from "@/shared/lib/theme";

export function ThemeToggle() {
  const dark = useIsDark();

  const toggle = () => {
    setTheme(dark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="flex size-9 shrink-0 items-center justify-center rounded-full text-[14px] text-muted transition-colors hover:text-ink"
    >
      {dark === null ? "◐" : dark ? "☾" : "☀"}
    </button>
  );
}
