"use client";
import { Carousel } from "@/components/carousel";

type TProjectImagesProps = {
  images: string[];
  inView: boolean;
};
export const ProjectImages = ({ images, inView }: TProjectImagesProps) => {
  // const [isImagesLoaded, imagesSizes] = useImagesSizes(images);

  return (
    <div className="flex w-full justify-center">
      {images.length > 0 ? (
        <div className="h-[17.5rem] w-full sm:h-[30rem]">
          {inView && (
            <Carousel
              // isImagesLoaded={isImagesLoaded}
              // imagesSizes={imagesSizes}
              images={images}
            />
          )}
        </div>
      ) : (
        <div className="flex h-full w-52 items-center justify-center rounded-xl pb-4 text-base text-zinc-500">
          No Images..
        </div>
      )}
    </div>
  );
};
