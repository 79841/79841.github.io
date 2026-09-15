"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/shared/lib/blog";

interface TocProps {
  headings: Heading[];
}

/** 본문 옆 유리 목차 — 지금 읽고 있는 절을 잉크 레일로 표시한다 */
export function Toc({ headings }: TocProps) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px" },
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="glass sticky top-[92px] hidden max-h-[70vh] flex-col gap-2.5 overflow-y-auto rounded-[18px] px-4 pt-4 pb-3 lg:flex"
    >
      <span className="eyebrow">CONTENTS</span>
      <ul className="flex flex-col border-l border-hairline">
        {headings.map((heading) => {
          const current = active === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={current ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-3.5 text-[13.5px] leading-[1.5] transition-colors hover:text-ink ${
                  heading.level === 3 ? "pl-6" : ""
                } ${current ? "border-ink font-medium text-ink" : "border-transparent text-faint"}`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
