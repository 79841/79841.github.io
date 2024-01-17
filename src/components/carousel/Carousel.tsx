"use client";
import { HorizontalRelativeImage } from "@/components/carousel/relative-image";
import { useMovingImagesBox } from "./hooks";
import { useImagesSizes } from "./hooks/useImagesSizes";

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
      <div
        style={style}
        className="relative flex overflow-hidden rounded-xl shadow-lg"
      >
        <div ref={ref} className="absolute flex transition-all duration-1000">
          {images.map((image, i) => (
            <div key={image} className="mr-4">
              <HorizontalRelativeImage
                alt={image}
                src={image}
                height={height}
                imageSize={imagesSizes[i]}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-10 items-center gap-4">
          {images.map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-zinc-400"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
