import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 배포 — 이미지 최적화는 빌드 전에 sharp로 직접 수행
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

const withMDX = createMDX({
  // 기본값은 .mdx뿐 — 블로그 글은 .md로 쓰므로 둘 다 컴파일 대상에 넣는다
  extension: /\.(md|mdx)$/,
  options: {
    // Turbopack에는 함수를 넘길 수 없어 플러그인을 문자열로 지정한다.
    // remark-frontmatter: YAML 블록이 본문으로 렌더되지 않게 걷어낸다 (파싱은 blog.ts가 직접 한다)
    // remark-gfm: 표·취소선·자동 링크 — CommonMark에는 없다
    // rehype-slug: 제목에 id를 달아 목차 앵커가 걸리게 한다
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
