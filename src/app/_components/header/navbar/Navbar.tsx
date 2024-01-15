import { navigationLinks } from "@/data/navigationLinks";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex gap-5">
      {Object.values(navigationLinks).map((linkInfo) => (
        <Link key={linkInfo.name} href={linkInfo.path}>
          {linkInfo.name}
        </Link>
      ))}
    </nav>
  );
};
