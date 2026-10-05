/**
 * 이력 타임라인 — 경력과 수상을 시간 순서 하나로 세운다.
 * 수상은 따로 묶지 않고 그 무렵의 이력 사이에 끼워 넣는다.
 */
import type { Award, ExperienceEntry } from "@/shared/lib/profile";

export type TimelineItem =
  | { kind: "role"; key: string; when: string; entry: ExperienceEntry }
  | { kind: "award"; key: string; when: string; award: Award };

/** "2024.02 — 현재"나 "2021.12"에서 시작 연월만 뽑는다 — 정렬 키 */
export function startOf(period: string): string {
  const match = /^\d{4}\.\d{2}/.exec(period.trim());
  return match ? match[0] : "";
}

/** 경력과 수상을 시작 시점 기준 최신순으로. 같은 달이면 경력이 먼저 온다 */
export function buildTimeline(
  experiences: ExperienceEntry[],
  awards: Award[],
): TimelineItem[] {
  const items: TimelineItem[] = [
    ...experiences.map((entry) => ({
      kind: "role" as const,
      key: `role-${entry.org}`,
      when: startOf(entry.period),
      entry,
    })),
    ...awards.map((award) => ({
      kind: "award" as const,
      key: `award-${award.date}-${award.name}`,
      when: startOf(award.date),
      award,
    })),
  ];

  return items.sort((a, b) => {
    const byDate = b.when.localeCompare(a.when);
    if (byDate !== 0) return byDate;
    if (a.kind === b.kind) return 0;
    return a.kind === "role" ? -1 : 1;
  });
}
