import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

type TProjectGithubLinksProps = {
  links: string[];
};
export const ProjectGithubLinks = ({ links }: TProjectGithubLinksProps) => {
  return (
    <div className="flex items-center gap-4 py-2 text-xs text-zinc-500">
      <FaGithub className="text-sm text-black" />
      {links.map((link) => (
        <div
          key={link}
          className="rounded-xl transition-all duration-500 hover:text-black"
        >
          <Link href={link}>{link.split("/").at(-1)}</Link>
        </div>
      ))}
    </div>
  );
};
