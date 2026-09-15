import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/features/site/contact";
import { Experience } from "@/features/site/experience";
import { FeaturedWork } from "@/features/site/featured-work";
import { Hero } from "@/features/site/hero";
import { MoreWorks } from "@/features/site/more-works";
import { RecentPosts } from "@/features/site/recent-posts";
import { SiteFooter } from "@/features/site/site-footer";
import { StackPanels, StackRows } from "@/features/site/stack";
import { WorkCard } from "@/features/site/work-card";
import { Works } from "@/features/site/works";
import type { Post } from "@/shared/lib/blog";
import {
  awards,
  experiences,
  moreWorks,
  profile,
  stackGroups,
  works,
} from "@/shared/lib/profile";

function post(slug: string, title: string, date: string): Post {
  return {
    slug,
    title,
    date,
    summary: `${title} 요약`,
    tags: ["React", "Performance", "Electron"],
    readingMinutes: 3,
    art: "dune",
    headings: [],
  };
}

describe("Hero", () => {
  it("renders the headline, summary, and both calls to action", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      profile.headline,
    );
    expect(screen.getByText(profile.summary)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /이력서 보기/ })).toHaveAttribute(
      "href",
      profile.resumeHref,
    );
    expect(screen.getByRole("link", { name: /프로젝트 보기/ })).toHaveAttribute(
      "href",
      "#work",
    );
  });
});

describe("FeaturedWork", () => {
  it("links the first work and shows its badge on dark glass", () => {
    const [featured] = works;
    render(<FeaturedWork work={featured} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", `/work/${featured.slug}`);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(featured.name);
    const badge = screen.getByText(featured.badge!);
    expect(badge).toHaveClass("glass-dark");
  });
});

describe("Works", () => {
  it("renders every visual work as a link to its detail page", () => {
    render(<Works />);
    for (const work of works) {
      expect(screen.getByText(work.name).closest("a")).toHaveAttribute(
        "href",
        `/work/${work.slug}`,
      );
    }
  });

  it("puts the first work in the featured slot and the rest in the grid", () => {
    render(<Works />);
    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(headings.slice(0, works.length)).toEqual(works.map((w) => w.name));
  });

  it("lists more-works rows and links to the full list", () => {
    render(<Works />);
    for (const work of moreWorks) {
      expect(screen.getByText(work.name)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: /전체 보기/ })).toHaveAttribute(
      "href",
      "/work",
    );
  });
});

describe("WorkCard", () => {
  it("shows every screenshot of a phone work and one for the rest", () => {
    for (const work of works) {
      const { unmount } = render(<WorkCard work={work} />);
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(work.phone ? work.images.length : 1);
      unmount();
    }
  });

  it("uses light glass on light screenshots regardless of theme", () => {
    const light = works.find((w) => !w.dark && w.badge && !w.phone)!;
    render(<WorkCard work={light} />);
    expect(screen.getByText(light.badge!)).toHaveClass("glass-light");
    expect(screen.getByText(light.badge!)).not.toHaveClass("glass-dark");
  });
});

describe("MoreWorks", () => {
  it("links rows that have an href and leaves the rest as plain rows", () => {
    render(<MoreWorks />);
    for (const work of moreWorks) {
      const name = screen.getByText(work.name);
      const anchor = name.closest("a");
      if (work.href) {
        expect(anchor).toHaveAttribute("href", work.href);
      } else {
        expect(anchor).toBeNull();
      }
    }
  });
});

describe("RecentPosts", () => {
  it("shows the posts it is given and links to the full blog", () => {
    const posts = [
      post("a", "첫 번째 글", "2026-03-01"),
      post("b", "두 번째 글", "2026-02-01"),
    ];
    render(<RecentPosts posts={posts} />);

    expect(screen.getByText("첫 번째 글")).toBeInTheDocument();
    expect(screen.getByText("두 번째 글")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /전체 보기/ })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("links a post to its own page and shows at most two tags", () => {
    render(<RecentPosts posts={[post("a", "첫 번째 글", "2026-03-01")]} />);
    const card = screen.getByText("첫 번째 글").closest("a")!;
    expect(card).toHaveAttribute("href", "/blog/a");
    expect(card).toHaveTextContent("React · Performance");
    expect(card).not.toHaveTextContent("Electron");
  });

  it("says so when there is nothing to show", () => {
    render(<RecentPosts posts={[]} />);
    expect(screen.getByText(/아직 쓴 글이 없습니다/)).toBeInTheDocument();
  });
});

describe("Experience", () => {
  it("lists every role newest first and every award", () => {
    render(<Experience />);
    const orgs = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(orgs).toEqual(experiences.map((e) => e.org));
    for (const award of awards) {
      expect(screen.getByText(award.name)).toBeInTheDocument();
    }
  });

  it("hides the achievement line on the home timeline and shows it in detail", () => {
    const { unmount } = render(<Experience />);
    expect(screen.queryByText(experiences[0].desc)).not.toBeInTheDocument();
    unmount();
    render(<Experience detail />);
    expect(screen.getByText(experiences[0].desc)).toBeInTheDocument();
  });

  it("marks the current role with the strong glass card", () => {
    render(<Experience />);
    const current = experiences.find((e) => e.current)!;
    const card = screen.getAllByText(current.org)[0].closest(".tl-card");
    expect(card).toHaveClass("glass-strong");
  });

  it("leaves the past roles as hairline cards so only the current one is glass", () => {
    render(<Experience />);
    for (const entry of experiences.filter((e) => !e.current)) {
      const card = screen.getAllByText(entry.org)[0].closest(".tl-card");
      expect(card).toHaveClass("tl-line");
      expect(card).not.toHaveClass("glass");
      expect(card).not.toHaveClass("glass-strong");
    }
  });
});

describe("Stack", () => {
  it("renders every group and item as rows on the home page", () => {
    render(<StackRows />);
    for (const group of stackGroups) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      }
    }
    expect(screen.getByRole("link", { name: /더 알아보기/ })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("renders every group as a hairline row on the about page", () => {
    const { container } = render(<StackPanels />);
    for (const group of stackGroups) {
      expect(screen.getByText(group.label)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getAllByText(item).length).toBeGreaterThan(0);
      }
    }
    // 카드도 칩도 아닌 낱말 목록이다 — about이 카드 나열로 돌아가면 여기서 걸린다
    expect(container.querySelectorAll(".glass, .chip")).toHaveLength(0);
    expect(container.querySelectorAll(".dotlist")).toHaveLength(stackGroups.length);
  });
});

describe("Contact", () => {
  it("links email, github, and resume", () => {
    render(<Contact />);
    const section = screen.getByRole("region", { name: /Get in touch/ });
    expect(
      within(section).getByRole("link", { name: profile.email }),
    ).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(within(section).getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      profile.github,
    );
    expect(within(section).getByRole("link", { name: /이력서 PDF/ })).toHaveAttribute(
      "href",
      profile.resumeHref,
    );
  });
});

describe("SiteFooter", () => {
  it("carries the copyright, location, and contact links", () => {
    render(<SiteFooter />);
    expect(screen.getByText(new RegExp(profile.name))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(profile.location))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: profile.email })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
    );
    expect(screen.getByRole("link", { name: profile.githubLabel })).toHaveAttribute(
      "href",
      profile.github,
    );
  });
});
