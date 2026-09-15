import { describe, expect, it } from "vitest";
import { codeMetaOf, langFromClassName, textOf } from "@/shared/lib/code";

describe("langFromClassName", () => {
  it("reads the language from an MDX code className", () => {
    expect(langFromClassName("language-ts")).toBe("ts");
    expect(langFromClassName("hljs language-mermaid extra")).toBe("mermaid");
  });

  it("returns an empty string when there is no language", () => {
    expect(langFromClassName(undefined)).toBe("");
    expect(langFromClassName("plain")).toBe("");
  });
});

describe("textOf", () => {
  it("flattens nested React children to a string", () => {
    expect(
      textOf(
        <code>
          const a = <span>1</span>;{"\n"}
        </code>,
      ),
    ).toBe("const a = 1;\n");
    expect(textOf(["a", 1, null, false, ["b"]])).toBe("a1b");
  });
});

describe("codeMetaOf", () => {
  it("recognises a mermaid fence the way @next/mdx compiles it", () => {
    const meta = codeMetaOf(<code className="language-mermaid">{"flowchart LR\n  A --> B\n"}</code>);
    expect(meta.lang).toBe("mermaid");
    expect(meta.code).toBe("flowchart LR\n  A --> B");
  });

  it("keeps plain fences as code with no language", () => {
    const meta = codeMetaOf(<code>{"echo hi\n"}</code>);
    expect(meta.lang).toBe("");
    expect(meta.code).toBe("echo hi");
  });

  it("looks at the first child when MDX passes an array", () => {
    const meta = codeMetaOf([<code key="c" className="language-tsx">{"x"}</code>]);
    expect(meta.lang).toBe("tsx");
  });
});
