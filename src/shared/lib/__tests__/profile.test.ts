import { describe, expect, it } from "vitest";
import {
  aboutParagraphs,
  experiences,
  moreWorks,
  profile,
  stackGroups,
  works,
} from "@/shared/lib/profile";

describe("profile data", () => {
  it("has core identity fields", () => {
    expect(profile.name).toBe("명인지");
    expect(profile.thesis).toHaveLength(2);
    expect(profile.email).toMatch(/@/);
    expect(profile.resumeHref).toMatch(/\.pdf$/);
  });

  it("gives every visual work images with dimensions", () => {
    expect(works.length).toBeGreaterThan(0);
    for (const work of works) {
      expect(work.images.length).toBeGreaterThan(0);
      for (const image of work.images) {
        expect(image.src).toMatch(/^\/work\//);
        expect(image.width).toBeGreaterThan(0);
        expect(image.height).toBeGreaterThan(0);
      }
    }
  });

  it("marks exactly one work as the wide featured card", () => {
    expect(works.filter((w) => w.wide)).toHaveLength(1);
    expect(works[0].wide).toBe(true);
  });

  it("gives every work a unique slug and complete detail", () => {
    const slugs = works.map((w) => w.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const work of works) {
      expect(work.slug).toMatch(/^[a-z0-9-]+$/);
      expect(work.detail.sections.length).toBeGreaterThanOrEqual(2);
      expect(work.detail.links.length).toBeGreaterThan(0);
      for (const link of work.detail.links) {
        expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

  it("uses valid external hrefs on more-works", () => {
    for (const work of moreWorks) {
      if (work.href) {
        expect(work.href).toMatch(/^https:\/\//);
      }
    }
  });

  it("keeps about, stack, and experience content non-empty", () => {
    expect(aboutParagraphs.length).toBeGreaterThan(0);
    expect(experiences.length).toBeGreaterThan(0);
    const labels = stackGroups.map((g) => g.label);
    expect(labels).toContain("FRONT-END");
    expect(labels).toContain("AI TOOLING");
    for (const group of stackGroups) {
      expect(group.items).not.toHaveLength(0);
    }
  });
});
