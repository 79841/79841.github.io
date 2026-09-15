import { FeaturedWork } from "@/features/site/featured-work";
import { MoreWorks } from "@/features/site/more-works";
import { SectionHead } from "@/features/site/section-head";
import { WorkCard } from "@/features/site/work-card";
import { works } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 메인의 작업 섹션 — 대표작 1 + 카드 3 + 텍스트 목록 */
export function Works() {
  const [featured, ...rest] = works;

  return (
    <section id="work" aria-labelledby="work-h" className="scroll-mt-20">
      <Reveal>
        <FeaturedWork work={featured} />
      </Reveal>

      <div className="mt-6">
        <SectionHead
          eyebrow="WORK"
          title="프로젝트"
          id="work-h"
          more={{ href: "/work", label: "전체 보기" }}
        />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((work, i) => (
          <Reveal key={work.slug} delay={(i % 3) * 80}>
            <WorkCard work={work} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6">
        <MoreWorks />
      </div>
    </section>
  );
}
