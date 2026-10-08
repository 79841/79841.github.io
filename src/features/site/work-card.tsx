import Link from "next/link";
import { WorkThumb } from "@/features/site/work-thumb";
import type { Work } from "@/shared/lib/profile";

interface WorkCardProps {
  work: Work;
  priority?: boolean;
}

/** 유리 카드에는 이미지만 담고, 이름과 기간·배지는 카드 아래 글자로 둔다 */
export function WorkCard({ work, priority }: WorkCardProps) {
  return (
    <Link href={`/work/${work.slug}`} className="work-link flex flex-col gap-3.5">
      <div className="gcard glass p-1.5">
        <WorkThumb work={work} priority={priority} />
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-[16px] leading-[1.35] font-medium tracking-[-0.01em]">
          {work.name}
        </h3>
        <p className="font-mono text-[12px] text-faint">
          {[work.period, work.badge].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}
