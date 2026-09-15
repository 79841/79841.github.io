import Link from "next/link";
import type { Post } from "@/shared/lib/blog";
import { formatDate } from "@/shared/lib/blog";

interface PostCardProps {
  post: Post;
}

/** 글 카드 — 판화 썸네일 위, 제목과 메타만 아래 */
export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="gcard glass">
      <div className="thumb aspect-[16/10]">
        <div aria-hidden className="art" data-art={post.art} />
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 pt-3.5 pb-1.5">
        <h3 className="text-[17px] leading-[1.4] font-medium tracking-[-0.02em] text-pretty">
          {post.title}
        </h3>
        <span className="font-mono text-[12px] text-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.length > 0 ? ` · ${post.tags.slice(0, 2).join(" · ")}` : null}
        </span>
      </div>
    </Link>
  );
}
