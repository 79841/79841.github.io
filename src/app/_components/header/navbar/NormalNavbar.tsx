import { navigationLinks } from "@/data";
import Link from "next/link";
import React from "react";

export const NormalNavbar = () => {
  return (
    <nav className="gap-5 text-sm sm:flex">
      {Object.values(navigationLinks).map((linkInfo) => (
        <Link key={linkInfo.name} href={linkInfo.path}>
          {linkInfo.name}
        </Link>
      ))}
    </nav>
  );
};
