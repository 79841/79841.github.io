import React from "react";

export const IntroPhrase = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center text-xl sm:text-3xl">
        자바스크립트를 사랑한 프론트엔드 개발자
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <span>JS를 사랑한 개발자 명인지 입니다.</span>
        <span>
          Next.js를 주로 사용하며 아키텍쳐와 최적화에 관심이 많습니다.
        </span>
      </div>
    </div>
  );
};
