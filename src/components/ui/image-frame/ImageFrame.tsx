"use client";
import { useImageSize } from "@/hooks/useImageSize";
import React from "react";

type TImageFrameProps = {
  src: string;
};
export const ImageFrame = ({ src }: TImageFrameProps) => {
  useImageSize(src);
  return <div>ImageFrame</div>;
};
