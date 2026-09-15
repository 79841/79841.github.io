import { PostCard } from "@/features/blog/post-card";
import { SectionHead } from "@/features/site/section-head";
import type { Post } from "@/shared/lib/blog";
import { Reveal } from "@/shared/ui/reveal";

interface RecentPostsProps {
  /** 최근 글 — 페이지가 잘라서 넘긴다 (fs 접근을 컴포넌트 밖으로 뺀다) */
  posts: Post[];
}

/** 메인의 최근 글 — 카드 3장 */
export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section id="writing" aria-labelledby="writing-h" className="mt-24 scroll-mt-20">
      <SectionHead
        eyebrow="WRITING"
        title="최근 글"
        id="writing-h"
        more={{ href: "/blog", label: "전체 보기" }}
      />
      {posts.length === 0 ? (
        <p className="mt-6 text-[14px] text-muted">아직 쓴 글이 없습니다.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
