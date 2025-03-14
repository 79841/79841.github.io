"use client";

interface TypingProgressBarProps {
  typedLength: number;
  totalLength: number;
}

const TypingProgressBar: React.FC<TypingProgressBarProps> = ({
  typedLength,
  totalLength,
}) => {
  const percentage = Math.floor((typedLength / totalLength) * 100);

  return (
    <div className="mt-2 flex items-center justify-between">
      <div className="h-1 w-full rounded-full bg-gray-100">
        <div
          className="h-1 rounded-full bg-blue-500 transition-all duration-200"
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
      <div className="ml-4 text-xs text-gray-500">{percentage}%</div>
    </div>
  );
};

export default TypingProgressBar;
