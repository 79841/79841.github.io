"use client";
import Image from "next/image";
import React, { useRef } from "react";

type THorizontalRelativeImageProps = {
  height: number;
  imageSize: { width: number; height: number };
  src: string;
  alt: string;
};

export const HorizontalRelativeImage = ({
  height,
  imageSize,
  src,
  alt,
}: THorizontalRelativeImageProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const style = {
    height: `${height}px`,
    width: `calc(${height}px * ${imageSize.width / imageSize.height})`,
  };

  return (
    <div
      ref={ref}
      className="relative h-full w-full flex-shrink-0 overflow-hidden rounded-xl shadow-lg"
      style={style}
    >
      <Image src={src} alt={alt} fill sizes="400px" />
    </div>
  );
};
