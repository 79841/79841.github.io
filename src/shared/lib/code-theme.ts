/**
 * 코드 블록 문법 강조 팔레트.
 *
 * 사이트가 종이·잉크 단색이라 알록달록한 기성 테마는 본문과 따로 논다.
 * 그래서 잉크 명도로 위계를 잡고, 색은 서늘한 것(문자열)과 따뜻한 것(숫자·상수)
 * 둘만 아주 낮은 채도로 쓴다. 오로라·썸네일에 쓰는 색조와 같은 계열이다.
 */

import type { ThemeRegistration } from "shiki";

const LIGHT = {
  fg: "#2b2b28",
  ink: "#17171a",
  comment: "#9a9a94",
  punctuation: "#84847e",
  string: "#4e5a6e",
  number: "#6f6052",
  type: "#3f4654",
  muted: "#55554f",
  removed: "#8a4a46",
  added: "#4a6b55",
};

const DARK = {
  fg: "#d6d6d2",
  ink: "#f4f4f1",
  comment: "#74746e",
  punctuation: "#8a8a84",
  string: "#a9b6cc",
  number: "#c8b49c",
  type: "#b6bfd2",
  muted: "#a3a39d",
  removed: "#d59b96",
  added: "#9ec9ae",
};

/** 두 테마가 같은 규칙을 쓰고 색만 갈린다 — 한쪽만 손대는 일이 없게 */
function theme(name: string, type: "light" | "dark", c: typeof LIGHT): ThemeRegistration {
  return {
    name,
    type,
    colors: {
      "editor.background": "#00000000",
      "editor.foreground": c.fg,
    },
    settings: [
      { settings: { foreground: c.fg } },
      {
        scope: ["comment", "punctuation.definition.comment", "string.comment"],
        settings: { foreground: c.comment, fontStyle: "italic" },
      },
      {
        scope: [
          "keyword",
          "keyword.control",
          "storage",
          "storage.type",
          "storage.modifier",
          "keyword.operator.new",
          "keyword.operator.expression",
          "variable.language",
          "constant.language",
        ],
        settings: { foreground: c.ink, fontStyle: "bold" },
      },
      {
        scope: ["entity.name.function", "support.function", "meta.function-call"],
        settings: { foreground: c.ink },
      },
      {
        scope: [
          "entity.name.type",
          "entity.name.class",
          "support.type",
          "support.class",
          "entity.other.inherited-class",
        ],
        settings: { foreground: c.type },
      },
      {
        scope: ["string", "string.quoted", "string.template", "constant.character"],
        settings: { foreground: c.string },
      },
      {
        scope: ["constant.numeric", "constant.language.boolean", "constant.other"],
        settings: { foreground: c.number },
      },
      {
        scope: [
          "punctuation",
          "meta.brace",
          "keyword.operator",
          "punctuation.separator",
          "punctuation.terminator",
        ],
        settings: { foreground: c.punctuation },
      },
      {
        scope: ["variable", "variable.other", "meta.object-literal.key", "support.variable"],
        settings: { foreground: c.fg },
      },
      {
        scope: ["entity.name.tag", "meta.tag"],
        settings: { foreground: c.ink },
      },
      {
        scope: ["entity.other.attribute-name"],
        settings: { foreground: c.type },
      },
      {
        scope: ["markup.inserted", "meta.diff.header.to-file"],
        settings: { foreground: c.added },
      },
      {
        scope: ["markup.deleted", "meta.diff.header.from-file"],
        settings: { foreground: c.removed },
      },
      {
        scope: ["markup.heading", "markup.bold"],
        settings: { foreground: c.ink, fontStyle: "bold" },
      },
      {
        scope: ["markup.italic"],
        settings: { foreground: c.muted, fontStyle: "italic" },
      },
    ],
  };
}

export const CODE_THEME_LIGHT = theme("ink-light", "light", LIGHT);
export const CODE_THEME_DARK = theme("ink-dark", "dark", DARK);
