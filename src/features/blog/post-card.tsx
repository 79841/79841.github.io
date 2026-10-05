import Link from "next/link";
import type { Post } from "@/shared/lib/blog";
import { formatDate } from "@/shared/lib/blog";

interface PostCardProps {
  post: Post;
}

/**
 * 글 카드 — 제목과 메타만. 이미지 자리는 두지 않는다.
 * 한 줄에 놓인 카드끼리 높이를 맞추고, 날짜·태그는 카드 바닥에 붙인다.
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-glow
      className="gcard glass post-card"
    >
      <h3 className="text-[18px] leading-[1.45] font-medium tracking-[-0.02em] text-pretty">
        {post.title}
      </h3>
      <span className="font-mono text-[12px] text-faint">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.tags.length > 0 ? ` · ${post.tags.slice(0, 2).join(" · ")}` : null}
      </span>
    </Link>
  );
}
