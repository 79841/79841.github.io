"use client";
import { navigationLinks } from "@/data/navigationLinks";
import { TNavigation } from "@/types/Navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";

type TIndicatorProps = {
  nextSection: TNavigation;
};
export const Indicator = ({ nextSection }: TIndicatorProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isContentExist, setIsContentExist] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsContentVisible(true), 1500);
    setTimeout(() => setIsContentExist(true), 1200);
  }, []);

  return (
    <div className="sticky flex h-16 w-fit items-center justify-center">
      <div
        className={`flex w-fit animate-indicator-show-up items-center ${
          isContentExist ? "justify-end" : "justify-center"
        } overflow-hidden rounded-full bg-zinc-200 bg-opacity-50 p-2 backdrop-blur-md`}
      >
        {isContentExist && (
          <div
            className={`mx-5 whitespace-nowrap text-base
              ${isContentVisible ? "opacity-100" : "opacity-0"}
          `}
          >
            Go to <span>{nextSection.name}</span>
          </div>
        )}
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
