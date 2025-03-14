"use client";
import { navigationLinks } from "@/data";
import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
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
        {isVisible ? <IoClose size={32} /> : <IoIosMenu size={32} />}
      </button>
      {isVisible && (
        <div className="flex w-full flex-col gap-2 pr-1 text-right backdrop-blur-md">
          {Object.values(navigationLinks).map((linkInfo) => (
            <Link
              key={linkInfo.name}
              href={linkInfo.path}
              className={
                linkInfo.isSpecial
                  ? "font-bold text-blue-500 transition-colors hover:text-blue-700"
                  : ""
              }
            >
              {linkInfo.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
