import { describe, expect, it } from "vitest";
import {
  parseCssColor,
  relativeLuminance,
  toneBehind,
  toneFromLuminance,
} from "@/shared/lib/tone";

describe("relativeLuminance", () => {
  it("runs from black to white", () => {
    expect(relativeLuminance(0, 0, 0)).toBe(0);
    expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 5);
  });

  it("weights green above red above blue", () => {
    expect(relativeLuminance(0, 255, 0)).toBeGreaterThan(relativeLuminance(255, 0, 0));
    expect(relativeLuminance(255, 0, 0)).toBeGreaterThan(relativeLuminance(0, 0, 255));
  });
});

describe("parseCssColor", () => {
  it("reads rgb and rgba the way getComputedStyle prints them", () => {
    expect(parseCssColor("rgb(23, 23, 26)")).toEqual({ r: 23, g: 23, b: 26, a: 1 });
    expect(parseCssColor("rgba(255, 255, 255, 0.5)")).toEqual({ r: 255, g: 255, b: 255, a: 0.5 });
    expect(parseCssColor("rgb(0 0 0 / 40%)")).toEqual({ r: 0, g: 0, b: 0, a: 0.4 });
  });

  it("returns null for anything else", () => {
    expect(parseCssColor("transparent")).toBeNull();
    expect(parseCssColor("#fff")).toBeNull();
  });
});

describe("toneFromLuminance", () => {
  it("calls paper light and ink dark", () => {
    expect(toneFromLuminance(relativeLuminance(244, 244, 241))).toBe("light");
    expect(toneFromLuminance(relativeLuminance(23, 23, 26))).toBe("dark");
    expect(toneFromLuminance(relativeLuminance(19, 19, 21))).toBe("dark");
  });
});

describe("toneBehind", () => {
  it("falls back when the browser cannot hit-test a point", () => {
    // jsdom에는 elementsFromPoint가 없다 — 그 경우 페이지 톤을 그대로 쓴다
    expect(toneBehind(10, 10, null, "dark")).toBe("dark");
  });

  it("prefers an explicit data-tone marker over computed backgrounds", () => {
    const marked = document.createElement("div");
    marked.dataset.tone = "dark";
    const original = document.elementsFromPoint;
    document.elementsFromPoint = () => [marked];
    try {
      expect(toneBehind(0, 0, null, "light")).toBe("dark");
    } finally {
      document.elementsFromPoint = original;
    }
  });

  it("skips the floating element itself", () => {
    const header = document.createElement("header");
    const inner = document.createElement("span");
    header.appendChild(inner);
    const original = document.elementsFromPoint;
    document.elementsFromPoint = () => [inner, header];
    try {
      expect(toneBehind(0, 0, header, "light")).toBe("light");
    } finally {
      document.elementsFromPoint = original;
    }
  });
});
