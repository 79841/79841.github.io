import { describe, expect, it } from "vitest";
import { coverWords } from "@/shared/lib/cover-word";

const post = (tags: string[], date = "2026-07-19") => ({ tags, date });

describe("coverWords", () => {
  it("picks the tag the neighbours share least, so two Expo posts do not both read Expo", () => {
    expect(
      coverWords([
        post(["Obsidian", "Claude", "Second Brain"]),
        post(["Expo", "EAS"]),
        post(["Expo", "iOS", "React Native"]),
      ]),
    ).toEqual(["Obsidian", "EAS", "iOS"]);
  });

  it("skips a word already used by an earlier card", () => {
    expect(coverWords([post(["React"]), post(["React", "Electron"])])).toEqual([
      "React",
      "Electron",
    ]);
  });

  it("falls back to the first tag when every tag is taken, and to the year without tags", () => {
    expect(coverWords([post(["React"]), post(["React"]), post([], "2024-01-01")])).toEqual([
      "React",
      "React",
      "2024",
    ]);
  });
});
