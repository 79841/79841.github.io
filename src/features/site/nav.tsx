"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/features/site/theme-toggle";
import { pageTone, toneBehind } from "@/shared/lib/tone";
import type { Tone } from "@/shared/lib/tone";
import { NavAbout, NavBlog, NavHome, NavWork } from "@/shared/ui/icons";

const links = [
  // Phosphor Regular — 집, 네 칸(만든 것들), 책갈피(글), @(나를 부르는 핸들)
  { href: "/", label: "Home", Icon: NavHome },
  { href: "/work", label: "Work", Icon: NavWork },
  { href: "/blog", label: "Blog", Icon: NavBlog },
  { href: "/about", label: "About", Icon: NavAbout },
];

/** trailingSlash: true라 브라우저 경로는 "/work/"로 들어온다 — 비교 전에 끝 슬래시를 떼어낸다 */
function normalize(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** 상세 페이지에서도 상위 항목이 켜져 있어야 한다 — /work/argus → Work, /blog/tag/react → Blog */
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
      const items = [...list.querySelectorAll<HTMLElement>("[data-href]")];
      const index = items.findIndex((item) => item.dataset.href === activeHref);
      if (index < 0) {
        pill.style.opacity = "0";
        return;
      }
      // 이름이 펼쳐지고 접히는 동안 항목 위치는 매 프레임 바뀐다 — 지금 위치를 쫓으면 늦게 도착한다.
      // 그래서 전환이 끝난 뒤의 자리(앞 항목은 모두 접힘, 대상만 펼침)를 계산해 한 번에 보낸다
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const iconWidth = (item: HTMLElement) =>
        item.offsetWidth - (item.querySelector<HTMLElement>(".nav-label")?.offsetWidth ?? 0);
      const left = items.slice(0, index).reduce((sum, item) => sum + iconWidth(item) + gap, 0);
      const target = items[index];
      const labelWidth = target.querySelector<HTMLElement>(".nav-label-text")?.offsetWidth ?? 0;
      pill.style.opacity = "1";
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${iconWidth(target) + labelWidth}px`;
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
 * 상단에 떠 있는 유리 캡슐 — Home·Work·Blog·About 메뉴와 테마 토글.
 * 현재 페이지만 아이콘 옆에 이름을 펼치고, 나머지는 아이콘만 둔다.
 * 현재 페이지 뒤의 유리 알약 하나가 항목 사이를 미끄러져 이동한다.
 * 글자색과 유리 색은 캡슐 뒤에 깔린 것의 밝기를 따른다.
 */
export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tone = useSurfaceTone(navRef);

  const routeHref = links.find((link) => isActive(pathname, link.href))?.href ?? null;
  // 누른 순간 알약을 출발시킨다 — 페이지 전환이 끝날 때까지 기다리면 한 박자 늦게 움직인다.
  // 누른 곳과 누를 때의 경로를 함께 기억해, 경로가 바뀌면 그 기억은 저절로 무효가 된다
  const [pending, setPending] = useState<{ href: string; from: string } | null>(null);
  const pillHref = pending && pending.from === pathname ? pending.href : routeHref;
  // 알약은 누른 곳으로 먼저 가지만, 현재 페이지 표시(aria-current)는 실제 경로를 따른다
  const activeHref = routeHref;
  usePillPosition(listRef, pillRef, pillHref);

  return (
    <header className="site-header pointer-events-none sticky top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav
        ref={navRef}
        aria-label="주 메뉴"
        data-tone={tone}
        className="nav-cap pointer-events-auto flex h-[46px] max-w-full items-center gap-1 rounded-full px-[5px] py-0 sm:gap-1.5"
      >
        <div ref={listRef} className="relative flex items-center gap-0.5 text-[14px]">
          {/* 활성 알약 — 하나뿐이고 항목 사이를 미끄러진다 (위치는 usePillPosition이 DOM에 쓴다) */}
          <span ref={pillRef} aria-hidden className="nav-pill" />
          {links.map(({ href, label, Icon }) => {
            const active = activeHref === href;
            // 이름은 알약과 같은 박자로 펼친다 — 누른 순간 알약이 가는 곳이 곧 펼쳐지는 곳
            const open = pillHref === href;
            return (
              <Link
                key={href}
                href={href}
                data-href={href}
                onClick={(event) => {
                  // 새 탭 열기 같은 수정자 클릭은 이 페이지를 떠나지 않으므로 알약도 그대로 둔다
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  setPending({ href, from: pathname });
                }}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                title={open ? undefined : label}
                data-open={open ? "" : undefined}
                className={`nav-link relative flex h-9 items-center rounded-full px-2.5 ${
                  active ? "nav-link-active font-medium" : ""
                }`}
              >
                <Icon size={16} className="shrink-0" />
                {/* 접힌 항목은 폭 0 — 이름은 aria-label이 읽어 주므로 화면 낭독기에서 숨긴다 */}
                <span aria-hidden className="nav-label">
                  <span>
                    <span className="nav-label-text">{label}</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}
