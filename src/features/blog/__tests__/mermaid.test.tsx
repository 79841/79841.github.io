import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Mermaid, viewBoxRatio } from "@/features/blog/mermaid";

const renderMock = vi.hoisted(() => vi.fn());
const initializeMock = vi.hoisted(() => vi.fn());

vi.mock("mermaid", () => ({
  default: { initialize: initializeMock, render: renderMock },
}));

describe("Mermaid", () => {
  it("renders the SVG mermaid produces for the fence", async () => {
    renderMock.mockResolvedValueOnce({ svg: '<svg data-testid="diagram"></svg>' });
    render(<Mermaid code={"flowchart LR\n  A --> B"} />);

    await waitFor(() => {
      expect(screen.getByTestId("diagram")).toBeInTheDocument();
    });
    expect(initializeMock).toHaveBeenCalledWith(
      expect.objectContaining({ startOnLoad: false, securityLevel: "strict", theme: "base" }),
    );
    expect(renderMock).toHaveBeenCalledWith(expect.any(String), "flowchart LR\n  A --> B");
  });

  it("shows the error and the source when the diagram cannot be drawn", async () => {
    renderMock.mockRejectedValueOnce(new Error("Parse error on line 2"));
    render(<Mermaid code={"flowchart LR\n  A -->"} />);

    await waitFor(() => {
      expect(screen.getByText(/다이어그램을 그리지 못했습니다/)).toBeInTheDocument();
    });
    expect(screen.getByText(/Parse error on line 2/)).toBeInTheDocument();
    expect(screen.getByText(/A -->/)).toBeInTheDocument();
  });

  it("opens the diagram in a screen-sized view and closes it with Escape or the backdrop", async () => {
    renderMock.mockResolvedValueOnce({ svg: '<svg data-testid="diagram"></svg>' });
    render(<Mermaid code={"flowchart LR\n  A --> B"} />);

    const expand = await screen.findByRole("button", { name: "다이어그램 크게 보기" });
    fireEvent.click(expand);
    const dialog = screen.getByRole("dialog", { name: "다이어그램 크게 보기" });
    expect(dialog.querySelector(".diagram-zoom-stage svg")).not.toBeNull();
    expect(screen.getByRole("button", { name: "닫기" })).toHaveFocus();
    // 열린 동안 본문은 스크롤되지 않는다
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.body.style.overflow).toBe("");

    fireEvent.click(screen.getByTestId("diagram"));
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("keeps the view open when the panel itself is clicked", async () => {
    renderMock.mockResolvedValueOnce({ svg: '<svg data-testid="diagram"></svg>' });
    render(<Mermaid code={"flowchart LR\n  A --> B"} />);

    fireEvent.click(await screen.findByRole("button", { name: "다이어그램 크게 보기" }));
    fireEvent.click(document.querySelector(".diagram-zoom-panel")!);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("reads the diagram shape from the viewBox so the zoomed view grows along it", () => {
    expect(viewBoxRatio('<svg viewBox="0 0 1200 300"></svg>')).toBe(4);
    expect(viewBoxRatio('<svg viewBox="-8 -8 400 800"></svg>')).toBe(0.5);
    expect(viewBoxRatio("<svg></svg>")).toBe(1.5);
  });
});
