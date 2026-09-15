import Link from "next/link";
import { WorkThumb } from "@/features/site/work-thumb";
import type { Work } from "@/shared/lib/profile";
import { ArrowRight } from "@/shared/ui/icons";

/** 히어로 아래 풀블리드 대표 프로젝트 — 큰 이미지 위에 이름·메타 유리 캡션 하나 */
export function FeaturedWork({ work }: { work: Work }) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className="gcard glass p-1.5 sm:rounded-[28px] sm:p-2"
    >
      <WorkThumb
        work={work}
        priority
        className="aspect-[4/3] sm:aspect-[2/1] sm:rounded-[20px]"
        caption={
          <>
            <h3 className="text-[15px] leading-[1.3] font-medium tracking-[-0.01em] sm:text-[16px]">
              {work.name}
            </h3>
            <span className="sub hidden truncate font-mono text-[11px] sm:inline">
              {work.period} · {work.stack}
            </span>
            <span className="sub hidden shrink-0 items-center gap-1 text-[12px] font-medium sm:inline-flex">
              보기 <ArrowRight size={12} />
            </span>
          </>
        }
      />
    </Link>
  );
}
