import React from "react";
import { NormalNavbar } from "./NormalNavbar";
import { DropDownNav } from "./DropDownNav";

export const Navbar = () => {
  return (
    <>
      <div className="hidden sm:block">
        <NormalNavbar />
      </div>
      <div className="block sm:hidden">
        <DropDownNav />
      </div>
    </>
  );
};
