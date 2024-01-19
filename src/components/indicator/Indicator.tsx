"use client";
import { navigationLinks } from "@/data";
import { TNavigation } from "@/types/Navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

type TIndicatorProps = {
  nextSection: TNavigation;
};
export const Indicator = ({ nextSection }: TIndicatorProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsContentVisible(true), 1500);
  }, []);

  return (
    <div className="sticky flex h-16 w-40 items-center justify-center">
      <div className="flex animate-indicator-show-up items-center justify-center overflow-hidden rounded-full bg-zinc-100 bg-opacity-50 p-2 backdrop-blur-md">
        <div className="flex flex-[1] items-center justify-center">
          {isContentVisible && nextSection.name}
        </div>
        <Link href={nextSection.path}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
            {isContentVisible &&
              (nextSection.name === navigationLinks.home.name ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowForward size={20} />
              ))}
          </div>
        </Link>
      </div>
    </div>
  );
};
