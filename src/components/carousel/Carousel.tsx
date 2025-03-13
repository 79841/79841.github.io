"use client";
import { CarouselImageArea } from "./CarouselImageArea";
import { CarouselIndicator } from "./CarouselIndicator";
import { useMovingImagesBox } from "./hooks";

type TCarouselProps = {
  // isImagesLoaded: boolean;
  // imagesSizes: Record<string, { width: number; height: number }>;
  images: string[];
};
export const Carousel = ({
  // isImagesLoaded,
  // imagesSizes,
  images,
}: TCarouselProps) => {
  const [ref, currentImageIndex, handleInit] = useMovingImagesBox(3000);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <CarouselImageArea
        // isImagesLoaded={isImagesLoaded}
        // imagesSizes={imagesSizes}
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
