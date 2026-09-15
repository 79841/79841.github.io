import { describe, expect, it } from "vitest";
import { ARTS } from "@/shared/lib/art";

describe("ARTS", () => {
  it("keeps the palette small — colour is the theme's job, not a new variant", () => {
    expect(ARTS).toEqual(["mist", "dune", "tide"]);
  });
});
