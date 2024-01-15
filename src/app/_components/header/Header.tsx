import { siteMetadata } from "@/data";
import React from "react";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <div className="fixed w-[1320px] px-5 h-12 border flex justify-between items-center">
      <h1>{siteMetadata.username}</h1>
      <Navbar />
    </div>
  );
};
