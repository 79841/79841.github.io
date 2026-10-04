"use client";

import { useEffect } from "react";

/**
 * 카드 위를 지나는 포인터 자리에 옅은 빛을 둔다.
 *
 * 카드마다 리스너를 다는 대신 문서에 하나만 달고 `[data-glow]`를 찾아
 * CSS 변수(--gx/--gy)만 쓴다 — 리렌더가 없고 카드가 몇 장이든 비용이 같다.
 * 빛 자체는 globals.css의 `[data-glow]::after`가 그린다.
 */
export function PointerGlow() {
  useEffect(() => {
    // 손가락으로 만지는 화면에는 따라다닐 포인터가 없다
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const paint = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${((x - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--gy", `${((y - rect.top) / rect.height) * 100}%`);
    };

    const onMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-glow]");
      if (!el) return;
      pending = { el, x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
