"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import type { Work } from "@/shared/lib/profile";
import { imageRegionLuminance, toneFromLuminance } from "@/shared/lib/tone";
import type { Tone } from "@/shared/lib/tone";

interface WorkThumbProps {
  work: Work;
  /** 뷰포트 초입에 놓이는 이미지는 LCP가 되기 쉽다 — 지연 로딩을 끈다 */
  priority?: boolean;
  /** 썸네일 비율 — 카드는 4/3, 대표 카드는 넓게 */
  className?: string;
  /** 이미지 위 왼쪽 아래 유리 캡션 — 이름과 한 줄 메타 */
  caption?: ReactNode;
}

/** 캡션이 놓이는 왼쪽 아래와 배지가 놓이는 오른쪽 위 — 이미지 비율 기준 */
const CAPTION_REGION = { x: 0, y: 0.7, w: 0.5, h: 0.3 };
const BADGE_REGION = { x: 0.7, y: 0, w: 0.3, h: 0.25 };

/**
 * 카드 썸네일 — 유리 카드 안의 이미지 슬롯. 텍스트는 이미지 위에 유리 캡션으로만 얹는다.
 * 캡션과 배지의 유리는 그 자리 이미지 픽셀의 밝기를 읽어 밝은 유리(잉크 글자)와
 * 어두운 유리(흰 글자) 중 고른다. 측정 전에는 profile의 dark 표시를 따른다.
 * 폰 스크린샷은 크롭하지 않고 매트 위에 두 장을 나란히 세운다.
 */
export function WorkThumb({
  work,
  priority,
  className = "aspect-[4/3]",
  caption,
}: WorkThumbProps) {
  const initial: Tone = !work.phone && work.dark ? "dark" : "light";
  const [tones, setTones] = useState<{ caption: Tone; badge: Tone }>({
    caption: initial,
    badge: initial,
  });

  const measure = (img: HTMLImageElement) => {
    const cap = imageRegionLuminance(img, CAPTION_REGION);
    const badge = imageRegionLuminance(img, BADGE_REGION);
    if (cap === null || badge === null) return;
    const next = { caption: toneFromLuminance(cap), badge: toneFromLuminance(badge) };
    setTones((prev) =>
      prev.caption === next.caption && prev.badge === next.badge ? prev : next,
    );
  };

  const overlayClass = (tone: Tone) => (tone === "dark" ? "glass-dark" : "glass-light");

  return (
    <div className={`thumb ${className}`} data-tone={tones.caption}>
      {work.phone ? (
        <PhoneMat work={work} priority={priority} />
      ) : (
        <Cover work={work} priority={priority} onMeasure={measure} />
      )}
      {work.badge ? (
        <span
          className={`absolute top-2.5 right-2.5 inline-flex h-6 items-center rounded-full px-2 text-[11px] ${overlayClass(
            tones.badge,
          )}`}
        >
          {work.badge}
        </span>
      ) : null}
      {caption ? (
        <div
          className={`absolute bottom-2.5 left-2.5 flex max-w-[calc(100%-20px)] items-center gap-3 rounded-full py-1.5 pr-3.5 pl-3.5 ${overlayClass(
            tones.caption,
          )}`}
        >
          {caption}
        </div>
      ) : null}
    </div>
  );
}

function Cover({
  work,
  priority,
  onMeasure,
}: {
  work: Work;
  priority?: boolean;
  onMeasure: (img: HTMLImageElement) => void;
}) {
  const image = work.images[0];
  return (
    <Image
      src={image.src}
      alt={`${work.name} 화면`}
      width={image.width}
      height={image.height}
      className="cover"
      priority={priority}
      onLoad={(event) => onMeasure(event.currentTarget)}
    />
  );
}

function PhoneMat({ work, priority }: { work: Work; priority?: boolean }) {
  const [first, second] = work.images;
  return (
    <>
      <div aria-hidden className="phone-mat absolute inset-0" />
      <div className="absolute inset-x-0 top-[8%] flex justify-center gap-[5%]">
        <Image
          src={first.src}
          alt={`${work.name} 화면`}
          width={first.width}
          height={first.height}
          className="w-[34%] rounded-[12px] shadow-[0_18px_36px_-16px_rgb(23_23_26/0.45)]"
          priority={priority}
        />
        {second ? (
          <Image
            src={second.src}
            alt={`${work.name} 화면`}
            width={second.width}
            height={second.height}
            className="w-[34%] translate-y-[8%] rounded-[12px] shadow-[0_18px_36px_-16px_rgb(23_23_26/0.45)]"
            priority={priority}
          />
        ) : null}
      </div>
    </>
  );
}
