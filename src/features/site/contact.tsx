import { profile } from "@/shared/lib/profile";
import { ArrowUpRight } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

/** 마무리 CTA — 큰 유리 패널 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="mt-24 scroll-mt-20">
      <Reveal>
        <div className="glass-strong flex flex-col gap-8 rounded-[28px] px-7 py-10 sm:rounded-[32px] sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-[72px] lg:py-[72px]">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">CONTACT</span>
            <h2
              id="contact-h"
              className="text-[36px] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[52px]"
            >
              Get in touch.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="text-[17px] text-muted transition-colors hover:text-ink sm:text-[20px]"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-ink">
              메일 보내기
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
            >
              GitHub <ArrowUpRight />
            </a>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
            >
              이력서 PDF
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
