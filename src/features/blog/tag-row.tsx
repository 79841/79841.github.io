import Link from "next/link";

interface TagRowProps {
  tags: { tag: string; slug: string; count: number }[];
  /** 지금 보고 있는 태그 슬러그 — 없으면 "전체"가 활성 */
  activeSlug?: string;
}

export function TagRow({ tags, activeSlug }: TagRowProps) {
  if (tags.length === 0) return null;

  const base =
    "font-mono text-[11px] tracking-[0.08em] transition-colors hover:text-ink";

  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 pb-8">
      <Link
        href="/blog"
        className={`${base} ${activeSlug ? "text-muted" : "text-ink"}`}
      >
        전체
      </Link>

      {tags.map(({ tag, slug, count }) => (
        <Link
          key={slug}
          href={`/blog/tag/${slug}`}
          className={`${base} ${activeSlug === slug ? "text-ink" : "text-muted"}`}
        >
          {tag}
          <span className="ml-1 text-ghost">{count}</span>
        </Link>
      ))}
    </div>
  );
}
