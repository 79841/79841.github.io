"use client";

interface SentenceDisplayProps {
  currentSentence: string;
  typedText: string;
  isFocused: boolean;
}

const SentenceDisplay: React.FC<SentenceDisplayProps> = ({
  currentSentence,
  typedText,
  isFocused,
}) => {
  return (
    <div className="relative whitespace-pre-wrap break-words font-mono">
      {currentSentence.split("").map((expectedChar, index) => {
        const userChar = typedText[index]; // 사용자가 입력한 문자
        const isTyped = index < typedText.length; // 이미 입력된 문자인지
        const isCorrect = expectedChar === userChar; // 정확히 입력했는지
        const isCurrent = index === typedText.length; // 현재 입력해야 할 위치인지

        let charClass = "text-gray-300"; // 기본 스타일 (아직 입력되지 않은 문자)
        let displayChar = expectedChar; // 기본적으로 원래 문자 표시

        if (isTyped) {
          if (isCorrect) {
            // 올바르게 입력한 문자
            charClass = "text-gray-900";
          } else {
            // 오타
            charClass = "text-red-400 line-through";
            displayChar = userChar; // 사용자가 실제 입력한 오타 표시
          }
        } else if (isCurrent && isFocused) {
          // 현재 입력 위치
          charClass = "bg-blue-100 text-blue-600";
        }

        // 공백 문자 시각화
        if (displayChar === " ") {
          displayChar = "\u00A0"; // 공백 문자를 non-breaking space로 변경
          if (isCurrent && isFocused) {
            charClass += " border-b border-blue-400"; // 현재 포커스된 공백에 밑줄 추가
          } else if (isTyped && !isCorrect) {
            charClass += " border-b border-red-400"; // 잘못 입력된 공백에 밑줄 추가
          }
        }

        // 줄바꿈 문자 처리 (새 줄 시작 시 현재 위치 강조 표시가 잘 보이도록)
        if (displayChar === "\n") {
          displayChar = "\u21B5"; // 줄바꿈 기호로 표시
          charClass += " mx-1 text-gray-400";
          if (isCurrent && isFocused) {
            charClass += " bg-blue-100 text-blue-600";
          }
        }

        return (
          <span key={index} className={charClass}>
            {displayChar}
          </span>
        );
      })}

      {/* 문장이 빈 경우 처리 */}
      {currentSentence.length === 0 && (
        <span className="text-gray-400">문장을 불러오는 중...</span>
      )}
    </div>
  );
};

export default SentenceDisplay;
