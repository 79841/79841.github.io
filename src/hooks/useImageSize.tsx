"use client";

import { useEffect, useState } from "react";

export const useImageSize = (src: string) => {
  const [imageSize, setImageSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {};
  }, [src]);

  return;
};
