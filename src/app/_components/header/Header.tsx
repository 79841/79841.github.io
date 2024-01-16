import React from "react";
import { Navbar } from "./navbar";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <div className="fixed z-50 flex w-full justify-center backdrop-blur-md">
      <div className="flex w-full max-w-[1320px] justify-between px-5 py-2">
        <Logo />
        <Navbar />
      </div>
    </div>
  );
};
