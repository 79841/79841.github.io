import { About } from "@/features/site/about";
import { Contact } from "@/features/site/contact";
import { Experience } from "@/features/site/experience";
import { Hero } from "@/features/site/hero";
import { RecentPosts } from "@/features/site/recent-posts";
import { SectionToc } from "@/features/site/section-toc";
import { Works } from "@/features/site/works";
import { getAllPosts } from "@/shared/lib/blog";
import { profile } from "@/shared/lib/profile";

const RECENT_POST_COUNT = 3;

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* 좌측 세로 레일 — 조용한 시그니처 */}
      <span
        aria-hidden
        className="fixed bottom-8 left-5 hidden font-mono text-[9px] tracking-[0.4em] text-ghost [writing-mode:vertical-rl] lg:block"
      >
        {profile.nameEn.toUpperCase()} — PORTFOLIO 2026
      </span>

      {/* 우측 섹션 목차 — 페이지 안에서의 현재 위치를 알려준다 */}
      <SectionToc />

      <main>
        <Hero />
        <Works />
        {/* nav 순서(Work → Blog → About)와 같은 자리에 최근 글이 온다 */}
        <RecentPosts
          posts={posts.slice(0, RECENT_POST_COUNT)}
          total={posts.length}
          index="02"
        />
        <Experience index="03" navCtx="§03 — EXPERIENCE" />
        <About index="04" />
        <Contact />
      </main>
    </>
  );
}
