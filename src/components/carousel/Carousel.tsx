"use client";
import { useMovingImagesBox } from "./hooks";
import { CarouselImageArea } from "./CarouselImageArea";
import { CarouselIndicator } from "./CarouselIndicator";

type TCarouselProps = {
  isImagesLoaded: boolean;
  imagesSizes: { width: number; height: number }[];
  images: string[];
};
export const Carousel = ({
  isImagesLoaded,
  imagesSizes,
  images,
}: TCarouselProps) => {
  const [ref, currentImageIndex, handleInit] = useMovingImagesBox(2000);

  return (
    <div className="flex h-full w-fit flex-col items-center">
      <CarouselImageArea
        isImagesLoaded={isImagesLoaded}
        imagesSizes={imagesSizes}
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
