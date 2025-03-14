"use client";

interface WPMDisplayProps {
  wpm: number;
  accuracy?: number;
}

const WPMDisplay: React.FC<WPMDisplayProps> = ({ wpm, accuracy = 100 }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-20 w-full flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex w-full items-center justify-around">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <svg
                className="mr-1 h-5 w-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Typing Speed
              </div>
            </div>
            <div className="mt-1 flex items-baseline">
              <span className="text-3xl font-light tracking-tight text-gray-900">
                {wpm}
              </span>
              <span className="ml-1 text-lg font-light text-gray-600">WPM</span>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200"></div>

          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <svg
                className="mr-1 h-5 w-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <div className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Accuracy
              </div>
            </div>
            <div className="mt-1 flex items-baseline">
              <span className="text-3xl font-light tracking-tight text-gray-900">
                {accuracy}
              </span>
              <span className="ml-1 text-lg font-light text-gray-600">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WPMDisplay;
