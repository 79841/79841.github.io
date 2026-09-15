import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "@/features/blog/code-block";

/**
 * 블로그 본문(.md)의 기본 태그를 사이트 디자인 시스템에 맞춘다.
 * 코드 블록은 CodeBlock이 맡는다 — ```mermaid 펜스는 다이어그램으로 그린다.
 * 코드 블록 안의 <code>는 globals.css의 `.post-body pre code`가 인라인 스타일을 되돌린다.
 */
const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-12 scroll-mt-24 text-[24px] leading-[1.3] font-medium tracking-[-0.02em] text-ink sm:text-[26px]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-9 scroll-mt-24 text-[19px] leading-[1.35] font-medium tracking-[-0.01em] text-ink"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-5 text-[16px] leading-[1.8] text-body sm:text-[17px]" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="underline decoration-ink/35 underline-offset-[3px] transition-colors hover:decoration-ink"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.8] text-body marker:text-ghost sm:text-[17px]"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-[16px] leading-[1.8] text-body marker:font-mono marker:text-ghost sm:text-[17px]"
      {...props}
    >
      {children}
    </ol>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="glass mt-6 rounded-[18px] px-6 py-4 text-[16px] leading-[1.8] text-muted [&>p]:mt-0"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded-md bg-imgbg px-1.5 py-0.5 font-mono text-[0.88em] text-ink"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  hr: (props) => <hr className="mt-12 border-hairline" {...props} />,
  // 표는 좁은 화면에서 본문을 밀지 않도록 유리 패널 안에서 가로 스크롤한다
  table: ({ children, ...props }) => (
    <div className="glass mt-8 overflow-x-auto rounded-[18px] px-5 py-2">
      <table className="w-full border-collapse text-left text-[14px]" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-hairline py-3 pr-6 font-mono text-[11px] font-normal tracking-[0.08em] text-faint"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-hairline py-3 pr-6 leading-[1.7] text-body"
      {...props}
    >
      {children}
    </td>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element -- 마크다운 이미지는 크기를 미리 알 수 없어 next/image를 쓸 수 없다
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="mt-8 w-full rounded-[18px] bg-imgbg"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
