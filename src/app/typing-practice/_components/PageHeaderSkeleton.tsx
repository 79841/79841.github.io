"use client";

export default function PageHeaderSkeleton() {
  // 단순화된 스타일
  const shimmerClass = "bg-gray-200 animate-pulse";

  return (
    <div className="mb-8 text-center">
      <div className={`mx-auto mb-2 h-8 w-48 rounded-md ${shimmerClass}`}></div>
      <div
        className={`mx-auto h-4 w-64 max-w-md rounded-md ${shimmerClass}`}
      ></div>
    </div>
  );
}
