import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostList } from "@/features/blog/post-list";
import { TagRow } from "@/features/blog/tag-row";
import { getAllTags, getPostsByTagSlug } from "@/shared/lib/blog";
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
    title: `${entry.tag} — Blog`,
    description: `${entry.tag} 태그가 붙은 글 ${entry.count}편.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: slug } = await params;

  const tags = getAllTags();
  const entry = tags.find((t) => t.slug === slug);
  if (!entry) notFound();

  const posts = getPostsByTagSlug(slug);

  return (
    <main>
      <header className="pt-16 pb-12">
        <Reveal>
          <Link
            href="/blog"
            className="font-mono text-[10px] tracking-[0.2em] text-ghost transition-colors hover:text-ink"
          >
            ← BLOG
          </Link>
          <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.03em]">
            {entry.tag}
          </h1>
          <p className="mt-4 text-[14px] text-muted">글 {entry.count}편</p>
        </Reveal>
      </header>

      <Reveal>
        <TagRow tags={tags} activeSlug={slug} />
      </Reveal>

      <PostList posts={posts} />
    </main>
  );
}
