import type { Metadata } from "next";
import { MoreWorks } from "@/features/site/more-works";
import { SectionLabel } from "@/features/site/section-label";
import { WorkCard } from "@/features/site/work-card";
import { profile, works } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "실시간 데이터 시각화, 렌더링 최적화, AI 에이전트 도구 — 명인지가 만든 것들.",
  openGraph: {
    title: `Work — ${profile.name}`,
    description: "만든 것들의 전체 목록.",
    url: "/work",
    type: "website",
  },
};

export default function WorkPage() {
  const [featured, ...rest] = works;

  return (
    <main>
      <header className="pt-16 pb-14">
        <Reveal>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">
            Work
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.9] text-muted">
            문제를 어떻게 좁혔고 무엇으로 확인했는지를 적어뒀습니다. 카드를
            누르면 상세로 들어갑니다.
          </p>
        </Reveal>
      </header>

      <section>
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
              <WorkCard work={work} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-32">
        <SectionLabel index="02" title="More" />
        <MoreWorks />
      </section>
    </main>
  );
}
