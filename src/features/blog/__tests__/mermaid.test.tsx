import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Mermaid } from "@/features/blog/mermaid";

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
});
