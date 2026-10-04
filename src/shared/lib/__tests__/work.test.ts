import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { works } from "@/shared/lib/profile";
import { getWorkPoints, hasWorkBody, workBodyPath } from "@/shared/lib/work";

/** 코드 펜스를 걷어낸 본문 — 문체 검사는 산문에만 한다 */
function proseOf(slug: string): string {
  const raw = fs.readFileSync(workBodyPath(slug), "utf8");
  return raw.replace(/```[\s\S]*?```/g, "");
}

describe("work bodies", () => {
  it("gives every work an MDX body", () => {
    for (const work of works) {
      expect(hasWorkBody(work.slug)).toBe(true);
    }
  });

  it("collects at least two points per work, each with an anchor id", () => {
    for (const work of works) {
      const points = getWorkPoints(work.slug);
      expect(points.length).toBeGreaterThanOrEqual(2);
      for (const point of points) {
        expect(point.level).toBe(2);
        expect(point.id).toMatch(/\S/);
      }
    }
  });

  it("returns no points for a work without a body", () => {
    expect(getWorkPoints("없는-프로젝트")).toEqual([]);
  });

  it("opens with the points list and closes with a retrospective", () => {
    for (const work of works) {
      const raw = fs.readFileSync(workBodyPath(work.slug), "utf8");
      expect(raw).toContain("<Points />");
      expect(raw.trimEnd().endsWith("</Retro>")).toBe(true);
    }
  });

  it("writes in the blog voice — plain '-다' sentences, no polite endings", () => {
    for (const work of works) {
      const prose = proseOf(work.slug);
      // 블로그 문체(문체.md): 평서체 '-다', 존댓말 금지
      expect(prose).not.toMatch(/(습니다|합니다|입니다|세요)\./);
    }
  });

  it("keeps headings as one sentence without a dash joining two clauses", () => {
    for (const work of works) {
      for (const point of getWorkPoints(work.slug)) {
        // 제목·소제목에 "앞 절 — 뒤 절"을 쓰지 않는다
        expect(point.text).not.toMatch(/—/);
      }
    }
  });
});
