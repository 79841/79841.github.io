import { useEffect, useState } from "react";

export const useImagesPreload = (images: string[]) => {
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  useEffect(() => {
    const imagePromises = images.map(
      (imageSrc) =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.src = imageSrc;
          image.onload = resolve;
          image.onerror = reject;
        }),
    );
    Promise.all(imagePromises).then((_) => setIsImagesLoaded(true));
  }, [images]);

  return isImagesLoaded;
};
