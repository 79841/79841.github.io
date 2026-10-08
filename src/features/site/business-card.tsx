"use client";

import { useRef } from "react";
import type { PointerEvent } from "react";
import { profile } from "@/shared/lib/profile";

/**
 * 유리 명함 — 포인터를 따라 살짝 기운다. 안의 메일·GitHub 주소가 그대로 링크다.
 * 기울기는 CSS 변수만 바꿔 리렌더 없이 그린다. 터치 기기와 모션 줄이기에서는 기울지 않는다(CSS가 막는다).
 */
export function BusinessCard() {
  const ref = useRef<HTMLDivElement>(null);

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card || event.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
  };

  const reset = () => {
    ref.current?.style.removeProperty("--rx");
    ref.current?.style.removeProperty("--ry");
  };

  return (
    <div className="card-stage">
      <div
        ref={ref}
        onPointerMove={tilt}
        onPointerLeave={reset}
        className="biz-card glass"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[24px] leading-[1.2] font-medium tracking-[-0.03em] sm:text-[26px]">
              {profile.name}
            </span>
            <span className="text-[13px] text-muted">{profile.jobTitle}</span>
          </div>
          <span aria-hidden className="mt-1 size-7 shrink-0 rounded-full bg-ink" />
        </div>
        <div className="flex flex-col gap-1 font-mono text-[12.5px] text-muted">
          <a href={`mailto:${profile.email}`} className="self-start hover:text-ink">
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start hover:text-ink"
          >
            {profile.githubLabel}
          </a>
          <span>{profile.location}</span>
        </div>
      </div>
    </div>
  );
}
