import { SectionHead } from "@/features/site/section-head";
import { awards, experiences } from "@/shared/lib/profile";
import { Trophy } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

interface ExperienceProps {
  /** 성과 한 줄까지 보여준다 — /about 전용 */
  detail?: boolean;
}

/**
 * 가운데 레일을 두고 항목이 좌우를 번갈아 차지하는 타임라인.
 * 좁은 화면에서는 레일이 왼쪽으로 붙고 항목은 모두 오른쪽에 쌓인다.
 */
export function Experience({ detail = false }: ExperienceProps) {
  return (
    <section id="experience" aria-labelledby="exp-h" className="mt-24 scroll-mt-20">
      <SectionHead eyebrow="EXPERIENCE" title="이력" id="exp-h" />

      <div className="relative mx-auto mt-10 w-full max-w-[1000px]">
        <div
          aria-hidden
          className="absolute top-8 bottom-6 left-[9.5px] w-px bg-gradient-to-b from-ink via-ink/35 to-ink/10 md:left-1/2 md:-translate-x-px"
        />
        <ol className="flex flex-col gap-2.5">
          {experiences.map((entry, i) => {
            const left = i % 2 === 0;
            const align = left ? "md:items-end md:text-right" : "md:items-start md:text-left";
            const chipAlign = left ? "md:justify-end" : "md:justify-start";
            const content = (
              <div
                className={`tl-card flex max-w-[460px] flex-col gap-1 rounded-[20px] px-6 py-5 ${
                  entry.current ? "glass-strong" : "tl-line"
                } ${align}`}
              >
                <span className="font-mono text-[12px] text-faint md:hidden">
                  {entry.period}
                </span>
                <h3 className="text-[18px] leading-[1.35] font-medium tracking-[-0.02em]">
                  {entry.org}
                </h3>
                <span className="text-[14px] text-faint">{entry.role}</span>
                {detail ? (
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-muted text-pretty">
                    {entry.desc}
                  </p>
                ) : null}
                <div className={`mt-2 flex flex-wrap gap-1.5 ${chipAlign}`}>
                  {entry.tags.map((tag) => (
                    <span key={tag} className="chip chip-sm chip-line">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
            const date = (
              <span
                className={`hidden pt-[22px] font-mono text-[13px] text-faint md:block ${
                  left ? "text-left" : "text-right"
                }`}
              >
                {entry.period}
              </span>
            );
            const dot = (
              <div className="flex justify-center pt-[26px]">
                <span
                  aria-hidden
                  className={`block size-3 rounded-full border-[1.5px] ${
                    entry.current
                      ? "border-ink bg-ink"
                      : "border-ink/50 bg-paper"
                  }`}
                />
              </div>
            );
            return (
              <li key={entry.org}>
                <Reveal
                  delay={i * 60}
                  className="grid grid-cols-[20px_minmax(0,1fr)] items-start gap-x-3 md:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] md:gap-x-5"
                >
                  {/* 한 번만 렌더하고 order로 자리를 바꾼다 — 좁은 화면은 점 → 카드, 넓은 화면은 좌우 교차 */}
                  <div className="order-1 md:order-2">{dot}</div>
                  <div
                    className={`order-2 md:flex ${
                      left ? "md:order-1 md:justify-end" : "md:order-3 md:justify-start"
                    }`}
                  >
                    {content}
                  </div>
                  <div className={`hidden md:block ${left ? "md:order-3" : "md:order-1"}`}>
                    {date}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      <Reveal>
        <div className="mt-10 flex flex-col items-center gap-3.5">
          <span className="eyebrow">AWARDS</span>
          <ul className="flex flex-wrap justify-center gap-2">
            {awards.map((award) => (
              <li key={award.name} className="chip h-auto min-h-9 gap-2.5 py-1.5 whitespace-normal">
                <Trophy className="shrink-0" />
                <span className="font-mono text-faint">{award.date}</span>
                <span className="text-ink">{award.name}</span>
                <span className="text-faint">· {award.org}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
