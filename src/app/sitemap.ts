import type { MetadataRoute } from "next";
import { SITE_URL, works } from "@/shared/lib/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 1 },
    ...works.map((work) => ({
      url: `${SITE_URL}/work/${work.slug}`,
      priority: 0.8,
    })),
  ];
}
