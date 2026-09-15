import type { Metadata } from "next";
import { Contact } from "@/features/site/contact";
import { MoreWorks } from "@/features/site/more-works";
import { SectionHead } from "@/features/site/section-head";
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
  return (
    <main>
      <header className="pt-16 pb-8 sm:pt-24 sm:pb-10">
        <Reveal>
          <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
            Work
          </h1>
          <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-muted sm:text-[18px]">
            문제를 어떻게 좁혔고 무엇으로 확인했는지를 적어뒀습니다. 카드를 누르면
            상세로 들어갑니다.
          </p>
        </Reveal>
      </header>

      <section aria-labelledby="works-h">
        <SectionHead eyebrow="WORK" title="프로젝트" id="works-h" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <Reveal key={work.slug} delay={(i % 3) * 80}>
              <WorkCard work={work} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="more-h" className="mt-16">
        <SectionHead eyebrow="MORE" title="그 밖의 작업" id="more-h" />
        <Reveal>
          <MoreWorks />
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
