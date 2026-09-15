import { moreWorks } from "@/shared/lib/profile";
import { ArrowUpRight } from "@/shared/ui/icons";

/** 스크린샷 없는 나머지 작업 — 카드가 아니라 괘선으로 나눈 목록 */
export function MoreWorks() {
  return (
    <ul className="mt-2 flex flex-col">
      {moreWorks.map((work, i) => {
        const inner = (
          <>
            <span className="inline-flex items-center gap-1.5 text-[16px] font-medium">
              {work.name}
              {work.href ? <ArrowUpRight /> : null}
            </span>
            <span className="text-[13px] text-faint">{work.note}</span>
            <span className="font-mono text-[12px] text-faint sm:text-right">
              {work.period}
            </span>
          </>
        );
        const rowClass =
          "grid gap-1 px-2 py-4 sm:grid-cols-[220px_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6";
        return (
          <li
            key={work.name}
            className={`border-t border-hairline ${
              i === moreWorks.length - 1 ? "border-b" : ""
            }`}
          >
            {work.href ? (
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${rowClass} transition-colors hover:text-ink`}
              >
                {inner}
              </a>
            ) : (
              <div className={rowClass}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
