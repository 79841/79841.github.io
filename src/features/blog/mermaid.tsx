"use client";

import { useEffect, useId, useState } from "react";
import { useIsDark } from "@/shared/lib/theme";

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
    sequence: {
      useMaxWidth: true,
      actorMargin: 56,
      boxMargin: 12,
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
    <figure
      className="mermaid-figure mt-8 mb-2 min-h-[120px]"
      role="img"
      aria-label="다이어그램"
      data-rendered={svg ? "" : undefined}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
