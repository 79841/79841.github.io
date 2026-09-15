import { profile } from "@/shared/lib/profile";
import { ArrowRight } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

export function Hero() {
  return (
    <header
      id="top"
      className="flex flex-col items-center gap-6 pt-20 pb-14 text-center sm:gap-7 sm:pt-32 sm:pb-16"
    >
      <Reveal>
        <span className="chip h-[34px] gap-2.5 pr-3.5 pl-3">
          <span aria-hidden className="size-2 rounded-full bg-ink" />
          {profile.role}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="max-w-[1100px] text-[clamp(3rem,8.5vw,6rem)] leading-[1.02] font-medium tracking-[-0.035em] text-balance">
          {profile.headline}
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="max-w-[640px] text-[16px] leading-[1.6] text-muted sm:text-[20px]">
          {profile.summary}
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink"
          >
            이력서 보기 (PDF)
          </a>
          <a href="#work" className="btn btn-glass">
            프로젝트 보기 <ArrowRight />
          </a>
        </div>
      </Reveal>
    </header>
  );
}
