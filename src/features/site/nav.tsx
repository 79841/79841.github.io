"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/features/site/theme-toggle";
import { profile } from "@/shared/lib/profile";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

/** trailingSlash: true라 브라우저 경로는 "/work/"로 들어온다 — 비교 전에 끝 슬래시를 떼어낸다 */
function normalize(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** 상세 페이지에서도 상위 항목이 켜져 있어야 한다 — /work/argus → Work, /blog/tag/react → Blog */
export function isActive(pathname: string, href: string): boolean {
  const current = normalize(pathname);
  if (href === "/") return current === "/";
  return current === href || current.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-baseline justify-between py-8">
      <Link
        href="/"
        className="text-[14px] font-semibold tracking-[-0.01em] transition-colors hover:text-muted"
      >
        {profile.name}
      </Link>

      <div className="flex items-baseline gap-5 text-[13px] sm:gap-7">
        {links.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`transition-colors hover:text-ink ${
                active ? "text-ink" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
}
