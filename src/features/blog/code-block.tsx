import type { ReactNode } from "react";
import { CopyButton } from "@/features/blog/copy-button";
import { Mermaid } from "@/features/blog/mermaid";
import { codeMetaOf } from "@/shared/lib/code";

interface CodeBlockProps {
  children?: ReactNode;
}

/**
 * MDX의 <pre> — 언어 라벨과 복사 버튼이 붙은 유리 코드 블록.
 * ```mermaid 펜스는 코드 대신 다이어그램으로 그린다.
 */
export function CodeBlock({ children }: CodeBlockProps) {
  const { lang, code } = codeMetaOf(children);

  if (lang === "mermaid") {
    return <Mermaid code={code} />;
  }

  return (
    <div className="relative mt-6">
      {lang ? (
        <span className="absolute top-3.5 left-4 font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase">
          {lang}
        </span>
      ) : null}
      <CopyButton code={code} />
      <pre
        tabIndex={0}
        className="glass overflow-x-auto rounded-[18px] px-6 pt-11 pb-6 font-mono text-[13px] leading-[1.7] text-body"
      >
        {children}
      </pre>
    </div>
  );
}
