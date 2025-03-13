import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";

type TCarouselImageAreaProps = {
  imagesRef: RefObject<HTMLDivElement>;
  images: string[];
  currentImageIndex: number;
};

export const CarouselImageArea = ({
  imagesRef,
  images,
}: TCarouselImageAreaProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(0);

  useEffect(() => {
    if (!frameRef.current) return;
    const width = frameRef.current.getBoundingClientRect().width;
    setFrameWidth(() => {
      console.log(width);
      return width;
    });

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setFrameWidth(width);
      }
    });

    observer.observe(frameRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative flex h-full w-full justify-start overflow-hidden rounded-xl transition-[width] duration-500"
    >
      <div
        ref={imagesRef}
        className="absolute flex h-full gap-4 transition-all duration-500"
      >
        {images.map((image) => (
          <div
            key={image}
            className="flex h-full justify-center overflow-hidden"
            style={{ width: `${frameWidth}px` }}
          >
            {/*
              1) 배경 + blur 레이어
                 - absolute + inset-0로 부모 영역 전부 덮음
                 - z-index: 0으로 가장 뒤에 위치
                 - backgroundImage와 filter: blur 적용
            */}
            <div
              className="relative h-full w-full"
              style={{ position: "relative" }}
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(32px)",
                }}
              />

              {/*
                2) 실제 선명한 이미지 레이어
                   - z-index: 10 등으로 배경 위에 표시
                   - fill + object-contain으로 원본 비율 유지
              */}
              <Image
                src={image}
                alt={image}
                fill
                className="z-10 rounded-xl object-contain shadow-xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
