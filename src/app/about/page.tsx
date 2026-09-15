import type { Metadata } from "next";
import { Contact } from "@/features/site/contact";
import { Experience } from "@/features/site/experience";
import { StackPanels } from "@/features/site/stack";
import { experiences, profile, stats } from "@/shared/lib/profile";
import { ArrowUpRight } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `${profile.aboutHeadline} ${profile.aboutSummary}`,
  openGraph: {
    title: `About — ${profile.name}`,
    description: profile.aboutSummary,
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  const now = experiences.find((entry) => entry.current) ?? experiences[0];

  return (
    <main>
      <header className="flex flex-col items-center gap-6 pt-16 pb-6 text-center sm:pt-24 sm:pb-8">
        <Reveal>
          <span className="chip h-[34px] gap-2.5 pr-3.5 pl-3">
            <span aria-hidden className="size-2 rounded-full bg-ink" />
            {profile.name} · {profile.role}
          </span>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="max-w-[900px] text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.06] font-medium tracking-[-0.035em] text-balance">
            {profile.aboutHeadline}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-[680px] text-[17px] leading-[1.55] text-muted text-pretty sm:text-[20px]">
            {profile.aboutSummary}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ink"
            >
              이력서 PDF
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
            >
              {profile.githubLabel} <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </header>

      {/* 숫자와 현재 — 유리 카드 대신 괘선으로 나눈 한 덩어리 */}
      <Reveal>
        <section aria-label="요약" className="mt-10 sm:mt-14">
          <dl className="grid divide-y divide-hairline border-y border-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1.5 px-4 py-7 text-center sm:py-9"
              >
                <dt className="eyebrow">{stat.label}</dt>
                <dd className="flex items-baseline gap-2">
                  <span className="text-[34px] leading-none font-medium tracking-[-0.035em] sm:text-[40px]">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[12px] text-faint">{stat.note}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col items-center gap-2.5 border-b border-hairline px-4 py-5 text-center sm:flex-row sm:justify-center sm:gap-4">
            <span className="eyebrow flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-ink" />
              NOW
            </span>
            <p className="text-[16px] leading-[1.4]">
              {now.org}
              <span className="text-muted"> · {now.role}</span>
            </p>
            <span className="font-mono text-[12px] text-faint">{now.period}</span>
          </div>
        </section>
      </Reveal>

      <StackPanels />
      <Experience detail />
      <Contact />
    </main>
  );
}
