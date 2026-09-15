/**
 * 테마 상태 — 토글이 <html data-theme>에 쓰고, 나머지는 여기서 읽는다.
 * setState를 effect 안에서 부르지 않도록 useSyncExternalStore로 구독한다.
 */
import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const CHANGE_EVENT = "themechange";
const MEDIA = "(prefers-color-scheme: dark)";

/** 지금 화면이 다크인가 — 강제 테마가 있으면 그것, 없으면 시스템 선호 */
export function isDarkTheme(): boolean {
  if (typeof document === "undefined") return false;
  const forced = document.documentElement.dataset.theme;
  if (forced === "dark") return true;
  if (forced === "light") return false;
  return window.matchMedia(MEDIA).matches;
}

/** 테마를 바꾸고 구독자에게 알린다 */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* 사생활 보호 모드 등에서 저장이 막혀도 화면은 바뀐다 */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  const media = window.matchMedia(MEDIA);
  media.addEventListener("change", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * 다크 여부. 서버와 첫 하이드레이션에서는 null(모름)이고,
 * 클라이언트에서 구독이 붙으면 실제 값으로 바뀐다.
 */
export function useIsDark(): boolean | null {
  return useSyncExternalStore(subscribe, isDarkTheme, () => null);
}
