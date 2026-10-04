import { SectionHead } from "@/features/site/section-head";
import { stackGroups } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/** 괘선 행 — 왼쪽에 분류, 오른쪽에 칩. 홈과 About이 같은 모양을 쓴다 */
function StackList() {
  return (
    <div className="mt-6 flex flex-col">
      {stackGroups.map((group, i) => (
        <Reveal key={group.label} delay={(i % 3) * 50}>
          <div
            className={`stack-row grid gap-2.5 border-t border-hairline px-2 py-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-center sm:gap-6 ${
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
        </Reveal>
      ))}
    </div>
  );
}

/** 홈의 기술 스택 — 오른쪽에 About으로 가는 알약이 붙는다 */
export function StackRows() {
  return (
    <section id="about" aria-labelledby="stack-h" className="mt-24 scroll-mt-20">
      <SectionHead
        eyebrow="STACK"
        title="기술 스택"
        id="stack-h"
        more={{ href: "/about", label: "더 알아보기" }}
      />
      <StackList />
    </section>
  );
}

/** /about의 기술 스택 — 홈과 같은 행, 이동 알약만 없다 */
export function StackPanels() {
  return (
    <section aria-labelledby="stack-panels-h" className="mt-20">
      <SectionHead eyebrow="STACK" title="기술 스택" id="stack-panels-h" />
      <StackList />
    </section>
  );
}
