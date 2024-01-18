"use client";
import { useEffect, useRef, useState } from "react";

export const useMovingImagesBox = (duration: number) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleInit = () => {
    setCurrentImageIndex(0);
    setCurrentPosition(0);
  };

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
    }, duration);
    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex, duration]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = `translateX(calc(-${currentPosition}px - ${currentImageIndex} * 1rem))`;
  }, [currentPosition, currentImageIndex]);

  return [ref, currentImageIndex, handleInit] as const;
};
