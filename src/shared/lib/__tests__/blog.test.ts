import { describe, expect, it } from "vitest";
import {
  estimateReadingMinutes,
  extractHeadings,
  formatDate,
  getAllPosts,
  getAllTags,
  getPost,
  getPostsByTagSlug,
  parsePost,
  tagToSlug,
} from "@/shared/lib/blog";

const frontmatter = [
  "---",
  'title: "테스트 글"',
  'date: "2026-01-02"',
  'summary: "요약"',
  'tags: ["React", "Performance"]',
  "---",
].join("\n");

describe("estimateReadingMinutes", () => {
  it("returns at least one minute for a short post", () => {
    expect(estimateReadingMinutes("짧다.")).toBe(1);
  });

  it("scales with prose length", () => {
    // 1,500자 → 500자/분 기준으로 3분
    expect(estimateReadingMinutes("가".repeat(1500))).toBe(3);
  });

  it("ignores code blocks so a long snippet does not inflate the estimate", () => {
    const withCode = ["```ts", "x".repeat(5000), "```", "본문"].join("\n");
    expect(estimateReadingMinutes(withCode)).toBe(1);
  });

  it("counts only the visible text of a link", () => {
    const link = `[보이는 글자](https://example.com/${"q".repeat(5000)})`;
    expect(estimateReadingMinutes(link)).toBe(1);
  });
});

describe("extractHeadings", () => {
  it("collects h2 and h3 with slugged ids", () => {
    const markdown = ["# 제목", "## 측정", "### 방법", "#### 세부"].join("\n");

    expect(extractHeadings(markdown)).toEqual([
      { id: "측정", text: "측정", level: 2 },
      { id: "방법", text: "방법", level: 3 },
    ]);
  });

  it("ignores hash lines inside code fences", () => {
    const markdown = [
      "## 진짜 제목",
      "```bash",
      "## 주석이지 제목이 아니다",
      "```",
    ].join("\n");

    expect(extractHeadings(markdown).map((h) => h.text)).toEqual(["진짜 제목"]);
  });

  it("disambiguates duplicate headings the way rehype-slug does", () => {
    const markdown = ["## 결과", "## 결과"].join("\n");

    expect(extractHeadings(markdown).map((h) => h.id)).toEqual([
      "결과",
      "결과-1",
    ]);
  });

  it("keeps the dedup counter aligned when other levels share a title", () => {
    // rehype-slug는 모든 레벨을 한 슬러거에 흘려보낸다 — h1이 먼저 "결과"를 가져가면
    // 뒤따르는 h2는 "결과-1"이 되어야 앵커가 맞는다.
    const markdown = ["# 결과", "## 결과"].join("\n");

    expect(extractHeadings(markdown).map((h) => h.id)).toEqual(["결과-1"]);
  });

  it("strips inline markdown from the heading text", () => {
    expect(extractHeadings("## `useMemo`로 **고정**")[0]).toMatchObject({
      text: "useMemo로 고정",
    });
  });
});

describe("parsePost", () => {
  it("reads frontmatter and derives reading time and headings", () => {
    const post = parsePost("test", `${frontmatter}\n\n## 측정\n\n본문입니다.`);

    expect(post).toMatchObject({
      slug: "test",
      title: "테스트 글",
      date: "2026-01-02",
      summary: "요약",
      tags: ["React", "Performance"],
    });
    expect(post.readingMinutes).toBeGreaterThanOrEqual(1);
    expect(post.headings).toEqual([{ id: "측정", text: "측정", level: 2 }]);
  });

  it("normalizes an unquoted YAML date, which gray-matter turns into a Date", () => {
    const raw = [
      "---",
      'title: "제목"',
      "date: 2026-01-02",
      'summary: "요약"',
      "---",
      "",
      "본문",
    ].join("\n");

    expect(parsePost("test", raw).date).toBe("2026-01-02");
  });

  it("defaults tags to an empty array when omitted", () => {
    const raw = [
      "---",
      'title: "제목"',
      'date: "2026-01-02"',
      'summary: "요약"',
      "---",
      "",
      "본문",
    ].join("\n");

    expect(parsePost("test", raw).tags).toEqual([]);
  });

  it("fails loudly when required frontmatter is missing", () => {
    const raw = ["---", 'title: "제목만 있다"', "---", "", "본문"].join("\n");

    expect(() => parsePost("broken", raw)).toThrow(/summary/);
  });

  it("rejects a malformed date instead of shipping it", () => {
    const raw = [
      "---",
      'title: "제목"',
      'date: "2026년 1월"',
      'summary: "요약"',
      "---",
      "",
      "본문",
    ].join("\n");

    expect(() => parsePost("broken", raw)).toThrow(/YYYY-MM-DD/);
  });
});

describe("tagToSlug", () => {
  it("makes a URL-safe slug", () => {
    expect(tagToSlug("Next.js")).toBe("nextjs");
    expect(tagToSlug("Performance")).toBe("performance");
  });
});

describe("content on disk", () => {
  it("parses every published post", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.title).not.toHaveLength(0);
      expect(post.summary).not.toHaveLength(0);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.readingMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("orders posts newest first", () => {
    const dates = getAllPosts().map((post) => post.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("finds a post by slug", () => {
    const [first] = getAllPosts();
    expect(getPost(first.slug)).toEqual(first);
    expect(getPost("없는-글")).toBeUndefined();
  });

  it("counts tags and filters posts by tag slug", () => {
    for (const { tag, slug, count } of getAllTags()) {
      const tagged = getPostsByTagSlug(slug);
      expect(tagged).toHaveLength(count);
      for (const post of tagged) {
        expect(post.tags).toContain(tag);
      }
    }
  });

  it("has no posts left out of the tag index", () => {
    expect(getAllTags().length).toBeGreaterThan(0);
    for (const post of getAllPosts()) {
      expect(post.tags.length).toBeGreaterThan(0);
    }
  });
});

describe("formatDate", () => {
  it("renders dots", () => {
    expect(formatDate("2026-07-13")).toBe("2026.07.13");
  });
});
