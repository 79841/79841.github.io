import Link from "next/link";
import { WorkThumb } from "@/features/site/work-thumb";
import type { Work } from "@/shared/lib/profile";
import { ArrowRight } from "@/shared/ui/icons";

/** 히어로 아래 풀블리드 대표 프로젝트 — 큰 이미지 카드, 이름과 메타는 카드 아래 */
export function FeaturedWork({ work }: { work: Work }) {
  return (
    <Link href={`/work/${work.slug}`} className="work-link flex flex-col gap-4">
      <div className="gcard glass p-1.5 sm:rounded-[28px] sm:p-2">
        <WorkThumb
          work={work}
          priority
          className="aspect-[4/3] sm:aspect-[2/1] sm:rounded-[20px]"
        />
      </div>
      <div className="flex items-end justify-between gap-6 px-1">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-[18px] leading-[1.3] font-medium tracking-[-0.015em] sm:text-[20px]">
            {work.name}
          </h3>
          <p className="font-mono text-[12px] leading-[1.6] text-faint">
            {[work.period, work.badge, work.stack].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span className="work-cta hidden shrink-0 items-center gap-1 text-[13px] font-medium text-muted sm:inline-flex">
          보기 <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
