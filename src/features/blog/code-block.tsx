import type { ReactNode } from "react";
import { CopyButton } from "@/features/blog/copy-button";
import { Mermaid } from "@/features/blog/mermaid";
import { codeMetaOf } from "@/shared/lib/code";
import { highlightCode } from "@/shared/lib/highlight";

interface CodeBlockProps {
  children?: ReactNode;
}

/**
 * MDX의 <pre> — 언어 라벨과 복사 버튼이 붙은 유리 코드 블록.
 * ```mermaid 펜스는 코드 대신 다이어그램으로 그린다.
 * 색칠은 빌드 때 shiki가 하고, 모르는 언어면 원문을 그대로 둔다.
 */
export async function CodeBlock({ children }: CodeBlockProps) {
  const { lang, code } = codeMetaOf(children);

  if (lang === "mermaid") {
    return <Mermaid code={code} />;
  }

  const highlighted = await highlightCode(code, lang);

  return (
    <div className="relative mt-6">
      {lang ? (
        <span className="absolute top-3.5 left-5 font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">
          {lang}
        </span>
      ) : null}
      <CopyButton code={code} />
      <pre className="code-pre glass rounded-[18px] px-5 pt-11 pb-5 font-mono text-[13px] leading-[1.75]">
        {highlighted ? (
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          children
        )}
      </pre>
    </div>
  );
}
