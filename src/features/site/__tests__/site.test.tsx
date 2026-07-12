import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/features/site/contact";
import { Hero } from "@/features/site/hero";
import { MoreWorks } from "@/features/site/more-works";
import { RecentPosts } from "@/features/site/recent-posts";
import { SiteFooter } from "@/features/site/site-footer";
import { WorkCard } from "@/features/site/work-card";
import { Works } from "@/features/site/works";
import type { Post } from "@/shared/lib/blog";
import { footerNote, moreWorks, profile, works } from "@/shared/lib/profile";

function post(slug: string, title: string, date: string): Post {
  return {
    slug,
    title,
    date,
    summary: `${title} 요약`,
    tags: ["React"],
    readingMinutes: 3,
    headings: [],
  };
}

describe("Hero", () => {
  it("renders the two-line thesis and summary", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(profile.thesis[0]);
    expect(heading).toHaveTextContent(profile.thesis[1]);
    expect(screen.getByText(profile.summary)).toBeInTheDocument();
  });
});

describe("Works", () => {
  it("renders every visual work with its screenshot", () => {
    render(<Works />);
    for (const work of works) {
      expect(screen.getByText(work.name)).toBeInTheDocument();
    }
    const images = screen.getAllByRole("img");
    const totalImages = works.reduce((n, w) => n + w.images.length, 0);
    expect(images).toHaveLength(totalImages);
    for (const img of images) {
      expect(img).toHaveClass("mono-img");
    }
  });

  it("links each visual work to its detail page and shows the hover hint", () => {
    render(<Works />);
    for (const work of works) {
      expect(screen.getByText(work.name).closest("a")).toHaveAttribute(
        "href",
        `/work/${work.slug}`,
      );
    }
    expect(
      screen.getByText(/마우스를 올리면 색이 돌아옵니다/),
    ).toBeInTheDocument();
  });

  it("lists more-works rows", () => {
    render(<Works />);
    for (const work of moreWorks) {
      expect(screen.getByText(work.name)).toBeInTheDocument();
    }
  });
});

describe("WorkCard", () => {
  it("renders every screenshot in duotone", () => {
    for (const work of works) {
      const { unmount } = render(<WorkCard work={work} />);
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(work.images.length);
      for (const img of images) {
        expect(img).toHaveClass("mono-img");
      }
      unmount();
    }
  });
});

describe("MoreWorks", () => {
  it("lists every text-only work row", () => {
    render(<MoreWorks />);
    for (const work of moreWorks) {
      expect(screen.getByText(work.name)).toBeInTheDocument();
    }
  });
});

describe("RecentPosts", () => {
  it("shows the posts it is given and links to the full blog", () => {
    const posts = [
      post("a", "첫 번째 글", "2026-03-01"),
      post("b", "두 번째 글", "2026-02-01"),
    ];
    render(<RecentPosts posts={posts} total={9} />);

    expect(screen.getByText("첫 번째 글")).toBeInTheDocument();
    expect(screen.getByText("두 번째 글")).toBeInTheDocument();

    const more = screen.getByRole("link", { name: /모든 글/ });
    expect(more).toHaveAttribute("href", "/blog");
    expect(more).toHaveTextContent("09");
  });

  it("links a post to its own page", () => {
    render(<RecentPosts posts={[post("a", "첫 번째 글", "2026-03-01")]} total={1} />);
    expect(screen.getByText("첫 번째 글").closest("a")).toHaveAttribute(
      "href",
      "/blog/a",
    );
  });
});

describe("Contact", () => {
  it("links email, github, and resume", () => {
    render(<Contact />);
    const email = screen.getByRole("link", { name: profile.email });
    expect(email).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(
      screen.getByRole("link", { name: new RegExp(profile.githubLabel) }),
    ).toHaveAttribute("href", profile.github);
    const resume = screen.getByRole("link", { name: /이력서 PDF/ });
    expect(resume).toHaveAttribute("href", profile.resumeHref);
    expect(
      within(resume.closest("section")!).getByText(/함께 만들 것이/),
    ).toBeInTheDocument();
  });
});

describe("SiteFooter", () => {
  it("carries the copyright and the note", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(new RegExp(profile.nameEn.toUpperCase())),
    ).toBeInTheDocument();
    expect(screen.getByText(footerNote.toUpperCase())).toBeInTheDocument();
  });
});
