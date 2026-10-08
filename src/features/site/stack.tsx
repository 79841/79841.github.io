import { SectionHead } from "@/features/site/section-head";
import { stackGroups } from "@/shared/lib/profile";
import { Reveal } from "@/shared/ui/reveal";

/**
 * 분류마다 한 열 — 윗줄 괘선 아래 이름표, 그 아래 기술 이름을 글자로만 세운다.
 * 칩을 쓰지 않는 것은 이력 뱃지와 겹쳐 페이지가 알약으로 가득해지지 않게 하기 위해서다.
 * 홈과 About이 같은 모양을 쓴다.
 */
function StackList() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-3">
      {stackGroups.map((group, i) => (
        <Reveal key={group.label} delay={(i % 3) * 50}>
          <div className="stack-group flex flex-col gap-4 border-t border-hairline pt-4">
            <h3 className="eyebrow">{group.label}</h3>
            <ul className="flex flex-col gap-2">
              {group.items.map((item) => (
                <li key={item} className="text-[15px] leading-[1.45] tracking-[-0.01em]">
                  {item}
                </li>
              ))}
            </ul>
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

/** /about의 기술 스택 — 홈과 같은 열, 이동 알약만 없다 */
export function StackPanels() {
  return (
    <section aria-labelledby="stack-panels-h" className="mt-20">
      <SectionHead eyebrow="STACK" title="기술 스택" id="stack-panels-h" />
      <StackList />
    </section>
  );
}
