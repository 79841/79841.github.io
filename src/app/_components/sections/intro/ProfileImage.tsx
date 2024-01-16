import { siteMetadata } from "@/data";
import Image from "next/image";
import React from "react";

export const ProfileImage = () => {
  return (
    <div className="flex h-60 items-center justify-center">
      <div className="animate-show-up flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
        <div className="relative h-60 w-60 overflow-hidden rounded-full border">
          <Image
            src={siteMetadata.profilePrimary}
            alt="profile"
            sizes="300px"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};
