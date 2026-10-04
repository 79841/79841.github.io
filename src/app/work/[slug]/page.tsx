import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/features/site/contact";
import { SectionHead } from "@/features/site/section-head";
import { WorkCard } from "@/features/site/work-card";
import { Kind, Points, Retro, Screens, Shot } from "@/features/work/blocks";
import { WorkOverview } from "@/features/work/overview";
import { profile, works } from "@/shared/lib/profile";
import { getWorkPoints, hasWorkBody } from "@/shared/lib/work";
import { ArrowLeft } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return {
    title: `${work.name} — ${profile.name}`,
    description: work.description ?? work.tagline,
  };
}

/**
 * 프로젝트 상세 — 위는 개요(기간·역할·스택·링크), 가운데는 요점, 아래는 회고.
 * 본문은 src/content/work/<slug>.mdx에 블로그 글처럼 쓴다. 요점 개수와
 * 다이어그램·코드·표·화면은 프로젝트마다 필요한 만큼 넣는다.
 */
export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const others = works.filter((w) => w.slug !== slug).slice(0, 3);
  const points = getWorkPoints(slug);
  const Body = hasWorkBody(slug)
    ? (await import(`../../../content/work/${slug}.mdx`)).default
    : null;

  return (
    <main>
      <article className="mx-auto w-full max-w-[780px]">
        <header className="flex flex-col items-center gap-4 pt-14 pb-10 text-center sm:pt-20 sm:pb-12">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex h-8 items-center gap-1.5 text-[14px] text-faint transition-colors hover:text-ink"
            >
              <ArrowLeft /> Work
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.035em]">
              {work.name}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[34ch] text-[17px] leading-[1.55] text-muted text-balance sm:text-[19px]">
              {work.tagline}
            </p>
          </Reveal>
        </header>

        <WorkOverview work={work} />

        {Body ? (
          <div className="post-body work-body mt-12">
            <Body
              components={{
                Kind,
                Shot,
                Screens,
                Retro,
                Points: () => <Points points={points} />,
              }}
            />
          </div>
        ) : null}
      </article>

      <section aria-labelledby="others-h" className="mt-24">
        <SectionHead
          eyebrow="WORK"
          title="다른 프로젝트"
          id="others-h"
          more={{ href: "/work", label: "전체 보기" }}
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => (
            <Reveal key={other.slug} delay={(i % 3) * 80}>
              <WorkCard work={other} />
            </Reveal>
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
}
