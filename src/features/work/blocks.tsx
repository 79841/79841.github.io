/**
 * 프로젝트 본문(MDX)에서 쓰는 블록.
 *
 * 글·표·코드·다이어그램은 블로그와 같은 마크다운으로 쓰고, 여기 있는 것은
 * 프로젝트 글에만 필요한 몇 가지다 — 요점 분류, 요점 목록, 번호 달린 화면,
 * 여러 장의 화면, 회고. 전부 정적이라 누르지 않아도 다 읽힌다.
 */
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Heading } from "@/shared/lib/blog";

/** 요점 제목 위의 작은 분류 — 아키텍처·핵심 구현·트러블슈팅·결과 */
export function Kind({ children }: { children: ReactNode }) {
  return <p className="point-kind">{children}</p>;
}

/** 도입 아래의 요점 목록 — 본문의 h2를 훑어 앞에 모아 보여준다 */
export function Points({ points }: { points: Heading[] }) {
  if (points.length < 2) return null;

  return (
    <nav aria-label="요점" className="work-points">
      <span className="eyebrow">요점</span>
      <ol>
        {points.map((point, i) => (
          <li key={point.id}>
            <a href={`#${point.id}`}>
              <span className="n" aria-hidden>
                {i + 1}
              </span>
              <span>{point.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface ShotPin {
  /** 화면 왼쪽에서의 위치, % */
  x: number;
  /** 화면 위쪽에서의 위치, % */
  y: number;
  title: string;
  text?: string;
}

interface ShotProps {
  src: string;
  width: number;
  height: number;
  /** 화면이 말하는 정보 — "스크린샷"이 아니라 내용을 적는다 */
  alt: string;
  pins?: ShotPin[];
}

/** 번호 달린 화면 — 화면 위 번호와 아래 설명이 짝을 이룬다 */
export function Shot({ src, width, height, alt, pins = [] }: ShotProps) {
  return (
    <figure className="work-shot">
      <div className="work-shot-frame glass">
        <div className="work-shot-img">
          <Image src={src} alt={alt} width={width} height={height} />
          {pins.map((pin, i) => (
            <span
              key={pin.title}
              aria-hidden
              className="work-pin"
              // 번호 위치는 화면마다 달라 값으로만 줄 수 있다 — 좌표만 변수로 넘긴다
              style={{ "--x": `${pin.x}%`, "--y": `${pin.y}%` } as CSSProperties}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
      {pins.length > 0 ? (
        <ol className="work-notes">
          {pins.map((pin, i) => (
            <li key={pin.title}>
              <span className="n" aria-hidden>
                {i + 1}
              </span>
              <span>
                <b>{pin.title}</b>
                {pin.text ? <span className="t">{pin.text}</span> : null}
              </span>
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}

interface ScreenImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * 여러 장의 화면 — 세로 화면(폰)은 매트 위에 나란히, 가로 화면은 두 칸으로.
 * 번호가 필요 없는 화면 묶음에 쓴다.
 */
export function Screens({ images, caption }: { images: ScreenImage[]; caption?: string }) {
  const portrait = images.every((image) => image.height > image.width);

  return (
    <figure className="work-screens">
      {portrait ? (
        <div className="phone-mat work-phones">
          {images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          ))}
        </div>
      ) : (
        <div className="work-landscape">
          {images.map((image) => (
            <div key={image.src} className="glass work-landscape-item">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
            </div>
          ))}
        </div>
      )}
      {caption ? <figcaption className="work-caption">{caption}</figcaption> : null}
    </figure>
  );
}

/** 회고 — 본문 끝에 고정되는 마무리. 요점 목록에는 들어가지 않는다 */
export function Retro({ children }: { children: ReactNode }) {
  return (
    <section className="work-retro" aria-label="회고">
      <p className="point-kind">회고</p>
      {children}
    </section>
  );
}
