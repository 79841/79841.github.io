import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { isActive, Nav } from "@/features/site/nav";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

afterEach(() => {
  pathname.current = "/";
});

describe("isActive", () => {
  // trailingSlash: true라 브라우저는 "/work/"를 준다 — 정규화가 빠지면 전부 비활성이 된다
  it("treats a trailing slash as the same route", () => {
    expect(isActive("/work/", "/work")).toBe(true);
    expect(isActive("/work", "/work")).toBe(true);
  });

  it("keeps the parent active on detail pages", () => {
    expect(isActive("/work/argus/", "/work")).toBe(true);
    expect(isActive("/blog/tag/react/", "/blog")).toBe(true);
    expect(isActive("/blog/frame-drop/", "/blog")).toBe(true);
  });

  it("matches Home only at the root", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/work/", "/")).toBe(false);
  });

  it("does not let one route bleed into another", () => {
    expect(isActive("/work/", "/blog")).toBe(false);
    // 접두사만 같은 별개 라우트를 활성으로 오인하면 안 된다
    expect(isActive("/workshop/", "/work")).toBe(false);
  });
});

describe("Nav", () => {
  it("renders the four routes", () => {
    render(<Nav />);
    for (const [label, href] of [
      ["Home", "/"],
      ["Work", "/work"],
      ["Blog", "/blog"],
      ["About", "/about"],
    ]) {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href,
      );
    }
  });

  it("marks the current section on a detail page", () => {
    pathname.current = "/blog/frame-drop/";
    render(<Nav />);

    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Work" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks Home at the root", () => {
    pathname.current = "/";
    render(<Nav />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
