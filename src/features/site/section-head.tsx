import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/shared/ui/icons";

interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  /** 제목의 id — aria-labelledby로 섹션과 묶는다 */
  id?: string;
  /** 오른쪽 "전체 보기" 알약 */
  more?: { href: string; label: string };
}

/** 섹션 머리 — 왼쪽 제목, 오른쪽 이동 알약 */
export function SectionHead({ eyebrow, title, id, more }: SectionHeadProps) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="flex flex-col gap-2">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2
          id={id}
          className="text-[24px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[28px]"
        >
          {title}
        </h2>
      </div>
      {more ? (
        <Link href={more.href} className="more glass shrink-0">
          {more.label} <ArrowRight />
        </Link>
      ) : null}
    </div>
  );
}
