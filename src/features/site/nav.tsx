"use client";

import { useEffect, useState } from "react";
import { profile } from "@/shared/lib/profile";
import { ThemeToggle } from "@/features/site/theme-toggle";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const { id } of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex items-baseline justify-between py-8">
      <a
        href="#top"
        className="text-[14px] font-semibold tracking-[-0.01em] transition-colors hover:text-muted"
      >
        {profile.name}
      </a>
      <div className="flex items-baseline gap-5 text-[13px] sm:gap-7">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`transition-colors hover:text-ink ${
              active === link.id ? "text-ink" : "text-muted"
            }`}
          >
            {link.label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
