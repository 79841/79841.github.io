import type { ReactNode } from "react";
import { CopyButton } from "@/features/blog/copy-button";
import { Mermaid } from "@/features/blog/mermaid";
import { codeMetaOf } from "@/shared/lib/code";
import { highlightCode } from "@/shared/lib/highlight";

interface CodeBlockProps {
  children?: ReactNode;
}

/**
 * MDX의 <pre> — 머리줄에 언어와 복사 버튼을 두고 그 아래 코드를 놓는다.
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
    <figure className="code-card glass mt-6 overflow-hidden rounded-[18px]">
      <figcaption className="code-head flex items-center justify-between gap-3 pt-3 pr-3 pb-0.5 pl-5">
        <span className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
          {lang || "code"}
        </span>
        <CopyButton code={code} />
      </figcaption>
      <pre className="code-pre px-5 pt-2 pb-5 font-mono text-[13px] leading-[1.75]">
        {highlighted ? (
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          children
        )}
      </pre>
    </figure>
  );
}
