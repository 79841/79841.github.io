import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/shared/lib/profile";
import { moreWorks, works } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";
import { SectionLabel } from "@/features/site/section-label";

function WorkVisual({ work }: { work: Work }) {
  if (work.phone) {
    return (
      <div className="flex items-end justify-center gap-5 overflow-hidden rounded-lg bg-imgbg px-10 pt-10">
        {work.images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={`${work.name} 화면`}
            width={image.width}
            height={image.height}
            className="mono-img w-[38%] rounded-t-lg shadow-[0_2px_24px_rgb(0_0_0/0.12)]"
          />
        ))}
      </div>
    );
  }

  if (work.wide) {
    return (
      <div className="overflow-hidden rounded-lg bg-imgbg">
        <Image
          src={work.images[0].src}
          alt={`${work.name} 화면`}
          width={work.images[0].width}
          height={work.images[0].height}
          className="mono-img w-full group-hover:scale-[1.005]"
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center overflow-hidden rounded-lg bg-imgbg px-10 pt-10">
      <Image
        src={work.images[0].src}
        alt={`${work.name} 화면`}
        width={work.images[0].width}
        height={work.images[0].height}
        className="mono-img w-full rounded-t-md shadow-[0_2px_24px_rgb(0_0_0/0.10)]"
      />
    </div>
  );
}

function WorkCaption({ work }: { work: Work }) {
  return (
    <div
      className={`mt-4 grid gap-2 ${
        work.wide ? "sm:grid-cols-[1fr_auto] sm:items-baseline" : ""
      }`}
    >
      <div className={work.wide ? "" : "flex items-baseline justify-between gap-4"}>
        <h3
          className={`font-bold tracking-[-0.01em] ${
            work.wide ? "text-[16px]" : "text-[14.5px]"
          }`}
        >
          {work.name}
          <span
            className={`ml-2.5 font-normal text-muted ${
              work.wide ? "text-[13px]" : "text-[12.5px]"
            }`}
          >
            {work.tagline}
          </span>
        </h3>
        {!work.wide && work.period ? (
          <p className="shrink-0 font-mono text-[10px] text-ghost">
            {work.period}
          </p>
        ) : null}
      </div>
      <p className="font-mono text-[10.5px] tracking-[0.05em] text-faint">
        {work.stack}
        {work.wide && work.period ? (
          <span className="ml-4 text-ghost">{work.period}</span>
        ) : null}
      </p>
      {work.description ? (
        <p className="max-w-lg text-[13px] leading-relaxed text-muted sm:col-span-2">
          {work.description}
        </p>
      ) : null}
    </div>
  );
}

function WorkCard({ work }: { work: Work }) {
  return (
    <Link href={`/work/${work.slug}`} className="mono-card group block">
      <WorkVisual work={work} />
      <WorkCaption work={work} />
    </Link>
  );
}

export function Works() {
  const [featured, ...rest] = works;

  return (
    <section id="work" className="scroll-mt-16">
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
        {rest.map((work, i) => {
          const lastAndOdd = i === rest.length - 1 && rest.length % 2 === 1;
          return (
            <Reveal
              key={work.name}
              delay={(i % 2) * 100}
              className={lastAndOdd ? "sm:col-span-2" : ""}
            >
              <WorkCard work={work} />
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <ol className="mt-16 divide-y divide-hairline border-t border-hairline">
          {moreWorks.map((work) => {
            const row = (
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4">
                <h3 className="w-32 shrink-0 text-[13.5px] font-bold">
                  {work.name}
                </h3>
                <p className="w-24 shrink-0 font-mono text-[10px] text-ghost">
                  {work.period}
                </p>
                <p className="flex-1 text-[12.5px] text-muted">{work.note}</p>
                {work.href ? (
                  <span
                    aria-hidden
                    className="font-mono text-[11px] text-ghost transition-colors group-hover:text-ink"
                  >
                    ↗
                  </span>
                ) : null}
              </div>
            );
            return (
              <li key={work.name}>
                {work.href ? (
                  <a
                    href={work.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transition-colors hover:bg-imgbg/60"
                  >
                    {row}
                  </a>
                ) : (
                  row
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
