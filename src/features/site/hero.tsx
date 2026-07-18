import { profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

export function Hero() {
  return (
    <header id="top" data-nav-ctx="§00 — HOME" className="pt-24 pb-28 sm:pt-28 sm:pb-32">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.2em] text-faint">
          {profile.role}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-6 max-w-2xl text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.22] font-bold tracking-[-0.035em]">
          {profile.thesis[0]}
          <br />
          <span className="text-muted">{profile.thesis[1]}</span>
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-8 max-w-md text-[14.5px] leading-[1.85] text-muted">
          {profile.summary}
        </p>
      </Reveal>
    </header>
  );
}
