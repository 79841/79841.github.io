import type { ReactNode } from "react";
import { SectionHead } from "@/features/site/section-head";
import { awards, experiences } from "@/shared/lib/profile";
import { buildTimeline } from "@/shared/lib/timeline";
import type { TimelineItem } from "@/shared/lib/timeline";
import { Trophy } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

interface ExperienceProps {
  /** 이력마다 한 일 한 줄까지 보여준다 — /about 전용 */
  detail?: boolean;
}

interface Side {
  /** 넓은 화면에서 레일 왼쪽에 놓이는지 */
  left: boolean;
  align: string;
  badgeAlign: string;
}

function sideOf(index: number): Side {
  const left = index % 2 === 0;
  return {
    left,
    align: left ? "md:items-end md:text-right" : "md:items-start md:text-left",
    badgeAlign: left ? "md:justify-end" : "md:justify-start",
  };
}

/** 경력 — 소속과 역할을 칩 하나로, 그 아래 키워드 뱃지. 현재 자리만 잉크로 채운다 */
function RoleBody({ item, side, detail }: { item: Extract<TimelineItem, { kind: "role" }>; side: Side; detail: boolean }) {
  const { entry } = item;
  return (
    <div className={`flex max-w-[460px] flex-col gap-2.5 ${side.align}`}>
      <div className={`tl-chip${entry.current ? " is-current" : ""}`}>
        <h3 className="tl-chip-org">{entry.org}</h3>
        <span className="tl-chip-role">{entry.role}</span>
      </div>
      <div className={`flex flex-wrap gap-1.5 ${side.badgeAlign}`}>
        {entry.tags.map((tag) => (
          <span key={tag} className="chip chip-sm chip-line">
            {tag}
          </span>
        ))}
      </div>
      {detail ? (
        <p className="text-[14px] leading-[1.6] text-muted text-pretty">{entry.desc}</p>
      ) : null}
      <span className="font-mono text-[12px] text-faint md:hidden">{entry.period}</span>
    </div>
  );
}

/** 수상 — 경력보다 한 단계 가벼운 칩에 수상명, 아래 뱃지에 주관 기관 */
function AwardBody({ item, side }: { item: Extract<TimelineItem, { kind: "award" }>; side: Side }) {
  const { award } = item;
  return (
    <div className={`flex max-w-[460px] flex-col gap-2.5 ${side.align}`}>
      <div className="tl-chip tl-award">
        <Trophy className="shrink-0 self-center" />
        <span className="tl-chip-org">{award.name}</span>
      </div>
      <div className={`flex flex-wrap gap-1.5 ${side.badgeAlign}`}>
        <span className="chip chip-sm chip-line">{award.org}</span>
      </div>
      <span className="font-mono text-[12px] text-faint md:hidden">{award.date}</span>
    </div>
  );
}

/** 레일 위의 표시 — 경력은 점(현재는 채운 점), 수상은 트로피 고리 */
function Marker({ item }: { item: TimelineItem }) {
  if (item.kind === "award") {
    return (
      <div className="flex justify-center pt-[9px]">
        <span aria-hidden className="tl-award-mark">
          <Trophy />
        </span>
      </div>
    );
  }
  return (
    <div className="flex justify-center pt-[14px]">
      <span
        aria-hidden
        className={`block size-3 rounded-full border-[1.5px] ${
          item.entry.current ? "border-ink bg-ink" : "border-ink/50 bg-paper"
        }`}
      />
    </div>
  );
}

/**
 * 가운데 레일을 두고 항목이 좌우를 번갈아 차지하는 타임라인.
 * 경력과 수상을 시간 순서 하나로 세운다 — 수상은 그 무렵의 경력 사이에 들어간다.
 * 좁은 화면에서는 레일이 왼쪽으로 붙고 항목은 모두 오른쪽에 쌓인다.
 */
export function Experience({ detail = false }: ExperienceProps) {
  const timeline = buildTimeline(experiences, awards);

  return (
    <section id="experience" aria-labelledby="exp-h" className="mt-24 scroll-mt-20">
      <SectionHead eyebrow="EXPERIENCE" title="이력" id="exp-h" />

      <div className="relative mx-auto mt-10 w-full max-w-[1000px]">
        <div
          aria-hidden
          className="absolute top-5 bottom-6 left-[9.5px] w-px bg-gradient-to-b from-ink via-ink/35 to-ink/10 md:left-1/2 md:-translate-x-px"
        />
        <ol className="flex flex-col gap-9">
          {timeline.map((item, i) => {
            const side = sideOf(i);
            const when = item.kind === "role" ? item.entry.period : item.award.date;
            let body: ReactNode;
            if (item.kind === "role") {
              body = <RoleBody item={item} side={side} detail={detail} />;
            } else {
              body = <AwardBody item={item} side={side} />;
            }

            return (
              <li key={item.key} data-kind={item.kind}>
                <Reveal
                  delay={(i % 4) * 60}
                  className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] md:gap-x-5"
                >
                  {/* 한 번만 렌더하고 order로 자리를 바꾼다 — 좁은 화면은 표시 → 칩, 넓은 화면은 좌우 교차 */}
                  <div className="order-1 md:order-2">
                    <Marker item={item} />
                  </div>
                  <div
                    className={`order-2 md:flex ${
                      side.left ? "md:order-1 md:justify-end" : "md:order-3 md:justify-start"
                    }`}
                  >
                    {body}
                  </div>
                  <div className={`hidden md:block ${side.left ? "md:order-3" : "md:order-1"}`}>
                    <span
                      className={`block pt-[10px] font-mono text-[13px] text-faint ${
                        side.left ? "text-left" : "text-right"
                      }`}
                    >
                      {when}
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
