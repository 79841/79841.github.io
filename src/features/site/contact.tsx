import { BusinessCard } from "@/features/site/business-card";
import { profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 마무리 — 왼쪽 큰 제목과 버튼, 오른쪽 유리 명함 한 장 */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="mt-24 scroll-mt-20">
      <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">CONTACT</span>
          <h2
            id="contact-h"
            className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.035em]"
          >
            Get in touch.
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-ink">
              메일 보내기
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
        <BusinessCard />
      </Reveal>
    </section>
  );
}
