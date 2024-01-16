"use client";
import { navigationLinks } from "@/data";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
export const DropDownNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };
  return (
    <div className="flex flex-col items-end gap-2">
      <button onClick={handleClick} onBlur={handleBlur}>
        <IoIosMenu size={32} />
      </button>
      {isVisible && (
        <div className="flex w-full flex-col gap-2 text-right backdrop-blur-md">
          {Object.values(navigationLinks).map((linkInfo) => (
            <Link key={linkInfo.name} href={linkInfo.path}>
              {linkInfo.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
