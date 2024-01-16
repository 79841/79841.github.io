import { navigationLinks, siteMetadata } from "@/data";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <h1 className="text-xl">
      <Link href={navigationLinks.home.path}>{siteMetadata.username}</Link>
    </h1>
  );
};
