import { moreWorks } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 스크린샷 없이 텍스트 행으로 쌓이는 나머지 작업 — /work 페이지에서 쓴다 */
export function MoreWorks() {
  return (
    <Reveal>
      <ol className="divide-y divide-hairline border-t border-hairline">
        {moreWorks.map((work) => {
          const row = (
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4 pr-3">
              <h3 className="w-32 shrink-0 text-[13.5px] font-bold">
                {work.name}
              </h3>
              <p className="w-24 shrink-0 font-mono text-[10px] text-ghost">
                {work.period}
              </p>
              <p className="flex-1 text-[12.5px] text-muted">{work.note}</p>
              {work.href ? (
                <span
                  aria-hidden
                  className="font-mono text-[11px] text-ghost transition-colors group-hover:text-ink"
                >
                  ↗
                </span>
              ) : null}
            </div>
          );

          return (
            <li key={work.name}>
              {work.href ? (
                <a
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block transition-colors hover:bg-imgbg/60"
                >
                  {row}
                </a>
              ) : (
                row
              )}
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
