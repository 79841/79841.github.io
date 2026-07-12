import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Toc } from "@/features/blog/toc";
import { formatDate, getAllPosts, tagToSlug } from "@/shared/lib/blog";
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
  // 최신순 목록에서 한 칸 뒤 — 마지막 글이면 처음으로 돌아온다. 글이 하나뿐이면 없다.
  const next = posts.length > 1 ? posts[(index + 1) % posts.length] : undefined;

  // 본문은 빌드 타임에 .md를 컴파일해 가져온다 (next.config.ts의 @next/mdx)
  const { default: Body } = await import(`../../../content/blog/${slug}.md`);

  return (
    <main>
      <header className="pt-16 pb-14">
        <Reveal>
          <Link
            href="/blog"
            className="font-mono text-[10px] tracking-[0.2em] text-ghost transition-colors hover:text-ink"
          >
            ← BLOG
          </Link>

          <div className="mt-5 flex items-baseline gap-3 font-mono text-[10.5px] tracking-[0.12em] text-ghost">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes}분</span>
          </div>

          <h1 className="mt-4 text-[clamp(1.7rem,3.6vw,2.4rem)] leading-[1.3] font-bold tracking-[-0.03em]">
            {post.title}
          </h1>

          <p className="mt-5 max-w-2xl text-[14px] leading-[1.9] text-muted">
            {post.summary}
          </p>

          {post.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tagToSlug(tag)}`}
                  className="font-mono text-[10.5px] tracking-[0.1em] text-faint transition-colors hover:text-ink"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}
        </Reveal>
      </header>

      <div className="border-t border-hairline pt-14 lg:flex lg:gap-14">
        <aside className="lg:order-2 lg:w-44 lg:shrink-0">
          <Toc headings={post.headings} />
        </aside>

        <article className="post-body min-w-0 max-w-2xl lg:order-1">
          <Body />
        </article>
      </div>

      {next ? (
        <div className="mt-24 border-t border-hairline">
          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-baseline justify-between gap-6 py-10 transition-colors hover:bg-imgbg/50"
          >
            <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-ghost">
              NEXT POST
            </span>
            <span className="text-right text-[15px] font-bold">
              {next.title}
              <span
                aria-hidden
                className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </Link>
        </div>
      ) : null}
    </main>
  );
}
