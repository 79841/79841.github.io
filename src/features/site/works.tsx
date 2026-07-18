import { MoreWorks } from "@/features/site/more-works";
import { SectionLabel } from "@/features/site/section-label";
import { WorkCard } from "@/features/site/work-card";
import { works } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 메인의 작업 섹션 — 대표작 1 + 나머지 그리드 + 텍스트 목록 */
export function Works() {
  const [featured, ...rest] = works;

  return (
    <section id="work" data-nav-ctx="§01 — WORK" className="scroll-mt-16">
      <SectionLabel
        index="01"
        title="Selected Work"
        aside="이미지에 마우스를 올리면 색이 돌아옵니다"
      />

      <Reveal>
        <div className="mb-20">
          <WorkCard work={featured} />
        </div>
      </Reveal>

      <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
        {rest.map((work, i) => (
          <Reveal key={work.slug} delay={(i % 2) * 100}>
            <WorkCard work={work} eager />
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <MoreWorks />
      </div>
    </section>
  );
}
