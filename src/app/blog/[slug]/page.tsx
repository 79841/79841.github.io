import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Toc } from "@/features/blog/toc";
import { formatDate, getAllPosts, tagToSlug } from "@/shared/lib/blog";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const post = posts[index];
  // 최신순 목록이라 index+1이 더 오래된 글(이전), index-1이 더 새 글(다음)
  const older = posts[index + 1];
  const newer = index > 0 ? posts[index - 1] : undefined;

  // 본문은 빌드 타임에 .md를 컴파일해 가져온다 (next.config.ts의 @next/mdx)
  const { default: Body } = await import(`../../../content/blog/${slug}.md`);

  return (
    <main>
      <article>
        <header className="flex flex-col items-center gap-5 pt-14 pb-8 text-center sm:pt-20 sm:pb-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="chip chip-sm font-mono">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="chip chip-sm font-mono">{post.readingMinutes}분</span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tagToSlug(tag)}`}
                  className="chip chip-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="max-w-[900px] text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.15] font-medium tracking-[-0.03em] text-balance">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[700px] text-[16px] leading-[1.6] text-muted text-pretty sm:text-[19px]">
              {post.summary}
            </p>
          </Reveal>
        </header>

        <Reveal>
          <div className="thumb aspect-[16/6] rounded-[24px] sm:aspect-[1200/360]">
            <div aria-hidden className="art" data-art={post.art} />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,700px)_220px] lg:justify-center lg:gap-10">
          <aside className="lg:order-1">
            <Toc headings={post.headings} />
          </aside>
          <div className="post-body min-w-0 lg:order-2">
            <Body />
            {post.tags.length > 0 ? (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-hairline pt-5">
                <span className="text-[13px] text-faint">태그</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className="chip chip-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="hidden lg:order-3 lg:block" />
        </div>
      </article>

      {older || newer ? (
        <nav
          aria-label="이전·다음 글"
          className="mt-16 grid gap-5 sm:grid-cols-2"
        >
          {older ? (
            <Link
              href={`/blog/${older.slug}`}
              className="glass flex flex-col gap-2.5 rounded-[22px] px-7 py-6 text-ink transition-colors hover:bg-[var(--glass-bg-hover)]"
            >
              <span className="inline-flex items-center gap-1.5 text-[13px] text-faint">
                <ArrowLeft /> 이전 글
              </span>
              <span className="text-[17px] leading-[1.4] font-medium tracking-[-0.02em]">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer ? (
            <Link
              href={`/blog/${newer.slug}`}
              className="glass flex flex-col items-end gap-2.5 rounded-[22px] px-7 py-6 text-right text-ink transition-colors hover:bg-[var(--glass-bg-hover)]"
            >
              <span className="inline-flex items-center gap-1.5 text-[13px] text-faint">
                다음 글 <ArrowRight />
              </span>
              <span className="text-[17px] leading-[1.4] font-medium tracking-[-0.02em]">
                {newer.title}
              </span>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </main>
  );
}
