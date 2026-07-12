import { footerNote, profile } from "@/shared/lib/profile";

/** 모든 페이지 공통 푸터 — layout에서 렌더한다 */
export function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-2 border-t border-hairline py-10 font-mono text-[10px] tracking-[0.15em] text-ghost">
      <span>© 2026 {profile.nameEn.toUpperCase()}</span>
      <span>{footerNote.toUpperCase()}</span>
    </footer>
  );
}
