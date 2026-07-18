import { SectionLabel } from "@/features/site/section-label";
import { profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 메인 마무리 CTA — 푸터는 site-footer.tsx로 분리해 전 페이지 공통이 됐다 */
export function Contact() {
  return (
    <section id="contact" data-nav-ctx="§05 — CONTACT" className="mt-32 scroll-mt-16">
      <SectionLabel index="05" title="Contact" />
      <Reveal>
        <p className="max-w-xl text-[clamp(1.4rem,3vw,2rem)] leading-[1.4] font-bold tracking-[-0.02em]">
          함께 만들 것이 있다면,
          <br />
          <a
            href={`mailto:${profile.email}`}
            className="text-muted underline decoration-hairline decoration-2 underline-offset-8 transition-colors hover:text-ink hover:decoration-ink"
          >
            {profile.email}
          </a>
        </p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] tracking-[0.08em]">
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
  );
}
