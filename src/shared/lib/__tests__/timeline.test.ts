import { describe, expect, it } from "vitest";
import { awards, experiences } from "@/shared/lib/profile";
import type { Award, ExperienceEntry } from "@/shared/lib/profile";
import { buildTimeline, startOf } from "@/shared/lib/timeline";

function role(period: string, org: string): ExperienceEntry {
  return { period, org, role: "역할", desc: "한 일", tags: [] };
}

function award(date: string, name: string): Award {
  return { date, name, org: "기관" };
}

describe("startOf", () => {
  it("takes the starting year and month of a period or a date", () => {
    expect(startOf("2024.02 — 현재")).toBe("2024.02");
    expect(startOf("2018.08 — 2020.05")).toBe("2018.08");
    expect(startOf("2021.12")).toBe("2021.12");
    expect(startOf("언젠가")).toBe("");
  });
});

describe("buildTimeline", () => {
  it("puts awards between the roles by date, newest first", () => {
    const items = buildTimeline(
      [role("2024.02 — 현재", "A"), role("2018.08 — 2020.05", "B")],
      [award("2020.12", "우승"), award("2019.11", "3위")],
    );
    expect(items.map((item) => item.when)).toEqual(["2024.02", "2020.12", "2019.11", "2018.08"]);
    expect(items.map((item) => item.kind)).toEqual(["role", "award", "award", "role"]);
  });

  it("lists the role first when a role and an award share a month", () => {
    const items = buildTimeline([role("2022.04 — 2022.06", "A")], [award("2022.04", "상")]);
    expect(items.map((item) => item.kind)).toEqual(["role", "award"]);
  });

  it("keeps every role and award from the profile exactly once", () => {
    const items = buildTimeline(experiences, awards);
    expect(items).toHaveLength(experiences.length + awards.length);
    expect(new Set(items.map((item) => item.key)).size).toBe(items.length);
    const whens = items.map((item) => item.when);
    expect([...whens].sort().reverse()).toEqual(whens);
  });
});
