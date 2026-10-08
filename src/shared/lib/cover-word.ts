/**
 * 글 커버의 큰 글자 — 이미지가 없는 글 카드에 대표 태그 하나를 크게 그린다.
 *
 * 함께 놓이는 글들 사이에서 가장 덜 겹치는 태그를 고른다.
 * 첫 태그를 쓰면 Expo 글 둘이 나란히 "Expo"가 되어 커버가 구분되지 않는다.
 * 같은 횟수면 원래 태그 순서를 따르고, 이미 쓴 단어는 건너뛴다.
 */
import type { Post } from "@/shared/lib/blog";

export function coverWords(posts: Pick<Post, "tags" | "date">[]): string[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  const used = new Set<string>();
  return posts.map((post) => {
    // sort는 안정 정렬이라 횟수가 같으면 원래 순서가 남는다
    const ranked = [...post.tags].sort((a, b) => counts.get(a)! - counts.get(b)!);
    const word = ranked.find((tag) => !used.has(tag)) ?? ranked[0] ?? post.date.slice(0, 4);
    used.add(word);
    return word;
  });
}
