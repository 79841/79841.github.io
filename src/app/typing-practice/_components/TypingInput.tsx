"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface TypingInputHandle {
  focus: () => void;
}

interface TypingInputProps {
  isCompleted: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyUp: () => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}

const TypingInput = forwardRef<TypingInputHandle, TypingInputProps>(
  ({ isCompleted, onKeyDown, onKeyUp, isFocused, setIsFocused }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // 외부에서 사용 가능한 메서드
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <>
        <input
          ref={inputRef}
          type="text"
          className="absolute h-0 w-0 opacity-0"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          aria-hidden="true"
          disabled={isCompleted}
        />

        {/* 고정된 높이를 가진 컨테이너에 메시지 배치 - 높이 줄임 */}
        <div className="mt-2 h-6">
          {!isFocused && !isCompleted && (
            <div className="flex items-center text-gray-500">
              <svg
                className="mr-2 h-3 w-3"
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
              <p className="text-xs">Click to start typing</p>
            </div>
          )}
        </div>
      </>
    );
  },
);

TypingInput.displayName = "TypingInput";

export default TypingInput;
