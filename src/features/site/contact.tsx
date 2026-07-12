import { footerNote, profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";
import { SectionLabel } from "@/features/site/section-label";

export function Contact() {
  return (
    <section id="contact" className="mt-32 scroll-mt-16">
      <SectionLabel index="04" title="Contact" />
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

      <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-2 border-t border-hairline py-10 font-mono text-[10px] tracking-[0.15em] text-ghost">
        <span>© 2026 {profile.nameEn.toUpperCase()}</span>
        <span>{footerNote.toUpperCase()}</span>
      </footer>
    </section>
  );
}
