"use client";
import Image from "next/image";
import React from "react";

type THorizontalRelativeImageProps = {
  height: string;
  imageSize: Record<string, number>;
  src: string;
  alt: string;
};

export const HorizontalRelativeImage = ({
  height,
  imageSize,
  src,
  alt,
}: THorizontalRelativeImageProps) => {
  const style = {
    height,
    width: `calc(${height} * ${imageSize.width / imageSize.height})`,
  };
  return (
    <div
      className="relative h-full w-full flex-shrink-0 overflow-hidden rounded-xl shadow-lg"
      style={style}
    >
      <Image src={src} alt={alt} fill />
    </div>
  );
};
