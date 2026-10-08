/**
 * 블로그 데이터 레이어.
 *
 * 글은 `src/content/blog/*.md` 한 파일이 한 편이고, 메타데이터는 YAML 프론트매터로 적습니다.
 * 본문 렌더링은 @next/mdx가 맡고(next.config.ts), 이 파일은 목록·목차·읽는 시간처럼
 * 원문을 읽어야 아는 것들을 담당합니다.
 *
 * 파일 시스템을 읽으므로 서버(빌드 타임)에서만 호출할 수 있습니다.
 * 이 사이트는 output: "export"라 모든 호출이 빌드 중에 끝납니다.
 */
import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/** 한글 기준 분당 읽는 글자 수 — 코드/문법 기호를 걷어낸 본문에 적용 */
const CHARS_PER_MINUTE = 500;

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  /** 파일명에서 온 URL 슬러그 (/blog/[slug]) */
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  /** 목록 카드와 OG 설명에 쓰는 한 줄 요약 */
  summary: string;
  tags: string[];
  readingMinutes: number;
  /** h2·h3만 모은 목차 — id는 rehype-slug가 붙이는 값과 같다 */
  headings: Heading[];
}

/** 코드 펜스(``` … ```) 안쪽을 걷어낸다 — 본문 분석에서 코드는 제외한다 */
function stripCodeFences(markdown: string): string {
  const lines = markdown.split("\n");
  const kept: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) kept.push(line);
  }

  return kept.join("\n");
}

/** 본문 길이로 읽는 시간을 어림한다. 최소 1분. */
export function estimateReadingMinutes(markdown: string): number {
  const prose = stripCodeFences(markdown)
    // 링크는 표시되는 글자만 남긴다: [텍스트](url) → 텍스트
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // 이미지·인라인 코드·강조·인용·목록 기호 등 표시되지 않는 문법을 지운다
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/[#>*_~|-]/g, "")
    .replace(/\s+/g, "");

  return Math.max(1, Math.ceil(prose.length / CHARS_PER_MINUTE));
}

/**
 * h2·h3를 뽑아 목차를 만든다.
 *
 * id는 rehype-slug와 반드시 같아야 앵커가 걸린다. rehype-slug도 github-slugger를
 * 문서 순서대로 한 인스턴스에 흘려보내므로, 여기서도 모든 레벨의 제목을 순서대로
 * 넣어 중복 카운터(-1, -2 …)까지 일치시킨다. 목차에는 h2·h3만 남긴다.
 */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    // 인라인 마크다운을 걷어낸 표시 텍스트 — rehype-slug도 렌더된 텍스트를 기준으로 한다
    const text = match[2]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[`*_~]/g, "")
      .trim();

    // 레벨과 무관하게 전부 흘려보내 중복 카운터를 rehype-slug와 맞춘다
    const id = slugger.slug(text);
    if (level === 2 || level === 3) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

/** 원문 한 편을 Post로 — 프론트매터가 빠지면 빌드를 세운다 */
export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const { title, date, summary, tags } = data as Partial<{
    title: string;
    date: unknown;
    summary: string;
    tags: string[];
  }>;

  if (!title || !summary) {
    throw new Error(`블로그 글 "${slug}": 프론트매터에 title과 summary가 필요합니다.`);
  }

  // gray-matter는 따옴표 없는 YAML 날짜를 Date로 바꾼다 — 문자열로 되돌린다
  const isoDate =
    date instanceof Date
      ? date.toISOString().slice(0, 10)
      : typeof date === "string"
        ? date
        : "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error(`블로그 글 "${slug}": date는 YYYY-MM-DD 형식이어야 합니다.`);
  }

  return {
    slug,
    title,
    date: isoDate,
    summary,
    tags: Array.isArray(tags) ? tags : [],
    readingMinutes: estimateReadingMinutes(content),
    headings: extractHeadings(content),
  };
}

/** 태그를 URL에 쓸 슬러그로 — 표시 이름은 그대로 두고 링크만 슬러그를 쓴다 */
export function tagToSlug(tag: string): string {
  return new GithubSlugger().slug(tag);
}

/** 모든 글, 최신순 */
export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      return parsePost(slug, raw);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** 글 수가 많은 태그부터 — 목록 페이지의 태그 줄에 그대로 쓴다 */
export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagToSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTagSlug(slug: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((tag) => tagToSlug(tag) === slug),
  );
}

/** 날짜 표기 — 2026.07.13 */
export function formatDate(date: string): string {
  return date.replace(/-/g, ".");
}
