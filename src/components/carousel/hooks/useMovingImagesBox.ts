"use client";
import { useEffect, useRef, useState } from "react";

export const useMovingImagesBox = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!ref.current) return;
      if (currentImageIndex >= ref.current.children.length - 1) return;
      setCurrentPosition((prev) => {
        if (!ref.current) return prev;
        return (
          prev +
          ref.current.children[currentImageIndex].getBoundingClientRect().width
        );
      });
      setCurrentImageIndex((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = `translateX(calc(-${currentPosition}px - ${currentImageIndex} * 1rem))`;
  }, [currentPosition, currentImageIndex]);

  return [ref, currentImageIndex] as const;
};
