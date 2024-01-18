"use client";
import { useMovingImagesBox } from "./hooks";
import { CarouselImageArea } from "./CarouselImageArea";
import { CarouselIndicator } from "./CarouselIndicator";

type TCarouselProps = {
  images: string[];
};
export const Carousel = ({ images }: TCarouselProps) => {
  const [ref, currentImageIndex, handleInit] = useMovingImagesBox(2000);

  return (
    <div className="flex h-full w-fit flex-col items-center">
      <CarouselImageArea
        images={images}
        imagesRef={ref}
        currentImageIndex={currentImageIndex}
      />
      <CarouselIndicator
        images={images}
        handleInit={handleInit}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
};
