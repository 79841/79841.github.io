import Link from "next/link";
import type { CSSProperties } from "react";
import { SectionHead } from "@/features/site/section-head";
import { formatDate } from "@/shared/lib/blog";
import type { Post } from "@/shared/lib/blog";
import { coverWords } from "@/shared/lib/cover-word";
import { Reveal } from "@/shared/ui/reveal";

interface RecentPostsProps {
  /** 최근 글 — 페이지가 잘라서 넘긴다 (fs 접근을 컴포넌트 밖으로 뺀다) */
  posts: Post[];
}

/**
 * 글 카드 — 프로젝트 카드와 같은 구조. 유리 커버에는 날짜와 대표 태그 한 단어만 크게,
 * 제목과 태그는 카드 밖 아래에 둔다.
 */
function PostCover({ post, word }: { post: Post; word: string }) {
  // 단어 길이로 글자 크기를 정한다 — 긴 태그도 커버 폭 안에 한 줄로 들어간다
  const size = { "--len": word.length } as CSSProperties;
  return (
    <Link href={`/blog/${post.slug}`} className="work-link flex flex-col gap-3.5">
      <div className="gcard glass post-cover">
        <time dateTime={post.date} className="font-mono text-[12px] text-faint">
          {formatDate(post.date)}
        </time>
        <span aria-hidden className="cover-word" style={size}>
          {word}
        </span>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-[17px] leading-[1.45] font-medium tracking-[-0.02em] text-pretty">
          {post.title}
        </h3>
        {post.tags.length > 0 ? (
          <p className="font-mono text-[12px] text-faint">{post.tags.slice(0, 2).join(" · ")}</p>
        ) : null}
      </div>
    </Link>
  );
}

/** 메인의 최근 글 — 타이포 커버 카드 3장 */
export function RecentPosts({ posts }: RecentPostsProps) {
  const words = coverWords(posts);
  return (
    <section id="writing" aria-labelledby="writing-h" className="mt-24 scroll-mt-20">
      <SectionHead
        eyebrow="BLOG"
        title="최근 글"
        id="writing-h"
        more={{ href: "/blog", label: "전체 보기" }}
      />
      {posts.length === 0 ? (
        <p className="mt-6 text-[14px] text-muted">아직 쓴 글이 없습니다.</p>
      ) : (
        <div className="mt-6 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80}>
              <PostCover post={post} word={words[i]} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
