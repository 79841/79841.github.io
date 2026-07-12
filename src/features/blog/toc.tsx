"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/shared/lib/blog";

interface TocProps {
  headings: Heading[];
}

/** 본문 옆에 붙는 목차 — 지금 읽고 있는 절을 표시한다 (nav의 스크롤 스파이와 같은 방식) */
export function Toc({ headings }: TocProps) {
  const [active, setActive] = useState<string | null>(null);

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
      className="sticky top-20 hidden max-h-[70vh] overflow-y-auto lg:block"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-ghost">
        CONTENTS
      </p>

      <ul className="mt-4 space-y-2.5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${heading.id}`}
              className={`block text-[12px] leading-[1.55] transition-colors hover:text-ink ${
                active === heading.id ? "text-ink" : "text-faint"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
