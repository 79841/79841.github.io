"use client";

interface ResultsProps {
  wpm: number;
  accuracy: number;
  onNextSentence: () => void;
  onRestartSentence: () => void;
}

const Results: React.FC<ResultsProps> = ({
  wpm,
  accuracy,
  onNextSentence,
  onRestartSentence,
}) => {
  // WPM에 따른 피드백 메시지
  const getFeedbackMessage = () => {
    if (wpm < 20) return "Slow practice is also a good method!";
    if (wpm < 40) return "Consistent practice will improve your speed!";
    if (wpm < 60) return "You've reached average speed. Great job!";
    if (wpm < 80) return "Excellent! Your typing speed is fast.";
    return "Expert level typing speed! Amazing!";
  };

  // 정확도에 따른 피드백 메시지
  const getAccuracyFeedback = () => {
    if (accuracy < 70) return "Focus on improving your accuracy.";
    if (accuracy < 85) return "Pretty good accuracy. Try to focus a bit more.";
    if (accuracy < 95) return "Excellent accuracy!";
    return "Near perfect accuracy!";
  };

  // 정확도에 따른 색상
  const getAccuracyColor = () => {
    if (accuracy < 60) return "text-red-500";
    if (accuracy < 75) return "text-orange-500";
    if (accuracy < 85) return "text-yellow-500";
    if (accuracy < 95) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white/90 p-8 shadow-lg backdrop-blur-sm">
      {/* 헤더 부분 */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-medium tracking-tight text-gray-900">
          Typing Results
        </h2>
        <p className="mt-2 text-sm font-light text-gray-500">
          {getFeedbackMessage()}
        </p>
        <p className="mt-1 text-sm font-light text-gray-500">
          {getAccuracyFeedback()}
        </p>
      </div>

      {/* 결과 표시 섹션 */}
      <div className="mb-10 flex justify-center space-x-10">
        {/* WPM 표시 */}
        <div className="text-left">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
            Speed
          </p>
          <div className="mt-2 flex items-baseline">
            <span className="text-5xl font-light tracking-tight text-gray-900">
              {wpm}
            </span>
            <span className="ml-1 text-xl font-light text-gray-500">WPM</span>
          </div>
        </div>

        {/* 정확도 표시 */}
        <div className="text-left">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
            Accuracy
          </p>
          <div className="mt-2 flex items-baseline">
            <span
              className={`text-5xl font-light tracking-tight ${getAccuracyColor()}`}
            >
              {accuracy}
            </span>
            <span className="ml-1 text-xl font-light text-gray-500">%</span>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestartSentence}
          className="flex items-center justify-center rounded-full bg-gray-200/80 px-6 py-3 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-300/80"
          aria-label="Try Again"
        >
          Try Again
        </button>
        <button
          onClick={onNextSentence}
          className="flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-600"
          aria-label="Next Paragraph"
        >
          Next Paragraph
        </button>
      </div>
    </div>
  );
};

export default Results;
