# 명인지 — Front-End Developer Portfolio

"복잡한 문제를 단순한 구조로. 성능은 숫자로, 화면은 손끝으로."

**Live**: https://79841.github.io

## 디자인: 정제된 라이트 모노크롬 + 듀오톤 시그니처

- 종이/잉크 모노크롬, 액센트 컬러 0개 — 다크 모드 지원(시스템 선호 + 수동 토글)
- **듀오톤 시그니처**: 모든 스크린샷이 잉크 톤으로 정제되어 있고, 호버한 이미지만 원색 복원
  (터치 기기는 원색 기본, `prefers-reduced-motion` 대응)

## 구성

- **홈**: Hero → Selected Work(카드 4 + 텍스트 행 4) → Experience(8) → About → Contact
- **작업 상세** `/work/[slug]`: 문제 → 설계 → 결과 + 스크린샷 갤러리 + 다음 작업 내비
- SEO: OG 이미지 · sitemap · robots · JSON-LD(Person) · 404

## 콘텐츠 수정 방법

**모든 문구·이미지·링크는 `src/shared/lib/profile.ts` 한 파일에서 관리합니다.**

| 수정할 것 | 위치 |
|---|---|
| 이름·이메일·히어로 문구 | `profile` |
| 작업 카드 + 상세 페이지 | `works` — `detail.sections`(문제/설계/결과), `detail.gallery` |
| 텍스트 행 작업 | `moreWorks` |
| 소개·스택·경력 | `aboutParagraphs` · `stackGroups` · `experiences` |

이미지는 `public/work/`에 넣고(sharp로 webp 최적화 권장) 경로·크기를 기재하면 됩니다.

## 실행 & 배포

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # vitest
npm run build    # 정적 export → out/
```

`main` 푸시 시 GitHub Actions가 테스트 → 빌드 → GitHub Pages 배포를 자동 수행합니다.
(`.github/workflows/deploy.yml`)

## 구조

```
src/
├── app/                  # 레이아웃, 홈, /work/[slug], sitemap, robots, 404
├── features/site/        # Nav(스크롤 스파이·테마 토글) · Hero · Works · Experience · About · Contact
└── shared/
    ├── lib/profile.ts    # ★ 모든 콘텐츠
    └── ui/reveal.tsx
public/
├── work/                 # 최적화된 스크린샷 (webp/avif)
└── docs/                 # 이력서 PDF
```

데이터 출처: brain vault `40_Areas/커리어/resume3.md` + 이전 포트폴리오(portfolio-legacy) 자산
