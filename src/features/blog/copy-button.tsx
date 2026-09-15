"use client";

import { useState } from "react";
import { Check, Copy } from "@/shared/ui/icons";

interface CopyButtonProps {
  code: string;
}

/** 코드 블록 오른쪽 위 복사 버튼 */
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
      className="absolute top-3 right-3 inline-flex h-7 items-center gap-1.5 rounded-full border border-hairline bg-paper/80 px-2.5 font-mono text-[11px] text-muted opacity-70 transition-opacity hover:opacity-100"
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "복사됨" : "복사"}
    </button>
  );
}
