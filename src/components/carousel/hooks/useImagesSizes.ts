"use client";
import { useEffect, useState } from "react";

export const useImagesSizes = (images: string[]) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState<boolean>(false);
  const [imageSizes, setImageSizes] = useState<
    { width: number; height: number }[]
  >([]);

  useEffect(() => {
    const imagePromises = images.map(
      (imageSrc) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.src = imageSrc;
          image.onload = (e) => {
            setImageSizes((prev) => [
              ...prev,
              { width: image.width, height: image.height },
            ]);
            resolve(e);
          };
          image.onerror = reject;
        })
    );

    Promise.all(imagePromises).then((_) => setIsImagesLoaded(true));
  }, [images]);
  return [isImagesLoaded, imageSizes] as const;
};
