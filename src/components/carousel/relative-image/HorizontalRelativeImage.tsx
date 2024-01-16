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
    <div className="relative flex-shrink-0 border w-full h-full" style={style}>
      <Image src={src} alt={alt} fill />
    </div>
  );
};
