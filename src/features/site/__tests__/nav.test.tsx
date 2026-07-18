import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { isActive, Nav } from "@/features/site/nav";

const pathname = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathname.current,
}));

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
}

afterEach(() => {
  pathname.current = "/";
  setScrollY(0);
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

  it("assembles into a capsule after scrolling and relaxes back at the top", async () => {
    render(<Nav />);
    const header = screen.getByRole("banner");
    expect(header).not.toHaveAttribute("data-scrolled");

    setScrollY(120);
    fireEvent.scroll(window);
    await waitFor(() => expect(header).toHaveAttribute("data-scrolled"));

    setScrollY(0);
    fireEvent.scroll(window);
    await waitFor(() => expect(header).not.toHaveAttribute("data-scrolled"));
  });

  it("shows the page nameplate when there are no labeled sections", () => {
    pathname.current = "/blog/tag/react/";
    const { container } = render(<Nav />);
    expect(container.querySelector(".nav-ctx")).toHaveTextContent("BLOG");
  });

  it("keeps the nameplate empty on the root before sections report in", () => {
    pathname.current = "/";
    const { container } = render(<Nav />);
    expect(container.querySelector(".nav-ctx")).toBeEmptyDOMElement();
  });

  it("puts a reading-progress ring in the brand slot instead of the name", () => {
    const { container } = render(<Nav />);
    expect(screen.getByRole("button", { name: "맨 위로" })).toBeInTheDocument();
    expect(container.querySelector(".nav-gauge-arc")).not.toBeNull();
    // 이름은 더 이상 헤더에 없다 — 히어로와 푸터가 말한다
    expect(screen.queryByText("명인지")).not.toBeInTheDocument();
  });

  it("scrolls back to the top when the ring is pressed", () => {
    const scrollTo = vi
      .spyOn(window, "scrollTo")
      .mockImplementation(() => {});
    render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: "맨 위로" }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    scrollTo.mockRestore();
  });
});
