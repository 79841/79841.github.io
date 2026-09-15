import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/features/site/contact";
import { SectionHead } from "@/features/site/section-head";
import { WorkCard } from "@/features/site/work-card";
import { profile, works } from "@/shared/lib/profile";
import { ArrowLeft, ArrowUpRight } from "@/shared/ui/icons";
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

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const index = works.findIndex((w) => w.slug === slug);
  if (index === -1) notFound();
  const work = works[index];
  const others = works.filter((w) => w.slug !== slug).slice(0, 3);
  // 대표 이미지 뒤에 갤러리 — 폰 스크린샷은 매트 위에 나란히, 나머지는 한 장씩
  const gallery = work.phone ? [...work.images, ...work.detail.gallery] : work.detail.gallery;

  return (
    <main>
      <header className="flex flex-col items-center gap-5 pt-14 pb-8 text-center sm:pt-20 sm:pb-10">
        <Reveal>
          <Link
            href="/work"
            className="inline-flex h-8 items-center gap-1.5 text-[14px] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft /> Work
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
            {work.name}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-[780px] text-[17px] leading-[1.55] text-muted text-pretty sm:text-[20px]">
            {work.tagline}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="flex flex-wrap justify-center gap-2">
            {work.period ? <span className="chip">{work.period}</span> : null}
            {work.badge ? <span className="chip">{work.badge}</span> : null}
            <span className="chip">{work.stack}</span>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="flex flex-wrap justify-center gap-2.5">
            {work.detail.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn h-11 px-[18px] text-[14px] ${i === 0 ? "btn-ink" : "btn-glass"}`}
              >
                {link.label.replace(/\s*↗$/, "")} <ArrowUpRight />
              </a>
            ))}
          </div>
        </Reveal>
      </header>

      {/* 대표 화면 — 유리 액자 */}
      <Reveal>
        <figure className="glass flex flex-col rounded-[24px] p-1.5 sm:rounded-[28px] sm:p-2">
          {work.phone ? (
            <div className="phone-mat flex flex-wrap justify-center gap-4 rounded-[18px] px-4 py-8 sm:gap-5 sm:rounded-[20px] sm:py-11">
              {gallery.map((image, i) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={`${work.name} 화면 ${i + 1}`}
                  width={image.width}
                  height={image.height}
                  className="w-[28%] rounded-[16px] shadow-[0_24px_48px_-20px_rgb(23_23_26/0.4)] sm:w-[17%]"
                  priority={i < 2}
                />
              ))}
            </div>
          ) : (
            <div className="thumb aspect-[16/10] sm:aspect-[2/1] sm:rounded-[20px]">
              <Image
                src={work.images[0].src}
                alt={`${work.name} 화면`}
                width={work.images[0].width}
                height={work.images[0].height}
                className="cover"
                priority
              />
            </div>
          )}
          <figcaption className="sr-only">{work.name} 대표 화면</figcaption>
        </figure>
      </Reveal>

      {/* 본문 — 문제/설계/결과, 섹션마다 유리 패널 */}
      <div className="mt-4 flex flex-col gap-4">
        {work.detail.sections.map((section, i) => (
          <Reveal key={section.heading} delay={i * 60}>
            <section
              aria-labelledby={`sec-${i}`}
              className="glass grid gap-6 rounded-[24px] px-6 py-8 sm:px-11 sm:py-10 lg:grid-cols-[240px_minmax(0,720px)_minmax(0,1fr)] lg:gap-12"
            >
              <div className="flex flex-col gap-2 lg:sticky lg:top-[92px] lg:self-start">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h2
                  id={`sec-${i}`}
                  className="text-[24px] font-medium tracking-[-0.02em] sm:text-[26px]"
                >
                  {section.heading}
                </h2>
              </div>
              <p className="text-[16px] leading-[1.8] text-body text-pretty sm:text-[17px]">
                {section.body}
              </p>
            </section>
          </Reveal>
        ))}
      </div>

      {/* 갤러리 — 가로 스크린샷만. 폰 스크린샷은 대표 액자에 이미 나란히 있다 */}
      {!work.phone && work.detail.gallery.length > 0 ? (
        <Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {work.detail.gallery.map((image, i) => (
              <figure key={image.src} className="glass rounded-[24px] p-1.5">
                <div className="thumb aspect-[16/10]">
                  <Image
                    src={image.src}
                    alt={`${work.name} 추가 화면 ${i + 1}`}
                    width={image.width}
                    height={image.height}
                    className="cover"
                  />
                </div>
              </figure>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* 다른 프로젝트 */}
      <section aria-labelledby="others-h" className="mt-20">
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
