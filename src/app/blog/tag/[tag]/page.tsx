import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostGrid } from "@/features/blog/post-grid";
import { TagRail } from "@/features/blog/tag-rail";
import { getAllPosts, getAllTags, getPostsByTagSlug } from "@/shared/lib/blog";
import { ArrowLeft } from "@/shared/ui/icons";
import { Reveal } from "@/shared/ui/reveal";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const entry = getAllTags().find((t) => t.slug === slug);
  if (!entry) return {};

  return {
    title: `${entry.tag} — Writing`,
    description: `${entry.tag} 태그가 붙은 글 ${entry.count}편.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: slug } = await params;

  const tags = getAllTags();
  const entry = tags.find((t) => t.slug === slug);
  if (!entry) notFound();

  const posts = getPostsByTagSlug(slug);
  const total = getAllPosts().length;

  return (
    <main>
      <header className="flex flex-col gap-7 pt-16 pb-6 sm:pt-24">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex h-8 items-center gap-1.5 text-[14px] text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft /> Writing
          </Link>
          <h1 className="mt-3 text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.04] font-medium tracking-[-0.035em]">
            {entry.tag}
          </h1>
          <p className="mt-3 text-[17px] text-muted">글 {entry.count}편</p>
        </Reveal>
      </header>

      <div className="grid gap-8 pt-4 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-10">
        <TagRail tags={tags} activeSlug={slug} total={total} />
        <PostGrid posts={posts} />
      </div>
    </main>
  );
}
