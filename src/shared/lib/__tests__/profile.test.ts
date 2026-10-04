import { describe, expect, it } from "vitest";
import {
  awards,
  experiences,
  moreWorks,
  profile,
  stackGroups,
  stats,
  works,
} from "@/shared/lib/profile";

describe("profile data", () => {
  it("has core identity fields", () => {
    expect(profile.name).toBe("명인지");
    expect(profile.headline.length).toBeGreaterThan(0);
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

  it("gives every work a unique slug, a role, and external links", () => {
    const slugs = works.map((w) => w.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const work of works) {
      expect(work.slug).toMatch(/^[a-z0-9-]+$/);
      // 상세 개요의 역할 칸 — 채용 담당자가 가장 먼저 찾는다
      expect(work.role.trim().length).toBeGreaterThan(0);
      expect(work.links.length).toBeGreaterThan(0);
      for (const link of work.links) {
        expect(link.href).toMatch(/^https:\/\//);
        // 화살표는 페이지가 붙인다 — 라벨에 넣으면 두 번 그려진다
        expect(link.label).not.toMatch(/↗/);
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

  it("keeps stack, experience, awards, and stats non-empty", () => {
    const labels = stackGroups.map((g) => g.label);
    expect(labels).toContain("FRONT-END");
    expect(labels).toContain("AI TOOLING");
    for (const group of stackGroups) {
      expect(group.items.length).toBeGreaterThan(0);
    }
    expect(experiences.length).toBeGreaterThan(0);
    expect(awards.length).toBeGreaterThan(0);
    expect(stats).toHaveLength(3);
  });

  it("has exactly one current role, listed first, and every role has tags", () => {
    expect(experiences.filter((e) => e.current)).toHaveLength(1);
    expect(experiences[0].current).toBe(true);
    for (const entry of experiences) {
      expect(entry.tags.length).toBeGreaterThan(0);
      expect(entry.period).toMatch(/^\d{4}\.\d{2} — (\d{4}\.\d{2}|현재)$/);
    }
  });

  it("orders roles and awards newest first", () => {
    const starts = experiences.map((e) => e.period.slice(0, 7));
    expect([...starts].sort().reverse()).toEqual(starts);
    const dates = awards.map((a) => a.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });
});
