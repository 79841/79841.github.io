import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 배포 — 이미지 최적화는 빌드 전에 sharp로 직접 수행
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
