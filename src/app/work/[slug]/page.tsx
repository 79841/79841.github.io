import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, works } from "@/shared/lib/profile";
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
  const next = works[(index + 1) % works.length];

  return (
    <main>
      <header className="pt-16 pb-14">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4">
            <Link
              href="/work"
              className="font-mono text-[10px] tracking-[0.2em] text-ghost transition-colors hover:text-ink"
            >
              ← WORK
            </Link>
            <span className="font-mono text-[10px] tracking-[0.15em] text-ghost">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(works.length).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-5 font-mono text-[10.5px] tracking-[0.15em] text-ghost">
            {work.period}
          </p>
          <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">
            {work.name}{" "}
            <span className="ml-1 text-[0.45em] font-normal text-muted">
              {work.tagline}
            </span>
          </h1>
          <p className="mt-4 font-mono text-[11px] tracking-[0.05em] text-faint">
            {work.stack}
          </p>
        </Reveal>
      </header>

      {/* 대표 이미지 */}
      <Reveal>
        <div className="mono-card group">
          {work.phone ? (
            <div className="flex items-end justify-center gap-5 overflow-hidden rounded-lg bg-imgbg ring-1 ring-hairline px-10 pt-10">
              {work.images.map((image) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={`${work.name} 화면`}
                  width={image.width}
                  height={image.height}
                  className="mono-img w-[38%] rounded-t-lg shadow-[0_2px_24px_rgb(0_0_0/0.12)]"
                  priority
                />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg bg-imgbg ring-1 ring-hairline">
              <Image
                src={work.images[0].src}
                alt={`${work.name} 화면`}
                width={work.images[0].width}
                height={work.images[0].height}
                className="mono-img w-full"
                priority
              />
            </div>
          )}
        </div>
      </Reveal>

      {/* 본문 — 문제/설계/결과 */}
      <div className="mx-auto max-w-2xl py-20">
        {work.detail.sections.map((section, i) => (
          <Reveal key={section.heading} delay={i * 60}>
            <section className={i > 0 ? "mt-14" : ""}>
              <h2 className="flex items-baseline gap-4 text-[13px] font-semibold tracking-[0.02em]">
                <span className="font-mono text-[10px] font-normal text-ghost">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>
              <p className="mt-4 text-[14px] leading-[1.95] text-muted">
                {section.body}
              </p>
            </section>
          </Reveal>
        ))}

        <Reveal delay={100}>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.08em]">
            {work.detail.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* 갤러리 */}
      {work.detail.gallery.length > 0 ? (
        <Reveal>
          <div
            className={`grid gap-6 ${
              work.phone ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {work.detail.gallery.map((image) => (
              <div key={image.src} className="mono-card group">
                <div
                  className={`overflow-hidden rounded-lg bg-imgbg ring-1 ring-hairline ${
                    work.phone ? "px-6 pt-6" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={`${work.name} 추가 화면`}
                    width={image.width}
                    height={image.height}
                    className={`mono-img w-full ${
                      work.phone
                        ? "rounded-t-lg shadow-[0_2px_16px_rgb(0_0_0/0.10)]"
                        : ""
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* 다음 작업 */}
      <div className="mt-24 border-t border-hairline">
        <Link
          href={`/work/${next.slug}`}
          className="group flex items-baseline justify-between py-10 transition-colors hover:bg-imgbg/50"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-ghost">
            NEXT WORK
          </span>
          <span className="text-[15px] font-bold">
            {next.name}
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </Link>
      </div>
    </main>
  );
}
