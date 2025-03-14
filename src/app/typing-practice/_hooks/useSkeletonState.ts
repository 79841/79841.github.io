"use client";

import { useEffect, useRef, useState } from "react";

interface UseSkeletonStateProps {
  sentences: string[];
  isLoading: boolean;
}

interface UseSkeletonStateResult {
  showSkeleton: boolean;
  finalSentences: string[];
}

export default function useSkeletonState({
  sentences,
  isLoading,
}: UseSkeletonStateProps): UseSkeletonStateResult {
  // 문장 데이터 일관성을 위한 참조 유지
  const sentencesRef = useRef<string[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // 처음 로드된 문장 데이터를 ref에 저장
  useEffect(() => {
    if (
      !isLoading &&
      sentences.length > 0 &&
      sentencesRef.current.length === 0
    ) {
      sentencesRef.current = sentences;
    }
  }, [sentences, isLoading]);

  // 스켈레톤 표시 로직
  useEffect(() => {
    if (!isLoading && sentences.length > 0) {
      // 문장이 모두 로드된 후 스켈레톤을 약간 더 보여줌 (부드러운 전환)
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading, sentences]);

  // 실제 사용할 문장 데이터 (ref에 저장된 값 우선 사용)
  const finalSentences =
    sentencesRef.current.length > 0 ? sentencesRef.current : sentences;

  return { showSkeleton, finalSentences };
}
