"use client";
import { useImagesSizes } from "@/hooks";
import { HorizontalRelativeImage } from "@/components/carousel/relative-image";
import { useMovingImagesBox } from "./hooks";

type TCarouselProps = {
  images: string[];
  height: string;
};
export const Carousel = ({ images, height }: TCarouselProps) => {
  const [isImagesLoaded, imagesSizes] = useImagesSizes(images);
  const [ref, currentImageIndex] = useMovingImagesBox();

  if (!isImagesLoaded) return <div>loading...</div>;

  const currentImageSize = imagesSizes[currentImageIndex];
  const style = {
    height,
    width: `calc(${height} * ${
      currentImageSize.width / currentImageSize.height
    })`,
  };

  return (
    <div className="flex w-fit flex-col items-center">
      <div style={style} className="relative flex overflow-hidden">
        <div ref={ref} className="absolute flex transition-all duration-1000">
          {images.map((image, i) => (
            <HorizontalRelativeImage
              key={image}
              alt={image}
              src={image}
              height={height}
              imageSize={imagesSizes[i]}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          {images.map((_, i) => (
            <div key={i}>.</div>
          ))}
        </div>
      </div>
    </div>
  );
};
