import Link from "next/link";
import { ArrowLeft } from "@/shared/ui/icons";

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <span className="chip font-mono">404</span>
      <h1 className="mt-6 text-[clamp(1.8rem,4vw,2.8rem)] font-medium tracking-[-0.03em]">
        여기엔 아무것도 없습니다.
      </h1>
      <p className="mt-3 text-[16px] text-muted">
        주소가 바뀌었거나, 처음부터 없던 페이지입니다.
      </p>
      <Link href="/" className="btn btn-glass mt-10">
        <ArrowLeft /> 홈으로
      </Link>
    </main>
  );
}
