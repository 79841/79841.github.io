import Link from "next/link";

interface MoreLinkProps {
  href: string;
  label: string;
  /** 우측에 붙는 mono 카운터 — "04" 같은 값 */
  count?: string;
}

/** 섹션 끝에서 전용 페이지로 넘어가는 행 — 메인의 세 섹션이 같은 모양을 쓴다 */
export function MoreLink({ href, label, count }: MoreLinkProps) {
  return (
    <Link
      href={href}
      className="group mt-12 flex items-baseline justify-between border-t border-hairline py-6 transition-colors hover:bg-imgbg/50"
    >
      <span className="text-[14px] font-bold">
        {label}
        <span
          aria-hidden
          className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
      {count ? (
        <span className="font-mono text-[10px] tracking-[0.2em] text-ghost">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
