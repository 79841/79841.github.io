"use client";

import { useEffect, useState } from "react";

interface UseSentenceFetcherResult {
  sentences: string[];
  groupedSentences: string[];
  isLoading: boolean;
  error: string | null;
}

// 원활한 문장 로딩을 위한 기본 문장
const DEFAULT_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "The best way to predict the future is to invent it.",
  "Good programming is not learned from generalities, but by seeing how significant programs can be made clean, easy to read, easy to maintain and modify, human-engineered, efficient, and reliable.",
  "Computer science education cannot make anybody an expert programmer any more than studying brushes and pigment can make somebody an expert painter.",
];

// 문장을 3개씩 묶어 하나의 연습 단위로 만드는 함수
const groupSentencesIntoChunks = (
  sentences: string[],
  chunkSize: number = 3,
): string[] => {
  const result: string[] = [];

  // 문장이 충분하지 않은 경우 기본 문장을 추가하여 최소 9개 문장 확보
  let extendedSentences = [...sentences];
  while (extendedSentences.length < 9) {
    extendedSentences = [...extendedSentences, ...DEFAULT_SENTENCES];
  }

  // 3개씩 묶어 하나의 문단으로 만들기
  for (let i = 0; i < extendedSentences.length; i += chunkSize) {
    if (i + chunkSize <= extendedSentences.length) {
      const chunk = extendedSentences.slice(i, i + chunkSize).join(" ");
      result.push(chunk);
    } else {
      // 남은 문장들 처리
      const chunk = extendedSentences.slice(i).join(" ");
      if (chunk.length > 0) {
        result.push(chunk);
      }
    }
  }

  return result;
};

export default function useSentenceFetcher(): UseSentenceFetcherResult {
  const [sentences, setSentences] = useState<string[]>(DEFAULT_SENTENCES);
  const [groupedSentences, setGroupedSentences] = useState<string[]>(
    groupSentencesIntoChunks(DEFAULT_SENTENCES),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 이미 기본 문장이 로드되어 있으므로 깜빡임 발생 가능성 줄임
    let isMounted = true;

    const fetchSentences = async () => {
      try {
        // DummyJSON에서 블로그 포스트 콘텐츠 가져오기
        const response = await fetch("https://dummyjson.com/posts?limit=30");
        const data = await response.json();

        if (!isMounted) return;

        if (data && data.posts && data.posts.length > 0) {
          // 포스트 본문에서 문단 추출
          const paragraphs: string[] = [];

          data.posts.forEach((post: any) => {
            // 포스트 본문을 줄바꿈이나 마침표를 기준으로 분리하여 문단 추출
            const bodyParagraphs = post.body
              .split(/\.\s+|\n+/) // 마침표+공백 또는 줄바꿈으로 분리
              .filter((para: string) => para.trim().length > 30) // 너무 짧은 문장 제외
              .map((para: string) => para.trim()); // 마침표 추가

            paragraphs.push(...bodyParagraphs);
          });

          // 제목도 연습용 문장으로 추가
          const titles = data.posts.map((post: any) => post.title.trim());

          // 중복 제거 및 셔플
          const allSentences = Array.from(new Set([...paragraphs, ...titles]));
          const shuffledSentences = allSentences.sort(
            () => Math.random() - 0.5,
          );

          // 내용이 있을 때만 setState 호출하여 불필요한 렌더링 방지
          if (shuffledSentences.length > 0) {
            setSentences(shuffledSentences);
            // 3개씩 묶어 그룹화된 문장 설정
            setGroupedSentences(groupSentencesIntoChunks(shuffledSentences));
          }
        } else {
          throw new Error("데이터 형식이 잘못되었습니다");
        }
      } catch (err) {
        if (!isMounted) return;
        setError("문장을 불러오는 중 오류가 발생했습니다");
        console.error(err);
        // 오류 발생해도 기본 문장이 이미 설정되어 있음
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSentences();

    // 컴포넌트 언마운트 시 cleanup
    return () => {
      isMounted = false;
    };
  }, []);

  return { sentences, groupedSentences, isLoading, error };
}
