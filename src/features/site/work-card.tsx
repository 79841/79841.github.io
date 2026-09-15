import Link from "next/link";
import { WorkThumb } from "@/features/site/work-thumb";
import type { Work } from "@/shared/lib/profile";

interface WorkCardProps {
  work: Work;
  priority?: boolean;
}

/** 유리 카드 — 이미지가 카드 전체를 차지하고, 이름과 연도만 유리 캡션으로 얹는다 */
export function WorkCard({ work, priority }: WorkCardProps) {
  return (
    <Link href={`/work/${work.slug}`} className="gcard glass p-1.5">
      <WorkThumb
        work={work}
        priority={priority}
        caption={
          <>
            <h3 className="text-[14px] leading-[1.3] font-medium tracking-[-0.01em]">
              {work.name}
            </h3>
            <span className="sub shrink-0 font-mono text-[11px]">{work.period}</span>
          </>
        }
      />
    </Link>
  );
}
