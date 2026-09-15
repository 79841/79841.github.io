"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/features/site/theme-toggle";
import { pageTone, toneBehind } from "@/shared/lib/tone";
import type { Tone } from "@/shared/lib/tone";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
];

/** trailingSlash: true라 브라우저 경로는 "/work/"로 들어온다 — 비교 전에 끝 슬래시를 떼어낸다 */
function normalize(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** 상세 페이지에서도 상위 항목이 켜져 있어야 한다 — /work/argus → Work, /blog/tag/react → Writing */
export function isActive(pathname: string, href: string): boolean {
  const current = normalize(pathname);
  if (href === "/") return current === "/";
  return current === href || current.startsWith(`${href}/`);
}

/**
 * 뒤에 깔린 것의 밝기를 따라가는 헤더 톤.
 * 캡슐 아래 세 점을 스크롤마다(rAF) 샘플링한다 — 어두운 스크린샷 위를 지날 때 글자가 흰색으로 뒤집힌다.
 */
function useSurfaceTone(ref: React.RefObject<HTMLElement | null>): Tone {
  const [tone, setTone] = useState<Tone>("light");

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const y = rect.top + rect.height / 2;
      const fallback = pageTone();
      const votes = [0.2, 0.5, 0.8].map((t) =>
        toneBehind(rect.left + rect.width * t, y, el, fallback),
      );
      const dark = votes.filter((v) => v === "dark").length;
      setTone(dark >= 2 ? "dark" : "light");
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("themechange", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("themechange", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return tone;
}

/**
 * 활성 알약을 현재 항목의 자리로 옮긴다 — 상태 대신 DOM에 바로 쓴다.
 * 첫 배치는 전환 없이, 이후 경로가 바뀌면 알약이 새 항목의 위치·폭으로 미끄러진다.
 */
function usePillPosition(
  listRef: React.RefObject<HTMLDivElement | null>,
  pillRef: React.RefObject<HTMLSpanElement | null>,
  activeHref: string | null,
) {
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;

    const place = () => {
      const target = activeHref
        ? list.querySelector<HTMLElement>(`[data-href="${activeHref}"]`)
        : null;
      if (!target) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.transform = `translateX(${target.offsetLeft}px)`;
      pill.style.width = `${target.offsetWidth}px`;
    };

    place();
    // 첫 배치가 끝난 다음 프레임부터 전환을 켠다 — 새로고침 때 알약이 날아오지 않게
    const raf = requestAnimationFrame(() => {
      pill.dataset.ready = "";
    });
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(place);
    observer?.observe(list);
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [listRef, pillRef, activeHref]);
}

/**
 * 상단에 떠 있는 유리 캡슐 — Home·Work·Writing·About 메뉴와 테마 토글.
 * 현재 페이지 뒤의 유리 알약 하나가 항목 사이를 미끄러져 이동한다.
 * 글자색과 유리 색은 캡슐 뒤에 깔린 것의 밝기를 따른다.
 */
export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tone = useSurfaceTone(navRef);

  const activeHref = links.find((link) => isActive(pathname, link.href))?.href ?? null;
  usePillPosition(listRef, pillRef, activeHref);

  return (
    <header className="pointer-events-none sticky top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav
        ref={navRef}
        aria-label="주 메뉴"
        data-tone={tone}
        className="nav-cap pointer-events-auto flex h-[52px] max-w-full items-center gap-1 rounded-full py-0 pr-2 pl-2 sm:gap-2"
      >
        <div ref={listRef} className="relative flex items-center gap-0.5 text-[14px]">
          {/* 활성 알약 — 하나뿐이고 항목 사이를 미끄러진다 (위치는 usePillPosition이 DOM에 쓴다) */}
          <span ref={pillRef} aria-hidden className="nav-pill" />
          {links.map((link) => {
            const active = activeHref === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link relative flex h-9 items-center rounded-full px-3 ${
                  active ? "nav-link-active font-medium" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}
