import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Kind, Points, Retro, Screens, Shot } from "@/features/work/blocks";

const points = [
  { id: "p1", text: "세 도구를 수신기 하나로 받는다", level: 2 as const },
  { id: "p2", text: "비용은 도구마다 다르게 들어온다", level: 2 as const },
];

describe("Points", () => {
  it("lists every point as an anchor into the body", () => {
    render(<Points points={points} />);
    const nav = screen.getByRole("navigation", { name: "요점" });
    const links = within(nav).getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "#p1");
    expect(links[1]).toHaveTextContent("비용은 도구마다 다르게 들어온다");
  });

  it("stays out of the way when there is only one point", () => {
    const { container } = render(<Points points={points.slice(0, 1)} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Kind", () => {
  it("renders the small label that sits above a point", () => {
    render(<Kind>트러블슈팅</Kind>);
    expect(screen.getByText("트러블슈팅")).toHaveClass("point-kind");
  });
});

describe("Shot", () => {
  it("pairs each numbered pin with a note below the screen", () => {
    const { container } = render(
      <Shot
        src="/work/argus.webp"
        width={1280}
        height={900}
        alt="Argus 대시보드"
        pins={[
          { x: 10, y: 20, title: "오늘 비용", text: "두 경로의 합" },
          { x: 60, y: 50, title: "최근 세션" },
        ]}
      />,
    );
    expect(screen.getByAltText("Argus 대시보드")).toBeInTheDocument();
    expect(container.querySelectorAll(".work-pin")).toHaveLength(2);
    const notes = container.querySelectorAll(".work-notes li");
    expect(notes).toHaveLength(2);
    expect(notes[0]).toHaveTextContent("오늘 비용");
    expect(notes[0]).toHaveTextContent("두 경로의 합");
  });

  it("shows a plain screen when there are no pins", () => {
    const { container } = render(
      <Shot src="/work/argus.webp" width={1280} height={900} alt="화면" />,
    );
    expect(container.querySelector(".work-notes")).toBeNull();
  });
});

describe("Screens", () => {
  const phone = { width: 480, height: 800 };
  const wide = { width: 1600, height: 1000 };

  it("stands portrait screens side by side on the mat", () => {
    const { container } = render(
      <Screens
        images={[
          { src: "/a.webp", alt: "사용자 앱", ...phone },
          { src: "/b.webp", alt: "관리자 앱", ...phone },
        ]}
        caption="두 앱의 화면"
      />,
    );
    expect(container.querySelector(".work-phones")).not.toBeNull();
    expect(screen.getByText("두 앱의 화면")).toBeInTheDocument();
  });

  it("lays landscape screens out in a grid", () => {
    const { container } = render(
      <Screens images={[{ src: "/c.webp", alt: "목록", ...wide }]} />,
    );
    expect(container.querySelector(".work-landscape")).not.toBeNull();
    expect(container.querySelector(".work-phones")).toBeNull();
  });
});

describe("Retro", () => {
  it("labels the closing section as a retrospective", () => {
    render(
      <Retro>
        <p>남은 과제와 배운 것</p>
      </Retro>,
    );
    const section = screen.getByRole("region", { name: "회고" });
    expect(section).toHaveTextContent("남은 과제와 배운 것");
  });
});
