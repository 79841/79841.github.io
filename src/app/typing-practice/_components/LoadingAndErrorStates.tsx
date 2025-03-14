"use client";

import { useEffect, useState } from "react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "문장 로딩 중...",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 단순한 애니메이션 클래스
  const shimmerClass = "bg-gray-200 animate-pulse";

  return (
    <div className="mx-auto max-w-4xl">
      {/* WPM Display Skeleton - 더 단순화 */}
      <div className="mb-8 mt-4">
        <div className="h-16 w-full rounded-lg bg-gray-100"></div>
      </div>

      {/* Typing Area Skeleton - 실제 크기에 맞춤 */}
      <div className="relative mb-6 overflow-hidden rounded-lg border-0 bg-white p-6 shadow-sm">
        {/* 제목 부분 */}
        <div className={`h-4 w-32 rounded ${shimmerClass} mb-4`}></div>

        {/* 문단 부분 - 더 단순화 */}
        <div className="mb-6 space-y-3">
          <div className={`h-3 w-full rounded ${shimmerClass}`}></div>
          <div className={`h-3 w-11/12 rounded ${shimmerClass}`}></div>
          <div className={`h-3 w-9/12 rounded ${shimmerClass}`}></div>
        </div>

        {/* 프로그레스 바 - 단순화 */}
        <div className="mt-3 h-1 w-full rounded-full bg-gray-100"></div>
      </div>

      {/* 키보드 영역 - 대폭 단순화 */}
      <div className="h-20 w-full rounded-lg bg-gray-100"></div>

      {/* 메시지 - 단순화 */}
      <div className="mt-4 text-center">
        <div
          className={`inline-block text-sm font-light text-gray-500 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-70"}`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="text-xl text-red-400">{message}</div>
    </div>
  );
};
