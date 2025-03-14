"use client";

import { LoadingState } from "./_components/LoadingAndErrorStates";
import PageHeader from "./_components/PageHeader";
import PageHeaderSkeleton from "./_components/PageHeaderSkeleton";
import TypingTest from "./_components/TypingTest";
import useSentenceFetcher from "./_hooks/useSentenceFetcher";
import useSkeletonState from "./_hooks/useSkeletonState";

export default function TypingPracticePage() {
  // 문장 데이터와 로딩 상태를 가져옴
  const { sentences, groupedSentences, isLoading, error } =
    useSentenceFetcher();

  // 스켈레톤 UI 상태 관리
  const { showSkeleton, finalSentences } = useSkeletonState({
    sentences: groupedSentences,
    isLoading,
  });

  return (
    <div className="mt-24 px-4 py-12">
      {showSkeleton ? (
        <>
          <PageHeaderSkeleton />
          <LoadingState message="문장 불러오는 중..." />
        </>
      ) : (
        <>
          <PageHeader />
          <TypingTest sentences={finalSentences} error={error} />
        </>
      )}
    </div>
  );
}
