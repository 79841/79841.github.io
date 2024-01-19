import React, { RefObject, useEffect, useRef, useState } from "react";
import { HorizontalRelativeImage } from "./relative-image";

type TCarouselImageAreaProps = {
  isImagesLoaded: boolean;
  imagesSizes: { width: number; height: number }[];
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
  // const [isImagesLoaded, imagesSizes] = useImagesSizes(images);
  const [frameHeight, setFrameHeight] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (frameRef.current) {
      setFrameHeight(frameRef.current.getBoundingClientRect().height);
    }
  }, [isImagesLoaded]);

  if (!isImagesLoaded) return <div>loading...</div>;

  const currentImageSize = imagesSizes[currentImageIndex];
  const style = {
    width: `calc(${frameHeight}px * ${currentImageSize.width / currentImageSize.height})`,
  };

  return (
    <div
      ref={frameRef}
      style={style}
      className="relative flex flex-[1] overflow-hidden rounded-xl shadow-lg"
    >
      <div
        ref={imagesRef}
        className="absolute flex h-full transition-all duration-1000"
      >
        {images.map((image, i) => (
          <div key={image} className="mr-4 h-full">
            <HorizontalRelativeImage
              alt={image}
              src={image}
              height={frameHeight}
              imageSize={imagesSizes[i]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
