"use client";

import { useEffect, useId, useState } from "react";
import { useIsDark } from "@/shared/lib/theme";

interface MermaidProps {
  /** ```mermaid 펜스의 원문 */
  code: string;
}

/** 잉크 단색 팔레트 — 사이트 토큰과 같은 값. 다크에서는 종이·잉크가 뒤집힌다 */
function themeFor(dark: boolean) {
  const ink = dark ? "#e8e8e4" : "#17171a";
  const paper = dark ? "#1c1c1f" : "#ffffff";
  const muted = dark ? "#a3a39d" : "#55554f";
  const line = dark ? "#84847e" : "#6f6f69";
  return {
    theme: "base" as const,
    themeVariables: {
      fontFamily:
        '"Pretendard Variable", Pretendard, -apple-system, system-ui, sans-serif',
      fontSize: "14px",
      primaryColor: paper,
      primaryTextColor: ink,
      primaryBorderColor: line,
      secondaryColor: dark ? "#26262a" : "#f4f4f1",
      secondaryTextColor: ink,
      secondaryBorderColor: line,
      tertiaryColor: dark ? "#131315" : "#ecece8",
      tertiaryTextColor: ink,
      tertiaryBorderColor: line,
      lineColor: line,
      textColor: ink,
      mainBkg: paper,
      nodeBorder: line,
      clusterBkg: dark ? "#131315" : "#f4f4f1",
      clusterBorder: line,
      edgeLabelBackground: paper,
      titleColor: ink,
      noteBkgColor: dark ? "#26262a" : "#f4f4f1",
      noteTextColor: ink,
      noteBorderColor: line,
      actorBkg: paper,
      actorBorder: line,
      actorTextColor: ink,
      signalColor: line,
      signalTextColor: ink,
      labelBoxBkgColor: paper,
      labelTextColor: ink,
      loopTextColor: muted,
      activationBkgColor: dark ? "#26262a" : "#ecece8",
      activationBorderColor: line,
      sequenceNumberColor: paper,
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
      <figure className="mermaid-figure glass mt-6 rounded-[18px] p-5">
        <p className="text-[13px] text-faint">다이어그램을 그리지 못했습니다: {error}</p>
        <pre className="mt-3 overflow-x-auto font-mono text-[12.5px] leading-[1.7]">{code}</pre>
      </figure>
    );
  }

  return (
    <figure
      className="mermaid-figure glass mt-6 min-h-[120px] rounded-[18px] p-5"
      role="img"
      aria-label="다이어그램"
      data-rendered={svg ? "" : undefined}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
