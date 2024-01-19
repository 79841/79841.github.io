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
          프론트엔드 아키텍쳐를 설계하고 웹 페이지 성능을 최적화하는데
          집중합니다.
        </span>
      </div>
    </div>
  );
};
