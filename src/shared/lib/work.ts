/**
 * 프로젝트 상세 본문 — `src/content/work/<slug>.mdx` 한 파일이 한 프로젝트다.
 *
 * 카드와 개요에 쓰는 정보(이름·기간·역할·스택·링크)는 profile.ts에 두고,
 * 요점·다이어그램·코드·회고는 이 MDX에 블로그 글처럼 쓴다.
 * 파일 시스템을 읽으므로 빌드 타임(서버)에서만 호출한다.
 */
import fs from "node:fs";
import path from "node:path";
import { extractHeadings } from "@/shared/lib/blog";
import type { Heading } from "@/shared/lib/blog";

const WORK_DIR = path.join(process.cwd(), "src/content/work");

/** 프로젝트 본문 파일의 경로 */
export function workBodyPath(slug: string): string {
  return path.join(WORK_DIR, `${slug}.mdx`);
}

/** 본문 파일이 있는지 — 없는 프로젝트는 상세 본문 없이 개요만 보여준다 */
export function hasWorkBody(slug: string): boolean {
  return fs.existsSync(workBodyPath(slug));
}

/**
 * 요점 목록 — 본문의 h2만 모은다.
 * id는 rehype-slug가 다는 값과 같아야 앵커가 걸린다 (블로그 목차와 같은 추출기를 쓴다).
 */
export function getWorkPoints(slug: string): Heading[] {
  if (!hasWorkBody(slug)) return [];
  const raw = fs.readFileSync(workBodyPath(slug), "utf8");
  return extractHeadings(raw).filter((heading) => heading.level === 2);
}
