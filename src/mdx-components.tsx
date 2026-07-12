import type { MDXComponents } from "mdx/types";

/**
 * 블로그 본문(.md)의 기본 태그를 사이트 디자인 시스템에 맞춘다.
 * 코드 블록 안의 <code>는 globals.css의 `.post-body pre code`가 되돌린다.
 */
const components: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-14 scroll-mt-24 text-[17px] font-bold tracking-[-0.02em] text-ink"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 scroll-mt-24 text-[14px] font-semibold tracking-[-0.01em] text-ink"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mt-5 text-[14px] leading-[1.95] text-muted" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-muted"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 text-[14px] leading-[1.9] text-muted marker:text-ghost"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 text-[14px] leading-[1.9] text-muted marker:font-mono marker:text-ghost"
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
      className="mt-6 border-l border-hairline pl-5 text-[14px] leading-[1.9] text-faint"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-imgbg px-1.5 py-0.5 font-mono text-[12.5px] text-ink ring-1 ring-hairline"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg bg-imgbg p-5 font-mono text-[12.5px] leading-[1.8] text-ink ring-1 ring-hairline"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: (props) => <hr className="mt-12 border-hairline" {...props} />,
  // 표는 좁은 화면에서 본문을 밀지 않도록 자기 안에서 가로 스크롤한다
  table: ({ children, ...props }) => (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[13px]" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border-b border-hairline py-2.5 pr-6 font-mono text-[10.5px] font-normal tracking-[0.1em] text-ghost"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border-b border-hairline py-2.5 pr-6 leading-[1.8] text-muted"
      {...props}
    >
      {children}
    </td>
  ),
  // 듀오톤 시그니처 — 본문 이미지도 호버할 때만 원색이 돌아온다
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element -- 마크다운 이미지는 크기를 미리 알 수 없어 next/image를 쓸 수 없다
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      className="mono-img mt-8 w-full rounded-lg bg-imgbg ring-1 ring-hairline"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
