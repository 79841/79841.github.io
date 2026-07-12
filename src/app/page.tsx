import { Nav } from "@/features/site/nav";
import { Hero } from "@/features/site/hero";
import { Works } from "@/features/site/works";
import { Experience } from "@/features/site/experience";
import { About } from "@/features/site/about";
import { Contact } from "@/features/site/contact";
import { profile } from "@/shared/lib/profile";

export default function Home() {
  return (
    <>
      {/* 좌측 세로 레일 — 조용한 시그니처 */}
      <span
        aria-hidden
        className="fixed bottom-8 left-5 hidden font-mono text-[9px] tracking-[0.4em] text-ghost [writing-mode:vertical-rl] lg:block"
      >
        {profile.nameEn.toUpperCase()} — PORTFOLIO 2026
      </span>

      <div className="mx-auto max-w-4xl px-6">
        <Nav />
        <main>
          <Hero />
          <Works />
          <Experience />
          <About />
          <Contact />
        </main>
      </div>
    </>
  );
}
