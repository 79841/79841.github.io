import type { ReactNode } from "react";
import type { Work } from "@/shared/lib/profile";
import { ArrowUpRight } from "@/shared/ui/icons";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stack-row grid gap-1.5 border-t border-hairline px-2 py-3.5 last:border-b sm:grid-cols-[120px_minmax(0,1fr)] sm:items-baseline sm:gap-6">
      <dt className="eyebrow">{label}</dt>
      <dd className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-body">
        {children}
      </dd>
    </div>
  );
}

/**
 * 상세 맨 위의 개요 — 기간·역할·스택·링크.
 * 채용 담당자가 가장 먼저 찾는 것들이라 본문 앞에 괘선 표로 고정한다.
 */
export function WorkOverview({ work }: { work: Work }) {
  const period = [work.period, work.badge].filter(Boolean).join(", ");

  return (
    <dl className="flex flex-col">
      {period ? <Row label="기간">{period}</Row> : null}
      <Row label="역할">{work.role}</Row>
      <Row label="스택">
        <span className="flex flex-wrap gap-2">
          {work.stack.split("·").map((item) => (
            <span key={item} className="chip">
              {item.trim()}
            </span>
          ))}
        </span>
      </Row>
      {work.links.length > 0 ? (
        <Row label="링크">
          {work.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-ink underline decoration-ink/25 underline-offset-[5px] transition-colors hover:decoration-ink"
            >
              {link.label} <ArrowUpRight />
            </a>
          ))}
        </Row>
      ) : null}
    </dl>
  );
}
