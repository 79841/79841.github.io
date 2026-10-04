"use client";

import { useState } from "react";
import { Check, Copy } from "@/shared/ui/icons";

interface CopyButtonProps {
  code: string;
}

/** 코드 블록 머리줄의 복사 버튼 — 늘 보이고 누르면 잠깐 "복사됨"으로 바뀐다 */
export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 클립보드 권한이 없으면 조용히 실패한다 — 코드는 여전히 드래그로 복사할 수 있다 */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "복사됨" : "코드 복사"}
      className="copy-btn inline-flex size-7 shrink-0 items-center justify-center rounded-full"
    >
      {copied ? <Check /> : <Copy />}
    </button>
  );
}
