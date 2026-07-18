import { SectionLabel } from "@/features/site/section-label";
import { experiences } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

interface ExperienceProps {
  index?: string;
  /** 헤더 문패 라벨 — 메인과 /about에서 번호가 다르다 */
  navCtx?: string;
}

/** 연도 역순 타임라인 */
export function Experience({ index = "02", navCtx }: ExperienceProps) {
  return (
    <section id="experience" data-nav-ctx={navCtx} className="mt-32 scroll-mt-16">
      <SectionLabel index={index} title="Experience" />
      <ol className="divide-y divide-hairline">
        {experiences.map((entry, i) => (
          <Reveal key={entry.org} delay={i * 70}>
            <li className="grid gap-1.5 py-6 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-8">
              <p className="font-mono text-[10.5px] tracking-[0.08em] text-faint">
                {entry.period}
              </p>
              <div>
                <h3 className="text-[14px] font-bold">{entry.org}</h3>
                <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-muted">
                  {entry.desc}
                </p>
              </div>
              <p className="font-mono text-[10px] tracking-[0.06em] text-faint">
                {entry.role}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
