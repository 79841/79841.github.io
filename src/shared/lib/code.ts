/**
 * MDX가 넘겨주는 <pre> 자식에서 언어와 원문을 뽑는다.
 *
 * @next/mdx는 ```lang 펜스를 <pre><code className="language-lang">텍스트</code></pre>로
 * 컴파일한다. 언어가 mermaid면 코드 대신 다이어그램을 그려야 하므로 여기서 갈라낸다.
 */
import { isValidElement } from "react";
import type { ReactNode } from "react";

export interface CodeMeta {
  /** 펜스의 언어 — 없으면 빈 문자열 */
  lang: string;
  /** 코드 원문. 끝의 개행은 떼어낸다 */
  code: string;
}

/** className "language-ts"에서 "ts"를 얻는다 */
export function langFromClassName(className: unknown): string {
  if (typeof className !== "string") return "";
  const match = /(?:^|\s)language-([\w+-]+)/.exec(className);
  return match ? match[1] : "";
}

/** React 자식 트리에서 문자열만 이어 붙인다 */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
}

export function codeMetaOf(children: ReactNode): CodeMeta {
  const only = Array.isArray(children) ? children[0] : children;
  const lang = isValidElement<{ className?: string }>(only)
    ? langFromClassName(only.props.className)
    : "";
  return { lang, code: textOf(children).replace(/\n$/, "") };
}
