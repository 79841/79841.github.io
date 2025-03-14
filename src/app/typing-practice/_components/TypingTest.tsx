"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import { ErrorState } from "./LoadingAndErrorStates";
import Results from "./Results";
import SentenceDisplay from "./SentenceDisplay";
import TypingInput, { TypingInputHandle } from "./TypingInput";
import TypingProgressBar from "./TypingProgressBar";
import WPMDisplay from "./WPMDisplay";

interface TypingTestProps {
  sentences: string[];
  error: string | null;
}

export default function TypingTest({ sentences, error }: TypingTestProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0); // 현재 타이핑된 인덱스 (올바르게 입력한 글자 수)
  const [typedText, setTypedText] = useState(""); // 사용자가 실제 입력한 텍스트
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const typingInputRef = useRef<TypingInputHandle>(null);

  // 현재 문장 (이미 3개의 문장이 하나로 합쳐져 있음)
  const currentSentence = sentences[currentSentenceIndex] || "";

  // WPM 계산 - 오직 올바르게 입력한 글자 수(typedIndex)만 사용
  const calculateWPM = useCallback(() => {
    if (!startTime || typedIndex === 0) return 0;

    const currentTime = Date.now();
    const elapsedTimeInMinutes = (currentTime - startTime) / 60000; // 분 단위로 변환

    // 올바르게 입력한 글자 수(typedIndex)를 기준으로 단어 수 계산 (평균 5글자를 1단어로 간주)
    const wordsTyped = typedIndex / 5;

    return Math.round(wordsTyped / elapsedTimeInMinutes);
  }, [startTime, typedIndex]);

  // 정확도 계산
  const calculateAccuracy = () => {
    if (typedText.length === 0) return 100;
    return Math.round((typedIndex / typedText.length) * 100);
  };

  // 입력이 완료되었는지 확인
  const checkCompletion = useCallback(() => {
    // 모든 문장이 완성되면 완료 처리 (정확도가 100%가 아니어도 가능)
    if (typedText.length === currentSentence.length) {
      const endTime = Date.now();
      setEndTime(endTime);
      setIsCompleted(true);

      // 최종 WPM 계산
      const elapsedTimeInMinutes = (endTime - (startTime || endTime)) / 60000;
      // 올바르게 입력한 문자를 기준으로 단어 수 계산 (평균 5글자를 1단어로 간주)
      const wordsTyped = currentSentence.length / 5;
      const finalWPM = Math.round(wordsTyped / elapsedTimeInMinutes);

      setWpm(finalWPM);
    }
  }, [typedText.length, currentSentence.length, startTime]);

  // 글자 수가 문장 길이에 도달했는지 확인하고 자동 완료
  useEffect(() => {
    if (
      typedText.length === currentSentence.length &&
      !isCompleted &&
      typedText
    ) {
      // 마지막 글자 입력 후 완료 여부 확인
      checkCompletion();
    }
  }, [typedText, currentSentence, isCompleted, checkCompletion]);

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isCompleted) return;

    // 백스페이스 처리
    if (e.key === "Backspace") {
      // 백스페이스 키 하이라이트
      setPressedKey("Backspace");

      // 이전 문자 삭제
      if (typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1));
        // 올바른 입력에 대한 인덱스도 필요시 조정
        if (
          typedText.length > 0 &&
          typedText[typedText.length - 1] ===
            currentSentence[typedText.length - 1]
        ) {
          setTypedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
      }
      return;
    }

    // 일반 키 입력 처리
    if (e.key.length === 1) {
      // 문장 길이를 초과하는 입력은 무시
      if (typedText.length >= currentSentence.length) {
        return;
      }

      if (!startTime) {
        setStartTime(Date.now());
      }

      // 현재 입력 위치의 예상 문자
      const expectedChar = currentSentence[typedText.length];

      // 새 문자 추가
      const newTypedText = typedText + e.key;
      setTypedText(newTypedText);

      // 입력한 문자가 예상 문자와 일치하는지 확인
      if (e.key === expectedChar) {
        // 올바른 입력인 경우에만 typedIndex 증가
        setTypedIndex((prev) => prev + 1);
      }

      // 알파벳과 스페이스바 하이라이트
      if (/^[a-zA-Z ]$/.test(e.key)) {
        setPressedKey(e.key.toLowerCase());
      }

      // WPM 업데이트 (변경없음 - calculateWPM은 이미 올바른 입력만 계산)
      setWpm(calculateWPM());
    }
  };

  const handleKeyUp = () => {
    setPressedKey(null);
  };

  // 다음 문장으로 이동
  const handleNextSentence = () => {
    let nextIndex = currentSentenceIndex + 1;
    if (nextIndex >= sentences.length) {
      // 모든 문장을 완료한 경우 처음으로 돌아갑니다
      nextIndex = 0;
    }

    resetTest(nextIndex);
  };

  // 현재 문장 다시 시작
  const handleRestartSentence = () => {
    resetTest(currentSentenceIndex);
  };

  // 테스트 초기화
  const resetTest = (sentenceIndex: number) => {
    setTypedIndex(0);
    setTypedText("");
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setIsCompleted(false);
    setCurrentSentenceIndex(sentenceIndex);

    // 입력 포커스
    setTimeout(() => {
      if (typingInputRef.current) {
        typingInputRef.current.focus();
      }
    }, 0);
  };

  // 입력 영역 클릭 처리
  const handleContainerClick = () => {
    if (typingInputRef.current) {
      typingInputRef.current.focus();
    }
  };

  // 입력 포커스
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typingInputRef.current) {
        typingInputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // 에러 상태 확인
  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 mt-4">
        <WPMDisplay wpm={wpm} accuracy={calculateAccuracy()} />
      </div>

      {isCompleted ? (
        <Results
          wpm={wpm}
          accuracy={calculateAccuracy()}
          onNextSentence={handleNextSentence}
          onRestartSentence={handleRestartSentence}
        />
      ) : (
        <>
          <div
            ref={containerRef}
            onClick={handleContainerClick}
            className={`relative mb-6 overflow-hidden rounded-lg border-0 bg-white p-6 shadow-lg transition duration-300 ${
              isFocused
                ? "cursor-text ring-2 ring-blue-500 ring-opacity-50"
                : "cursor-pointer"
            }`}
          >
            <p className="mb-2 flex items-center text-sm font-medium text-gray-600">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Paragraph {currentSentenceIndex + 1}/{sentences.length} (contains
              3 sentences)
            </p>
            <div className="custom-scrollbar max-h-60 overflow-y-auto pr-2">
              <p className="mb-4 text-lg font-light leading-relaxed tracking-tight">
                <SentenceDisplay
                  currentSentence={currentSentence}
                  typedText={typedText}
                  isFocused={isFocused}
                />
              </p>
            </div>

            <TypingInput
              ref={typingInputRef}
              isCompleted={isCompleted}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />

            {/* 진행 상태 표시 */}
            <TypingProgressBar
              typedLength={typedText.length}
              totalLength={currentSentence.length}
            />
          </div>

          <Keyboard pressedKey={pressedKey} />
        </>
      )}
    </div>
  );
}
