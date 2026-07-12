import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/shared/lib/blog";
import { SITE_URL, works } from "@/shared/lib/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/work`, priority: 0.8 },
    ...works.map((work) => ({
      url: `${SITE_URL}/work/${work.slug}`,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/about`, priority: 0.8 },
    { url: `${SITE_URL}/blog`, priority: 0.8 },
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      priority: 0.7,
    })),
    ...getAllTags().map(({ slug }) => ({
      url: `${SITE_URL}/blog/tag/${slug}`,
      priority: 0.4,
    })),
  ];
}
