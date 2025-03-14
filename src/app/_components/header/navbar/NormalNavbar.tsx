import { navigationLinks } from "@/data";
import Link from "next/link";

export const NormalNavbar = () => {
  return (
    <nav className="gap-5 text-sm sm:flex">
      {Object.values(navigationLinks).map((linkInfo) => (
        <Link
          key={linkInfo.name}
          href={linkInfo.path}
          className={
            linkInfo.isSpecial
              ? "font-bold text-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.9)] transition-colors hover:text-blue-500 hover:drop-shadow-[0_0_10px_rgba(29,78,216,0.8)]"
              : ""
          }
        >
          {linkInfo.name}
        </Link>
      ))}
    </nav>
  );
};
