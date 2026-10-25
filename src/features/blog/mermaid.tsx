"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useIsDark } from "@/shared/lib/theme";
import { Close, Expand } from "@/shared/ui/icons";

interface MermaidProps {
  /** ```mermaid 펜스의 원문 */
  code: string;
}

/**
 * 다이어그램 팔레트 — 흰(다크에서는 짙은) 면에 얇은 테두리, 가는 연결선.
 * 면과 선의 대비를 낮추고 글자만 또렷하게 둬서 본문과 같은 결로 읽히게 한다.
 */
function themeFor(dark: boolean) {
  const ink = dark ? "#e8e8e4" : "#17171a";
  const muted = dark ? "#a3a39d" : "#6f6f69";
  const surface = dark ? "#26262c" : "#ffffff";
  const surfaceAlt = dark ? "#1d1d22" : "#f7f7f5";
  const border = dark ? "#484852" : "#dcdad4";
  const line = dark ? "#5f5f6a" : "#b6b6b0";

  return {
    theme: "base" as const,
    /* 기본 룩("neo")은 도형마다 밝은 drop-shadow를 넣는다 — 종이 톤과 맞지 않아 끈다 */
    look: "classic" as const,
    themeVariables: {
      fontFamily:
        '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
      fontSize: "14px",
      background: "transparent",
      primaryColor: surface,
      primaryTextColor: ink,
      primaryBorderColor: border,
      secondaryColor: surfaceAlt,
      secondaryTextColor: ink,
      secondaryBorderColor: border,
      tertiaryColor: surfaceAlt,
      tertiaryTextColor: ink,
      tertiaryBorderColor: border,
      lineColor: line,
      textColor: ink,
      mainBkg: surface,
      nodeBorder: border,
      nodeTextColor: ink,
      clusterBkg: surfaceAlt,
      clusterBorder: border,
      edgeLabelBackground: dark ? "#1f1f24" : "#fbfbf9",
      titleColor: ink,
      noteBkgColor: surfaceAlt,
      noteTextColor: ink,
      noteBorderColor: border,
      actorBkg: surface,
      actorBorder: border,
      actorTextColor: ink,
      actorLineColor: line,
      signalColor: line,
      signalTextColor: ink,
      labelBoxBkgColor: surface,
      labelBoxBorderColor: border,
      labelTextColor: ink,
      loopTextColor: muted,
      activationBkgColor: surfaceAlt,
      activationBorderColor: border,
      sequenceNumberColor: surface,
    },
    /* 둥근 연결선과 넉넉한 간격 — 모서리도 도형도 각지지 않게 */
    flowchart: {
      curve: "basis" as const,
      htmlLabels: true,
      useMaxWidth: true,
      padding: 18,
      nodeSpacing: 44,
      rankSpacing: 58,
      diagramPadding: 4,
    },
    /* 참여자 상자를 좁게 두어 참여자가 대여섯이어도 본문 폭에서 덜 줄어든다 */
    sequence: {
      useMaxWidth: true,
      width: 118,
      actorMargin: 30,
      boxMargin: 10,
      mirrorActors: false,
      messageFontSize: 13,
      noteFontSize: 12,
    },
  };
}

/**
 * 머메이드 다이어그램 — 브라우저에서만 그린다.
 * mermaid는 DOM이 필요하고 번들이 크므로 마운트 후 동적으로 불러온다.
 * 테마가 바뀌면(토글·시스템) 같은 원문을 새 팔레트로 다시 그린다.
 */
export function Mermaid({ code }: MermaidProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // 크게 보기를 연 순간의 본문 속 다이어그램 폭 — 확대 판은 적어도 이보다 크게 그린다 (0이면 닫힘)
  const [zoomBase, setZoomBase] = useState(0);
  const figureRef = useRef<HTMLElement>(null);
  const openZoom = () => {
    const inline = figureRef.current?.querySelector("svg")?.getBoundingClientRect().width;
    setZoomBase(inline && inline > 0 ? inline : 1);
  };
  // 서버·첫 하이드레이션에서는 null — 그때는 라이트로 그리고 구독이 붙으면 다시 그린다
  const dark = useIsDark() === true;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          ...themeFor(dark),
        });
        const { svg: rendered } = await mermaid.render(`m-${id}-${dark ? "d" : "l"}`, code);
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, dark, id]);

  if (error) {
    /* 문법 오류는 숨기지 않고 원문과 함께 보여준다 — 글쓴이가 바로 고칠 수 있게 */
    return (
      <figure className="mermaid-figure mt-8 rounded-[18px] border border-hairline px-5 py-6">
        <p className="text-[13px] text-faint">다이어그램을 그리지 못했습니다: {error}</p>
        <pre className="mt-3 font-mono text-[12.5px] leading-[1.7]">{code}</pre>
      </figure>
    );
  }

  return (
    <>
      <figure ref={figureRef} className="mermaid-figure diagram-frame mt-8 mb-2 min-h-[120px]">
        <div
          role="img"
          aria-label="다이어그램"
          data-rendered={svg ? "" : undefined}
          onClick={svg ? openZoom : undefined}
          dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
        />
        {svg ? (
          <button
            type="button"
            className="diagram-expand"
            aria-label="다이어그램 크게 보기"
            onClick={openZoom}
          >
            <Expand />
          </button>
        ) : null}
      </figure>
      {zoomBase > 0 ? (
        <DiagramZoom svg={svg} baseWidth={zoomBase} onClose={() => setZoomBase(0)} />
      ) : null}
    </>
  );
}

/**
 * 크게 보기 — 본문 폭에 갇힌 다이어그램을 화면 크기의 판에 다시 그린다.
 * 판이 가로·세로로 화면을 채우고, SVG는 viewBox 비율을 지킨 채 그 판에 맞춰 커진다.
 * Esc, 바깥 클릭, 닫기 버튼으로 닫는다. 열려 있는 동안 본문 스크롤은 멈춘다.
 */
/** SVG viewBox의 가로세로 비율 — 판을 다이어그램 모양에 맞춰 키우는 데 쓴다 */
export function viewBoxRatio(svg: string): number {
  const match = /viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)\s*"/.exec(svg);
  const width = match ? Number(match[1]) : 0;
  const height = match ? Number(match[2]) : 0;
  return width > 0 && height > 0 ? width / height : 1.5;
}

function DiagramZoom({
  svg,
  baseWidth,
  onClose,
}: {
  svg: string;
  baseWidth: number;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // 넓은 다이어그램은 화면 폭까지, 긴 다이어그램은 화면 높이까지 키우되 본문보다 작아지지는 않게 한다
  const shape = { "--ratio": viewBoxRatio(svg), "--base": `${baseWidth}px` } as CSSProperties;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // 닫기 버튼은 오른쪽 위에 있어, 그냥 포커스하면 넓은 판이 그쪽으로 스크롤된 채 열린다
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="diagram-zoom" role="dialog" aria-modal="true" aria-label="다이어그램 크게 보기" onClick={onClose}>
      {/* 판 밖에 둔다 — 유리 판의 블러가 고정 위치의 기준을 판으로 바꿔 버리기 때문 */}
      <button ref={closeRef} type="button" className="diagram-zoom-close" aria-label="닫기" onClick={onClose}>
        <Close size={16} />
      </button>
      <div className="diagram-zoom-panel glass" onClick={(event) => event.stopPropagation()}>
        <div
          className="mermaid-figure diagram-zoom-stage"
          style={shape}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>,
    document.body,
  );
}
