"use client";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

type TScrollRisingBoxProps = PropsWithChildren;
export const ScrollRisingBox = ({ children }: TScrollRisingBoxProps) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={cn("w-full opacity-0", inView && "animate-rising")}
    >
      {children}
    </div>
  );
};
