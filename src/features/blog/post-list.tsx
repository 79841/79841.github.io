import Link from "next/link";
import type { Post } from "@/shared/lib/blog";
import { formatDate } from "@/shared/lib/blog";
import { Reveal } from "@/shared/ui/reveal";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="border-t border-hairline py-16 text-[14px] text-muted">
        아직 쓴 글이 없습니다.
      </p>
    );
  }

  return (
    <div className="border-t border-hairline">
      {posts.map((post, i) => (
        <Reveal key={post.slug} delay={i * 60}>
          <article className="border-b border-hairline">
            <Link
              href={`/blog/${post.slug}`}
              className="group block py-9 transition-colors hover:bg-imgbg/50"
            >
              <div className="flex items-baseline gap-3 font-mono text-[10.5px] tracking-[0.12em] text-ghost">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes}분</span>
              </div>

              <h2 className="mt-3 text-[19px] font-bold tracking-[-0.02em]">
                {post.title}
                <span
                  aria-hidden
                  className="ml-2 inline-block text-muted transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </h2>

              <p className="mt-2.5 max-w-2xl text-[14px] leading-[1.85] text-muted">
                {post.summary}
              </p>

              {post.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] tracking-[0.1em] text-faint">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
