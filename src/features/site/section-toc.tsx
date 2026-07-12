"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "work", label: "WORK" },
  { id: "writing", label: "WRITING" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

/**
 * 메인 페이지 우측에 고정되는 섹션 목차.
 *
 * 헤더 nav가 라우트 이동을 맡게 되면서, 페이지 안에서의 위치 감각은 여기가 담당한다.
 * 좌측에는 세로 시그니처 레일이 이미 있어 우측에 둔다.
 * 본문이 max-w-4xl 중앙 정렬이라 xl(1280px)부터 겹치지 않는다 — 그 아래에서는 숨긴다.
 */
export function SectionToc() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="섹션 목차"
      className="fixed top-1/2 right-6 hidden -translate-y-1/2 xl:block"
    >
      <ul className="space-y-3">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-2.5"
              >
                <span
                  className={`font-mono text-[9.5px] tracking-[0.15em] transition-colors ${
                    isActive
                      ? "text-ink"
                      : "text-ghost group-hover:text-muted"
                  }`}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-5 bg-ink"
                      : "w-2.5 bg-hairline group-hover:w-4 group-hover:bg-muted"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
