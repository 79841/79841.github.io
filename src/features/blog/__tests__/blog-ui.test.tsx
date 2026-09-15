import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CodeBlock } from "@/features/blog/code-block";
import { PostCard } from "@/features/blog/post-card";
import { TagRail } from "@/features/blog/tag-rail";
import { Toc } from "@/features/blog/toc";
import type { Post } from "@/shared/lib/blog";

vi.mock("@/features/blog/mermaid", () => ({
  Mermaid: ({ code }: { code: string }) => <div data-testid="mermaid">{code}</div>,
}));

const post: Post = {
  slug: "frame-drop",
  title: "로그 리스트 전체 리렌더가 Frame Drop 85%의 원인이었다",
  date: "2026-06-18",
  summary: "요약",
  tags: ["React", "Performance", "Electron"],
  readingMinutes: 4,
  art: "mist",
  headings: [
    { id: "sym", text: "증상", level: 2 },
    { id: "fix", text: "수정", level: 2 },
    { id: "fix-detail", text: "세부", level: 3 },
  ],
};

describe("PostCard", () => {
  it("links to the post, shows the date, and caps tags at two", () => {
    render(<PostCard post={post} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/frame-drop");
    expect(screen.getByText("2026.06.18")).toBeInTheDocument();
    expect(link).toHaveTextContent("React · Performance");
    expect(link).not.toHaveTextContent("Electron");
  });
});

describe("TagRail", () => {
  const tags = [
    { tag: "React", slug: "react", count: 2 },
    { tag: "Expo", slug: "expo", count: 1 },
  ];

  it("marks 전체 as current when no tag is active", () => {
    render(<TagRail tags={tags} total={3} />);
    expect(screen.getByRole("link", { name: /전체/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /React/ })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks the active tag and links every tag to its page", () => {
    render(<TagRail tags={tags} activeSlug="expo" total={3} />);
    expect(screen.getByRole("link", { name: /Expo/ })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /React/ })).toHaveAttribute(
      "href",
      "/blog/tag/react",
    );
    expect(screen.getByRole("link", { name: /전체/ })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders nothing without tags", () => {
    const { container } = render(<TagRail tags={[]} total={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("keeps every tag in one list so a long list grows the rail, not the header", () => {
    const many = Array.from({ length: 24 }, (_, i) => ({
      tag: `태그${i}`,
      slug: `t${i}`,
      count: 1,
    }));
    const { container } = render(<TagRail tags={many} total={24} />);
    const list = container.querySelector(".taglist")!;
    expect(list.children).toHaveLength(many.length + 1);
    expect(container.querySelectorAll(".chip, .glass")).toHaveLength(0);
  });
});

describe("Toc", () => {
  it("lists headings with anchors and starts on the first one", () => {
    render(<Toc headings={post.headings} />);
    expect(screen.getByRole("link", { name: "증상" })).toHaveAttribute("href", "#sym");
    expect(screen.getByRole("link", { name: "증상" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "수정" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("renders nothing without headings", () => {
    const { container } = render(<Toc headings={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("CodeBlock", () => {
  it("renders a labelled code block with a copy button", () => {
    render(
      <CodeBlock>
        <code className="language-ts">{"const a = 1;\n"}</code>
      </CodeBlock>,
    );
    expect(screen.getByText("ts")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /코드 복사/ })).toBeInTheDocument();
    expect(screen.queryByTestId("mermaid")).not.toBeInTheDocument();
  });

  it("hands a mermaid fence to the diagram renderer instead", () => {
    render(
      <CodeBlock>
        <code className="language-mermaid">{"flowchart LR\n  A --> B\n"}</code>
      </CodeBlock>,
    );
    expect(screen.getByTestId("mermaid")).toHaveTextContent("flowchart LR");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
