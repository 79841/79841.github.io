/**
 * 유리 위 글자색 판단 — 뒤에 깔린 것이 밝은지 어두운지를 측정한다.
 *
 * 두 경로가 있다:
 * - 이미지 캡션: 이미지의 해당 영역 픽셀을 캔버스로 읽어 평균 휘도를 낸다 (imageRegionLuminance)
 * - 떠 있는 헤더: 그 자리에 쌓인 요소들을 elementsFromPoint로 훑어 첫 번째 불투명 배경의 휘도를 낸다 (toneBehind)
 */

export type Tone = "light" | "dark";

export interface Rgb {
  r: number;
  g: number;
  b: number;
  a: number;
}

/** sRGB → 상대 휘도 (0 = 검정, 1 = 흰색). WCAG 공식 */
export function relativeLuminance(r: number, g: number, b: number): number {
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** getComputedStyle이 주는 "rgb(…)" / "rgba(…)" 문자열을 읽는다. 다른 형식은 null */
export function parseCssColor(value: string): Rgb | null {
  const match = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/i.exec(
    value.trim(),
  );
  if (!match) return null;
  const alphaRaw = match[4];
  const a =
    alphaRaw === undefined
      ? 1
      : alphaRaw.endsWith("%")
        ? Number(alphaRaw.slice(0, -1)) / 100
        : Number(alphaRaw);
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]), a };
}

/** 휘도 → 톤. 0.45 위는 밝은 배경이라 잉크 글자, 아래는 어두운 배경이라 흰 글자 */
export function toneFromLuminance(luminance: number): Tone {
  return luminance > 0.45 ? "light" : "dark";
}

export interface Region {
  /** 0~1, 이미지 폭·높이에 대한 비율 */
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * 이미지의 한 영역 평균 휘도. 같은 출처 이미지만 읽을 수 있다 (캔버스 오염).
 * 캔버스를 못 쓰는 환경(jsdom 등)이나 아직 안 그려진 이미지는 null.
 */
export function imageRegionLuminance(
  img: HTMLImageElement,
  region: Region,
  sample = 24,
): number | null {
  if (!img.complete || img.naturalWidth === 0) return null;
  const canvas = document.createElement("canvas");
  canvas.width = sample;
  canvas.height = sample;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  try {
    ctx.drawImage(
      img,
      img.naturalWidth * region.x,
      img.naturalHeight * region.y,
      img.naturalWidth * region.w,
      img.naturalHeight * region.h,
      0,
      0,
      sample,
      sample,
    );
    const { data } = ctx.getImageData(0, 0, sample, sample);
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      sum += relativeLuminance(data[i], data[i + 1], data[i + 2]);
    }
    return sum / (data.length / 4);
  } catch {
    return null;
  }
}

/**
 * 화면의 한 점 뒤에 무엇이 있는지 — 쌓인 요소를 위에서부터 훑으며
 * `data-tone`을 단 요소나 불투명 배경을 가진 첫 요소로 판단한다.
 * `ignore` 안의 요소(떠 있는 헤더 자신)는 건너뛴다.
 */
export function toneBehind(
  x: number,
  y: number,
  ignore: Element | null,
  fallback: Tone,
): Tone {
  if (typeof document.elementsFromPoint !== "function") return fallback;
  for (const el of document.elementsFromPoint(x, y)) {
    if (ignore && ignore.contains(el)) continue;
    const marked = (el as HTMLElement).dataset?.tone;
    if (marked === "light" || marked === "dark") return marked;
    const bg = parseCssColor(getComputedStyle(el).backgroundColor);
    if (bg && bg.a >= 0.5) {
      return toneFromLuminance(relativeLuminance(bg.r, bg.g, bg.b));
    }
  }
  return fallback;
}

/** 페이지 종이색의 톤 — html 배경으로 판단한다. 다크 테마면 dark */
export function pageTone(): Tone {
  const bg = parseCssColor(getComputedStyle(document.documentElement).backgroundColor);
  if (!bg) return "light";
  return toneFromLuminance(relativeLuminance(bg.r, bg.g, bg.b));
}
