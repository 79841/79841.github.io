"use client";
import { Carousel } from "@/components/carousel";

type TProjectImagesProps = {
  images: string[];
  inView: boolean;
};
export const ProjectImages = ({ images, inView }: TProjectImagesProps) => {
  return (
    <div className="flex flex-[1] justify-center">
      {images.length > 0 ? (
        <div className="h-[17.5rem] sm:h-[30rem]">
          {inView && <Carousel images={images} />}
        </div>
      ) : (
        <div className="flex h-full w-52 items-center justify-center rounded-xl border text-base text-zinc-500">
          No Images
        </div>
      )}
    </div>
  );
};