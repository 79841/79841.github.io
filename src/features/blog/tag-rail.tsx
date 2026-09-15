import Link from "next/link";

interface TagRailProps {
  tags: { tag: string; slug: string; count: number }[];
  /** 지금 보고 있는 태그 슬러그 — 없으면 "전체"가 활성 */
  activeSlug?: string;
  total: number;
}

/**
 * 글 목록 옆 태그 목록.
 * 좁은 화면에서는 가운뎃점으로 이어지는 낱말 줄, 넓은 화면에서는 왼쪽 괘선 레일이 된다.
 * 태그가 늘어도 머리말을 아래로 밀지 않고 레일 안에서만 길어진다.
 */
export function TagRail({ tags, activeSlug, total }: TagRailProps) {
  if (tags.length === 0) return null;

  return (
    <nav
      aria-label="태그"
      className="lg:sticky lg:top-[92px] lg:max-h-[calc(100vh-132px)] lg:self-start lg:overflow-y-auto lg:pb-2"
    >
      <span className="eyebrow hidden lg:block">TOPICS</span>
      <ul className="taglist lg:mt-2.5">
        <li>
          <Link
            href="/blog"
            className="tagrow"
            aria-current={activeSlug ? undefined : "page"}
          >
            전체
            <span className="count">{total}</span>
          </Link>
        </li>
        {tags.map(({ tag, slug, count }) => (
          <li key={slug}>
            <Link
              href={`/blog/tag/${slug}`}
              className="tagrow"
              aria-current={activeSlug === slug ? "page" : undefined}
            >
              {tag}
              <span className="count">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
