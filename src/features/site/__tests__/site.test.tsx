import { cleanup, render, screen, within } from "@testing-library/react";
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
  it("links the first work and puts its name and meta under the image card", () => {
    const [featured] = works;
    render(<FeaturedWork work={featured} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", `/work/${featured.slug}`);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent(featured.name);
    // 글자는 이미지 카드 밖에 둔다
    expect(heading.closest(".gcard")).toBeNull();
    expect(screen.getByRole("link")).toHaveTextContent(featured.badge!);
    expect(screen.getByRole("link")).toHaveTextContent(featured.stack);
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

  it("keeps the image card free of text and shows name, period and badge below it", () => {
    for (const work of works) {
      const { container, unmount } = render(<WorkCard work={work} />);
      const card = container.querySelector(".gcard")!;
      expect(card.textContent).toBe("");
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent(work.name);
      expect(heading.closest(".gcard")).toBeNull();
      for (const meta of [work.period, work.badge].filter(Boolean)) {
        expect(screen.getByRole("link")).toHaveTextContent(meta!);
      }
      unmount();
    }
  });
});

describe("MoreWorks", () => {
  it("shows what each work is and what it was built with", () => {
    render(<MoreWorks />);
    for (const work of moreWorks) {
      const tile = screen.getByText(work.name).closest(".more-tile") as HTMLElement;
      expect(tile).toHaveTextContent(work.summary);
      for (const tech of work.stack) {
        expect(tile).toHaveTextContent(tech);
      }
    }
  });

  it("keeps the period apart from the stack so the meta line never mixes them", () => {
    render(<MoreWorks />);
    for (const work of moreWorks) {
      const tile = screen.getByText(work.name).closest(".more-tile") as HTMLElement;
      const stackLine = within(tile).getByText(work.stack.join(" · "));
      if (work.period) {
        expect(stackLine).not.toHaveTextContent(work.period);
        expect(within(tile).getByText(work.period)).toBeInTheDocument();
      }
    }
  });

  it("uses wide two-column tiles when asked", () => {
    const { container } = render(<MoreWorks wide />);
    expect(container.querySelectorAll(".more-tile-wide")).toHaveLength(moreWorks.length);
    expect(container.querySelector("ul")!.className).not.toContain("lg:grid-cols-4");
  });

  it("makes only linked tiles behave like cards", () => {
    render(<MoreWorks />);
    for (const work of moreWorks) {
      const tile = screen.getByText(work.name).closest(".more-tile");
      expect(tile?.classList.contains("gcard")).toBe(Boolean(work.href));
    }
  });

  it("links tiles that have an href and leaves the rest as plain tiles", () => {
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
  it("draws each post as a cover card with one big word and the title below it", () => {
    const posts = [
      { ...post("a", "첫 번째 글", "2026-03-01"), tags: ["Obsidian", "Claude"] },
      { ...post("b", "두 번째 글", "2026-02-01"), tags: ["Expo", "EAS"] },
      { ...post("c", "세 번째 글", "2026-01-01"), tags: ["Expo", "iOS"] },
    ];
    const { container } = render(<RecentPosts posts={posts} />);
    const covers = [...container.querySelectorAll(".post-cover")];
    expect(covers.map((cover) => cover.querySelector(".cover-word")!.textContent)).toEqual([
      "Obsidian",
      "EAS",
      "iOS",
    ]);
    // 제목은 커버 밖에 둔다
    const heading = screen.getByRole("heading", { name: "첫 번째 글" });
    expect(heading.closest(".post-cover")).toBeNull();
    expect(heading.closest("a")).toHaveAttribute("href", "/blog/a");
  });

  it("says so when there is nothing to show", () => {
    render(<RecentPosts posts={[]} />);
    expect(screen.getByText("아직 쓴 글이 없습니다.")).toBeInTheDocument();
  });

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

  it("fills only the current role's chip with ink", () => {
    render(<Experience />);
    for (const entry of experiences) {
      const chip = screen.getAllByText(entry.org)[0].closest(".tl-chip");
      expect(chip).not.toBeNull();
      if (entry.current) {
        expect(chip).toHaveClass("is-current");
      } else {
        expect(chip).not.toHaveClass("is-current");
      }
    }
  });

  it("places each award on the timeline itself, in date order", () => {
    const { container } = render(<Experience />);
    const items = [...container.querySelectorAll("ol > li")];
    expect(items).toHaveLength(experiences.length + awards.length);
    const awardItems = items.filter((li) => li.getAttribute("data-kind") === "award");
    expect(awardItems).toHaveLength(awards.length);
    for (const award of awards) {
      const li = screen.getByText(award.name).closest("li")!;
      expect(li).toHaveAttribute("data-kind", "award");
      expect(li).toHaveTextContent(award.org);
    }
    // 수상을 타임라인 아래에 따로 모으던 줄은 없다
    expect(screen.queryByText("AWARDS")).not.toBeInTheDocument();
  });

  it("shows each role's keywords as badges under its chip", () => {
    const { container } = render(<Experience />);
    // 카드 없이 칩과 뱃지만 — 유리 카드로 돌아가면 여기서 걸린다
    expect(container.querySelector(".tl-card, .glass-strong")).toBeNull();
    const [first] = experiences;
    const chip = screen.getAllByText(first.org)[0].closest(".tl-chip")!;
    const badges = chip.nextElementSibling!;
    for (const tag of first.tags) {
      expect(within(badges as HTMLElement).getByText(tag)).toBeInTheDocument();
    }
  });
});

describe("Stack", () => {
  it("renders every group and item as plain text columns on the home page", () => {
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
    // 기술 이름은 칩이 아니라 글자로 — 칩은 이력 뱃지에만 쓴다
    expect(document.querySelector("#about .chip")).toBeNull();
  });

  it("uses the same columns on the about page as on the home page", () => {
    const home = render(<StackRows />).container;
    const rowsOf = (root: HTMLElement) =>
      [...root.querySelectorAll(".stack-group")].map((row) => row.innerHTML);
    const homeRows = rowsOf(home);
    cleanup();

    const about = render(<StackPanels />).container;
    // 홈과 About의 스택 열은 글자 하나까지 같아야 한다 — 한쪽만 손대면 여기서 걸린다
    expect(rowsOf(about)).toEqual(homeRows);
    expect(homeRows).toHaveLength(stackGroups.length);
    // 이동 알약은 홈에만 있다
    expect(
      within(about).queryByRole("link", { name: /더 알아보기/ }),
    ).not.toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("shows a business card with name and title next to the heading", () => {
    render(<Contact />);
    const section = screen.getByRole("region", { name: /Get in touch/ });
    expect(within(section).getByText(profile.name)).toBeInTheDocument();
    expect(within(section).getByText(profile.jobTitle)).toBeInTheDocument();
  });

  it("links email, github, and resume", () => {
    render(<Contact />);
    const section = screen.getByRole("region", { name: /Get in touch/ });
    expect(
      within(section).getByRole("link", { name: profile.email }),
    ).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(within(section).getByRole("link", { name: profile.githubLabel })).toHaveAttribute(
      "href",
      profile.github,
    );
    expect(within(section).getByRole("link", { name: "메일 보내기" })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`,
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
