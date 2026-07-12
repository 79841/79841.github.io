"use client";

import { useEffect, useState } from "react";

function systemPrefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(stored ? stored === "dark" : systemPrefersDark());
  }, []);

  const toggle = () => {
    const nextDark = !(dark ?? systemPrefersDark());
    setDark(nextDark);
    const theme = nextDark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="-my-2 -mr-2 flex size-9 shrink-0 items-center justify-center self-center rounded-full font-mono text-[12px] text-muted transition-colors hover:bg-imgbg hover:text-ink"
    >
      {dark === null ? "◐" : dark ? "☾" : "☀"}
    </button>
  );
}
