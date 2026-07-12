import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6">
      <p className="font-mono text-[11px] tracking-[0.3em] text-ghost">404</p>
      <h1 className="mt-4 text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em]">
        여기엔 아무것도 없습니다.
      </h1>
      <p className="mt-3 text-[13.5px] text-muted">
        주소가 바뀌었거나, 처음부터 없던 페이지입니다.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-[11px] tracking-[0.1em] text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
      >
        ← 홈으로
      </Link>
    </div>
  );
}
