import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Contact } from "@/features/site/contact";
import { Hero } from "@/features/site/hero";
import { Works } from "@/features/site/works";
import { moreWorks, profile, works } from "@/shared/lib/profile";

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
      const card = screen.getByText(work.name).closest("a");
      expect(card).toHaveAttribute("href", `/work/${work.slug}`);
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
    expect(within(resume.closest("section")!).getByText(/함께 만들 것이/)).toBeInTheDocument();
  });
});
