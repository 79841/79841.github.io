import { PostList } from "@/features/blog/post-list";
import { MoreLink } from "@/features/site/more-link";
import { SectionLabel } from "@/features/site/section-label";
import type { Post } from "@/shared/lib/blog";

interface RecentPostsProps {
  /** 최근 글 — 페이지가 잘라서 넘긴다 (fs 접근을 컴포넌트 밖으로 뺀다) */
  posts: Post[];
  /** 전체 글 수 — "모든 글" 행의 카운터 */
  total: number;
  index?: string;
}

/** 메인의 최근 글 섹션 — 목록 UI는 블로그의 PostList를 그대로 쓴다 */
export function RecentPosts({ posts, total, index = "02" }: RecentPostsProps) {
  return (
    <section id="writing" data-nav-ctx="§02 — WRITING" className="mt-32 scroll-mt-16">
      <SectionLabel index={index} title="Recent Writing" />
      <PostList posts={posts} />
      <MoreLink
        href="/blog"
        label="모든 글"
        count={String(total).padStart(2, "0")}
      />
    </section>
  );
}
