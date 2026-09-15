/**
 * 코드 펜스를 빌드 때 색칠한다 (shiki).
 *
 * output: "export"라 모든 호출이 빌드 중에 끝나고, 브라우저로는 색칠된 마크업만 간다.
 * 라이트·다크 두 벌을 한 번에 칠해 각 토큰에 `--shiki-light` / `--shiki-dark`를
 * 남기고, 어느 쪽을 쓸지는 globals.css가 테마에 따라 고른다.
 */

import { codeToHtml } from "shiki";
import { CODE_THEME_DARK, CODE_THEME_LIGHT } from "@/shared/lib/code-theme";

/** 흔히 쓰는 별칭을 shiki가 아는 이름으로 — 없는 언어는 색칠하지 않는다 */
const ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  yml: "yaml",
  md: "markdown",
  py: "python",
  plaintext: "text",
  txt: "text",
};

/**
 * 색칠한 마크업을 돌려준다. 모르는 언어거나 실패하면 null —
 * 부르는 쪽이 원문을 그대로 보여주면 된다.
 */
export async function highlightCode(code: string, lang: string): Promise<string | null> {
  const name = ALIASES[lang] ?? lang;
  if (!name || name === "text" || name === "mermaid") return null;

  try {
    return await codeToHtml(code, {
      lang: name,
      themes: { light: CODE_THEME_LIGHT, dark: CODE_THEME_DARK },
      // 두 벌을 CSS 변수로 남긴다 — 한쪽을 기본 색으로 박으면 테마 전환이 안 된다
      defaultColor: false,
      // 우리 <pre>를 쓰므로 shiki의 껍데기는 걷어낸다
      structure: "inline",
    });
  } catch {
    return null;
  }
}
