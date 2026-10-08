import { moreWorks } from "@/shared/lib/profile";
import type { MoreWork } from "@/shared/lib/profile";
import { ArrowUpRight } from "@/shared/ui/icons";

interface MoreWorksProps {
  /** 두 열로 넓게 — /work처럼 이 목록이 섹션 하나를 차지할 때 */
  wide?: boolean;
}

/** 위: 이름(링크면 ↗)과 기간, 가운데: 한 줄 요약, 바닥: 괘선 아래 스택 */
function TileBody({ work, wide }: { work: MoreWork; wide: boolean }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3
          className={`inline-flex items-center gap-1.5 leading-[1.35] font-medium tracking-[-0.01em] ${
            wide ? "text-[18px]" : "text-[16px]"
          }`}
        >
          {work.name}
          {work.href ? <ArrowUpRight className="tile-arrow shrink-0 text-faint" /> : null}
        </h3>
        {work.period ? (
          <span className="shrink-0 font-mono text-[12px] text-faint">{work.period}</span>
        ) : null}
      </div>
      <p
        className={`leading-[1.55] text-muted text-pretty ${
          wide ? "text-[15px]" : "text-[14px]"
        }`}
      >
        {work.summary}
      </p>
      <p className="mt-auto border-t border-hairline pt-3 text-[13px] leading-[1.5] text-faint">
        {work.stack.join(" · ")}
      </p>
    </>
  );
}

/**
 * 스크린샷 없는 나머지 작업 — 글자만 얹은 작은 유리 타일.
 * 링크가 있는 타일만 카드처럼 반응하고, 없는 타일은 정보만 보여준다.
 */
export function MoreWorks({ wide = false }: MoreWorksProps) {
  const tileClass = `more-tile${wide ? " more-tile-wide" : ""}`;
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${wide ? "" : "lg:grid-cols-4"}`}>
      {moreWorks.map((work) => (
        <li key={work.name} className="h-full">
          {work.href ? (
            <a
              href={work.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`gcard glass ${tileClass}`}
            >
              <TileBody work={work} wide={wide} />
            </a>
          ) : (
            <div className={`glass ${tileClass}`}>
              <TileBody work={work} wide={wide} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
