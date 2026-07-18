import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/shared/lib/profile";

interface WorkCardProps {
  work: Work;
  /** 뷰포트 초입에 놓이는 카드는 LCP가 되기 쉽다 — 지연 로딩을 끈다 */
  eager?: boolean;
}

function WorkVisual({ work, eager }: WorkCardProps) {
  if (work.phone) {
    return (
      <div className="flex items-end justify-center gap-5 overflow-hidden rounded-lg bg-imgbg ring-1 ring-hairline px-10 pt-10">
        {work.images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={`${work.name} 화면`}
            width={image.width}
            height={image.height}
            className="mono-img w-[38%] rounded-t-lg shadow-[0_2px_24px_rgb(0_0_0/0.12)]"
            loading={eager ? "eager" : undefined}
          />
        ))}
      </div>
    );
  }

  if (work.wide) {
    return (
      <div className="aspect-[2/1] overflow-hidden rounded-lg bg-imgbg ring-1 ring-hairline">
        <Image
          src={work.images[0].src}
          alt={`${work.name} 화면`}
          width={work.images[0].width}
          height={work.images[0].height}
          className="mono-img h-full w-full object-cover object-top group-hover:scale-[1.005]"
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center overflow-hidden rounded-lg bg-imgbg ring-1 ring-hairline px-10 pt-10">
      <Image
        src={work.images[0].src}
        alt={`${work.name} 화면`}
        width={work.images[0].width}
        height={work.images[0].height}
        className="mono-img max-h-[360px] w-full rounded-t-md object-cover object-top shadow-[0_2px_24px_rgb(0_0_0/0.10)]"
        loading={eager ? "eager" : undefined}
      />
    </div>
  );
}

function WorkCaption({ work }: { work: Work }) {
  return (
    <div className="mt-4 space-y-1.5">
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
        <h3
          className={`font-bold tracking-[-0.01em] ${
            work.wide ? "text-[16px]" : "text-[14.5px]"
          }`}
        >
          {work.name}
        </h3>
        <span
          className={`font-normal text-muted ${
            work.wide ? "text-[13px]" : "text-[12.5px]"
          }`}
        >
          {work.tagline}
        </span>
      </div>
      <p className="font-mono text-[10.5px] tracking-[0.05em] text-faint">
        {work.stack}
        {work.period ? (
          <>
            {" "}
            <span className="ml-3 text-ghost">{work.period}</span>
          </>
        ) : null}
      </p>
      {work.description ? (
        <p className="max-w-lg pt-1 text-[13px] leading-relaxed text-muted">
          {work.description}
        </p>
      ) : null}
    </div>
  );
}

export function WorkCard({ work, eager }: WorkCardProps) {
  return (
    <Link href={`/work/${work.slug}`} className="mono-card group block">
      <WorkVisual work={work} eager={eager} />
      <WorkCaption work={work} />
    </Link>
  );
}
