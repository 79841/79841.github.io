import React, { RefObject, useEffect, useRef, useState } from "react";
import { HorizontalRelativeImage } from "./relative-image";

type TCarouselImageAreaProps = {
  isImagesLoaded: boolean;
  imagesSizes: Record<string, { width: number; height: number }>;
  imagesRef: RefObject<HTMLDivElement>;
  images: string[];
  currentImageIndex: number;
};

export const CarouselImageArea = ({
  isImagesLoaded,
  imagesSizes,
  imagesRef,
  images,
  currentImageIndex,
}: TCarouselImageAreaProps) => {
  const [frameHeight, setFrameHeight] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frameRef.current) {
      setFrameHeight(frameRef.current.getBoundingClientRect().height);
    }
  }, [isImagesLoaded]);

  if (!isImagesLoaded) return <div>loading...</div>;

  const currentImageSize = imagesSizes[images[currentImageIndex]];

  const style = {
    width: `${(frameHeight * currentImageSize.width) / currentImageSize.height}px`,
  };

  return (
    <div
      ref={frameRef}
      style={style}
      className={
        "relative flex flex-[1] overflow-hidden rounded-xl shadow-lg transition-[width] duration-1000"
      }
    >
      <div
        ref={imagesRef}
        className="absolute flex h-full transition-all duration-1000"
      >
        {images.map((image) => (
          <div key={image} className="mr-4 h-full">
            <HorizontalRelativeImage
              alt={image}
              src={image}
              height={frameHeight}
              imageSize={imagesSizes[image]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
