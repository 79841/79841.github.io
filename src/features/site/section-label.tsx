import type { ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  title: string;
  aside?: ReactNode;
}

export function SectionLabel({ index, title, aside }: SectionLabelProps) {
  return (
    <div className="mb-12 flex items-baseline gap-4">
      <span className="font-mono text-[10px] text-faint">{index}</span>
      <h2 className="text-[13px] font-semibold tracking-[0.02em]">{title}</h2>
      {aside ? (
        <span className="ml-auto text-right font-mono text-[10px] tracking-[0.1em] text-ghost">
          {aside}
        </span>
      ) : null}
    </div>
  );
}
