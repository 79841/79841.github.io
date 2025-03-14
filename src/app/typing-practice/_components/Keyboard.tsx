"use client";

import { IoBackspace } from "react-icons/io5";

interface KeyboardProps {
  pressedKey: string | null;
}

const Keyboard: React.FC<KeyboardProps> = ({ pressedKey }) => {
  // 영어, 스페이스바, 백스페이스만 포함된 키보드 레이아웃
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "Backspace"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    [" "], // 스페이스바만 있는 행
  ];

  // 특수 키 너비 설정
  const keyWidths: { [key: string]: string } = {
    Backspace: "w-20",
    " ": "w-64", // 스페이스바는 넓게
  };

  return (
    <div className="mb-5 rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex w-full flex-col items-center">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-2 flex w-full justify-center">
            {rowIndex === 1 && <div className="w-3"></div>}
            {rowIndex === 2 && <div className="w-6"></div>}

            {row.map((key) => {
              const displayKey = key === " " ? "Space" : key;
              const keyWidth = keyWidths[key] || "w-12";

              return (
                <div
                  key={key}
                  className={`m-1 flex h-12 items-center justify-center rounded-lg text-base font-light transition-colors ${keyWidth} ${
                    pressedKey === key.toLowerCase()
                      ? "bg-blue-500 text-white shadow-inner"
                      : "bg-gray-100 text-gray-700 shadow"
                  }`}
                >
                  {key === "Backspace" ? (
                    <div className="flex items-center justify-center">
                      <IoBackspace />
                    </div>
                  ) : (
                    displayKey
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
