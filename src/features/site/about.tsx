import { SectionLabel } from "@/features/site/section-label";
import { aboutParagraphs, stackGroups } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 소개 문단 + 스택 표 — 메인 섹션과 /about 페이지가 같은 본문을 공유한다 */
export function AboutBody() {
  return (
    <div className="grid gap-12 sm:grid-cols-[1.2fr_1fr] sm:gap-16">
      <Reveal>
        <div className="space-y-5">
          {aboutParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className="max-w-lg text-[14px] leading-[1.9] text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
      <Reveal delay={100}>
        <dl className="space-y-3.5">
          {stackGroups.map((group) => (
            <div key={group.label} className="flex gap-4">
              <dt className="w-[84px] shrink-0 pt-[3px] font-mono text-[9.5px] tracking-[0.12em] text-ghost">
                {group.label}
              </dt>
              <dd className="text-[12.5px] leading-relaxed text-muted">
                {group.items}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}

/** 메인의 About 섹션 */
export function About({ index = "04" }: { index?: string }) {
  return (
    <section id="about" data-nav-ctx="§04 — ABOUT" className="mt-32 scroll-mt-16">
      <SectionLabel index={index} title="About" />
      <AboutBody />
    </section>
  );
}
