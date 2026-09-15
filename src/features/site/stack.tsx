import { SectionHead } from "@/features/site/section-head";
import { stackGroups } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 홈의 기술 스택 — 라벨 왼쪽, 칩 오른쪽의 괘선 행 */
export function StackRows() {
  return (
    <section id="about" aria-labelledby="stack-h" className="mt-24 scroll-mt-20">
      <SectionHead
        eyebrow="STACK"
        title="기술 스택"
        id="stack-h"
        more={{ href: "/about", label: "더 알아보기" }}
      />
      <Reveal>
        <div className="mt-6 flex flex-col">
          {stackGroups.map((group, i) => (
            <div
              key={group.label}
              className={`grid gap-2.5 border-t border-hairline px-2 py-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center sm:gap-6 ${
                i === stackGroups.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="eyebrow">{group.label}</span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/** /about의 기술 스택 — 그룹마다 괘선 행, 항목은 가운뎃점으로 이어붙인 낱말 */
export function StackPanels() {
  return (
    <section aria-labelledby="stack-panels-h" className="mt-20">
      <SectionHead eyebrow="STACK" title="기술 스택" id="stack-panels-h" />
      <div className="mt-6 flex flex-col">
        {stackGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 40}>
            <div
              className={`grid gap-2 border-t border-hairline px-2 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-baseline sm:gap-8 ${
                i === stackGroups.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="eyebrow">{group.label}</span>
              <p className="dotlist text-[16px] leading-[1.5]">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
