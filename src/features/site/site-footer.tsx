import { profile } from "@/shared/lib/profile";

/** 모든 페이지 공통 푸터 — layout에서 렌더한다 */
export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-col gap-3 border-t border-hairline py-9 text-[13px] text-faint sm:flex-row sm:items-center sm:justify-between">
      <span>
        © 2026 {profile.name} · {profile.location}
      </span>
      <div className="flex gap-6">
        <a
          href={`mailto:${profile.email}`}
          className="text-faint transition-colors hover:text-ink"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-faint transition-colors hover:text-ink"
        >
          {profile.githubLabel}
        </a>
      </div>
    </footer>
  );
}
