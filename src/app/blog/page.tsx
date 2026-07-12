import type { Metadata } from "next";
import { PostList } from "@/features/blog/post-list";
import { TagRow } from "@/features/blog/tag-row";
import { getAllPosts, getAllTags } from "@/shared/lib/blog";
import { profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "렌더링 최적화, AI 에이전트 텔레메트리, 그리고 보안에서 배운 것들 — 명인지가 만들면서 알게 된 것들을 적습니다.",
  openGraph: {
    title: `Blog — ${profile.name}`,
    description: "만들면서 알게 된 것들을 적습니다.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main>
      <header className="pt-16 pb-12">
        <Reveal>
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">
              Blog
            </h1>
            <span className="font-mono text-[10px] tracking-[0.15em] text-ghost">
              {String(posts.length).padStart(2, "0")} POSTS
            </span>
          </div>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.9] text-muted">
            만들면서 알게 된 것들을 적습니다. 대부분 숫자로 시작해서 구조로
            끝납니다.
          </p>
        </Reveal>
      </header>

      <Reveal>
        <TagRow tags={tags} />
      </Reveal>

      <PostList posts={posts} />
    </main>
  );
}
