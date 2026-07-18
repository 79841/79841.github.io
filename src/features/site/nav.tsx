"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/features/site/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

/** 캡슐로 응집하기 시작하는 스크롤 오프셋(px) */
const ASSEMBLE_AT = 32;

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

/** 관찰할 섹션이 없는 페이지의 문패 — 글 목록·태그 페이지 등 */
function staticCtx(pathname: string): string {
  const current = normalize(pathname);
  if (current.startsWith("/work")) return "WORK";
  if (current.startsWith("/blog")) return "BLOG";
  if (current.startsWith("/about")) return "ABOUT";
  return "";
}

interface CtxState {
  path: string;
  label: string;
}

/**
 * 스티키 헤더 — 문패 × 자기조립 × 리플 유리.
 *
 * 최상단에서는 정적 헤더처럼 펼쳐져 있다가 스크롤하면 유리 캡슐로 응집한다
 * (스타일은 globals.css의 .site-header 계열). 캡슐 가운데의 문패는
 * [data-nav-ctx] 섹션을, 블로그 글에서는 본문의 h2를 따라간다.
 * 스크롤 속도는 리플 필터의 굴절 강도를 흔든다 — 멈추면 잔잔해진다.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // 라벨을 경로와 묶어 두면 페이지를 이동해도 이전 페이지의 문패가 남지 않는다
  const [ctx, setCtx] = useState<CtxState>({ path: "", label: "" });
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  /* 응집 상태 + 읽기 진행 링 — rAF로 스로틀.
     진행률은 매 스크롤 프레임 바뀌므로 리렌더 대신 CSS 변수·텍스트만 만진다 */
  useEffect(() => {
    let raf = 0;
    let wasDone = false;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > ASSEMBLE_AT);

      const header = headerRef.current;
      if (!header) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const prog =
        max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      header.style.setProperty("--prog", prog.toFixed(1));
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(prog)}%`;
      }

      /* 완독 맥동 — 경계를 넘는 순간 한 번만 */
      const done = prog >= 99.5;
      if (done && !wasDone) {
        header.classList.remove("nav-done");
        void header.offsetWidth; /* 애니메이션 재트리거 */
        header.classList.add("nav-done");
      }
      if (!done) header.classList.remove("nav-done");
      wasDone = done;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* 문패 — 라벨 달린 섹션이 있으면 그걸, 블로그 글이면 본문 h2를 따라간다 */
  useEffect(() => {
    let targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-ctx]"),
    ).map((el) => ({ el: el as Element, label: el.dataset.navCtx ?? "" }));

    if (targets.length === 0) {
      targets = Array.from(
        document.querySelectorAll<HTMLElement>(".post-body h2[id]"),
      ).map((el) => ({ el: el as Element, label: el.textContent ?? "" }));
    }
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const hit = targets.find((t) => t.el === entry.target);
          if (hit) setCtx({ path: pathname, label: hit.label });
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    for (const { el } of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  /* 스크롤 속도 → 굴절 강도. 잦아들면 루프도 잠든다 */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastY = window.scrollY;
    let vel = 0;
    let lastScale = 10;
    let idleFrames = 0;

    const tick = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      vel = vel * 0.86 + Math.min(1, Math.abs(dy) / 46) * 0.14;
      if (vel < 0.004) {
        vel = 0;
        idleFrames += 1;
      } else {
        idleFrames = 0;
      }
      const scale = 10 + vel * 16;
      if (Math.abs(scale - lastScale) > 0.3 && dispRef.current) {
        dispRef.current.setAttribute("scale", scale.toFixed(1));
        lastScale = scale;
      }
      if (idleFrames > 30) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) {
        lastY = window.scrollY;
        idleFrames = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      window.removeEventListener("scroll", wake);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const label = ctx.path === pathname ? ctx.label : staticCtx(pathname);

  return (
    <header
      ref={headerRef}
      className="site-header"
      data-scrolled={scrolled ? "" : undefined}
    >
      <div className="nav-bar">
        {/* 읽기 진행 링 — 이름은 히어로와 푸터가 말하고, 이 자리는 진행률이 산다 */}
        <button
          type="button"
          className="nav-gauge"
          aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            className="nav-gauge-body"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle
              className="nav-gauge-track"
              cx="8"
              cy="8"
              r="6"
              fill="none"
              strokeWidth="1.5"
            />
            <circle
              className="nav-gauge-arc"
              cx="8"
              cy="8"
              r="6"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={100}
            />
          </svg>
          <span className="nav-gauge-pct" ref={pctRef} aria-hidden="true">
            0%
          </span>
        </button>

        {/* 문패 — 지금 읽는 곳. 스크린리더에는 소음이라 숨긴다 */}
        <span className="nav-ctx" aria-hidden="true">
          {label ? <s key={label}>{label}</s> : null}
        </span>

        <div className="nav-links flex items-baseline gap-5 text-[13px] sm:gap-7">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </div>

      {/* 리플 굴절 필터 — 스크롤 속도가 scale을 흔든다 (위 효과 참고) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="nav-ripple">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.05"
            numOctaves="1"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="n"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </header>
  );
}
