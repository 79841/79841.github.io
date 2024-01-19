import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";

type TInputBoxProps = InputHTMLAttributes<HTMLInputElement>;
export const InputBox = ({ className, ...props }: TInputBoxProps) => {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border p-2 px-4 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};
