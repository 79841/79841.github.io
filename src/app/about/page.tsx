import type { Metadata } from "next";
import { AboutBody } from "@/features/site/about";
import { Experience } from "@/features/site/experience";
import { SectionLabel } from "@/features/site/section-label";
import { profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "보안에서 시작해 프론트엔드로. 명인지의 소개와 기술 스택, 그리고 전체 경력 타임라인.",
  openGraph: {
    title: `About — ${profile.name}`,
    description: "보안에서 시작해 프론트엔드로.",
    url: "/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <main>
      <header className="pt-16 pb-14">
        <Reveal>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">
            About
          </h1>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.9] text-muted">
            {profile.summary}
          </p>
        </Reveal>
      </header>

      <section data-nav-ctx="§01 — PROFILE">
        <SectionLabel index="01" title="Profile" />
        <AboutBody />
      </section>

      <Experience index="02" navCtx="§02 — EXPERIENCE" />

      <section className="mt-32" data-nav-ctx="§03 — CONTACT">
        <SectionLabel index="03" title="Contact" />
        <Reveal>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.08em]">
            <a
              href={`mailto:${profile.email}`}
              className="text-muted transition-colors hover:text-ink"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              {profile.githubLabel} ↗
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-ink"
            >
              이력서 PDF ↓
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
