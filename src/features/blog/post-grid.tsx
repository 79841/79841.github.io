import { PostCard } from "@/features/blog/post-card";
import type { Post } from "@/shared/lib/blog";
import { Reveal } from "@/shared/ui/reveal";

interface PostGridProps {
  posts: Post[];
}

/** 글 목록 — 3열 유리 카드 */
export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return <p className="py-16 text-[14px] text-muted">아직 쓴 글이 없습니다.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.slug} delay={(i % 3) * 60}>
          <PostCard post={post} />
        </Reveal>
      ))}
    </div>
  );
}
