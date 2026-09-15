import type { Metadata } from "next";
import { PostGrid } from "@/features/blog/post-grid";
import { TagRail } from "@/features/blog/tag-rail";
import { getAllPosts, getAllTags } from "@/shared/lib/blog";
import { profile } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "개발하면서 겪은 문제와 해결 과정을 기록합니다. 측정한 숫자와 재현 조건을 같이 남깁니다.",
  openGraph: {
    title: `Writing — ${profile.name}`,
    description: "개발하면서 겪은 문제와 해결 과정을 기록합니다.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <main>
      <header className="flex flex-col gap-7 pt-16 pb-6 sm:pt-24">
        <Reveal>
          <div className="flex items-end justify-between gap-10">
            <div className="flex flex-col gap-3.5">
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
                Writing
              </h1>
              <p className="max-w-[620px] text-[17px] leading-[1.55] text-muted sm:text-[18px]">
                개발하면서 겪은 문제와 해결 과정을 기록합니다. 측정한 숫자와 재현
                조건을 같이 남깁니다.
              </p>
            </div>
            <span className="hidden shrink-0 font-mono text-[13px] text-faint sm:block">
              {posts.length} POSTS
            </span>
          </div>
        </Reveal>
      </header>

      <div className="grid gap-8 pt-4 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-10">
        <TagRail tags={tags} total={posts.length} />
        <PostGrid posts={posts} />
      </div>
    </main>
  );
}
