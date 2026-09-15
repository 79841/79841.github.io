/**
 * 글 썸네일 그라데이션 — 사진이 없는 글의 바탕.
 *
 * 이름만 정하고 색은 CSS(`.art[data-art]`)가 맡는다.
 * 라이트와 다크에서 같은 자리의 빛이 다른 색으로 그려져야 하기 때문이다.
 * 배정은 blog.ts가 목록 순서대로 돌려가며 한다 — 해시로 뽑으면
 * 실제 슬러그 몇 개가 한 장에 몰려 목록이 단조로워진다.
 */

export const ARTS = ["mist", "dune", "tide"] as const;

export type ArtName = (typeof ARTS)[number];
