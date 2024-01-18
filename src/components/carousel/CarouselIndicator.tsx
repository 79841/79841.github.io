import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";
import { PiArrowClockwiseBold } from "react-icons/pi";

type TCarouselIndicatorProps = {
  images: string[];
  currentImageIndex: number;
  handleInit: MouseEventHandler;
};
export const CarouselIndicator = ({
  images,
  currentImageIndex,
  handleInit,
}: TCarouselIndicatorProps) => {
  return (
    <div className="flex h-fit items-center gap-4">
      <div className="flex h-10 items-center gap-4">
        {images.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 w-1 rounded-full bg-zinc-400",
              currentImageIndex === i && "bg-zinc-600",
            )}
          ></div>
        ))}
      </div>
      <button onClick={handleInit}>
        <PiArrowClockwiseBold />
      </button>
    </div>
  );
};
