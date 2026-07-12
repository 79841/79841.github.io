# 명인지 — Front-End Developer Portfolio

"복잡한 문제를 단순한 구조로. 성능은 숫자로, 화면은 손끝으로."

**Live**: https://79841.github.io

## 디자인: 정제된 라이트 모노크롬 + 듀오톤 시그니처

- 종이/잉크 모노크롬, 액센트 컬러 0개 — 다크 모드 지원(시스템 선호 + 수동 토글)
- **듀오톤 시그니처**: 모든 스크린샷이 잉크 톤으로 정제되어 있고, 호버한 이미지만 원색 복원
  (터치 기기는 원색 기본, `prefers-reduced-motion` 대응)

## 라우트

내비게이션 두 층으로 나뉜다. **헤더**(Home · Work · Blog · About)는 "어느 페이지인가"를,
**메인 우측 사이드 목차**는 "페이지 안 어디인가"를 담당한다.

| 라우트 | 내용 |
|---|---|
| `/` | 랜딩 — Hero → Selected Work → **Recent Writing(3)** → Experience → About → Contact |
| `/work` | 작업 전체 목록 |
| `/work/[slug]` | 작업 상세 — 문제 → 설계 → 결과 + 갤러리 + 다음 작업 |
| `/blog` | 글 목록 + 태그 줄 |
| `/blog/[slug]` | 글 본문 — 목차(현재 절 표시) · 읽는 시간 · 다음 글 |
| `/blog/tag/[tag]` | 태그별 글 목록 |
| `/about` | 소개 + 스택 + 경력 타임라인 전체 |

헤더·푸터·컨테이너는 `app/layout.tsx`가 모든 페이지에 공통으로 씌운다.
활성 라우트 표시는 `usePathname()`으로 하되, `trailingSlash: true`라 **끝 슬래시를 정규화한 뒤**
비교한다(`nav.tsx`의 `isActive`). 상세 페이지에서도 상위 항목이 켜진다 — `/blog/tag/react/` → Blog.

SEO: OG 이미지 · sitemap(모든 라우트) · robots · JSON-LD(Person) · 404

## 콘텐츠 수정 방법

콘텐츠 원천은 두 곳이다.

### 1. 이력·작업 — `src/shared/lib/profile.ts` 한 파일

| 수정할 것 | 위치 |
|---|---|
| 이름·이메일·히어로 문구 | `profile` |
| 작업 카드 + 상세 페이지 | `works` — `detail.sections`(문제/설계/결과), `detail.gallery` |
| 텍스트 행 작업 | `moreWorks` |
| 소개·스택·경력 | `aboutParagraphs` · `stackGroups` · `experiences` |

이미지는 `public/work/`에 넣고(sharp로 webp 최적화 권장) 경로·크기를 기재한다.

### 2. 블로그 글 — `src/content/blog/*.md` 파일 하나 = 글 하나

파일을 새로 만들기만 하면 목록·태그·사이트맵·목차·읽는 시간이 **자동으로 따라온다**.
등록 절차는 없다.

```markdown
---
title: "제목"
date: "2026-07-13"      # YYYY-MM-DD (필수)
summary: "목록 카드와 OG 설명에 쓰이는 한 줄 요약"
tags: ["React", "Performance"]
---

## 첫 절

본문. 표·취소선(GFM), 코드 블록, 이미지 모두 쓸 수 있다.
본문 이미지도 듀오톤이 적용된다 — 호버할 때만 원색.
```

- `title`·`summary`가 없거나 `date` 형식이 틀리면 **빌드가 실패한다** (조용히 넘어가지 않는다).
- 태그는 ASCII 권장 — URL 슬러그로 쓰인다(`Next.js` → `/blog/tag/nextjs`). GitHub Pages의
  non-ASCII 경로 이슈를 피하기 위함.
- 목차는 `##`·`###`에서 자동 생성된다.

## 실행 & 배포

패키지 매니저는 **pnpm**이다 (`packageManager` 필드로 고정).

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # vitest
pnpm lint       # eslint
pnpm build      # 정적 export → out/
```

`main` 푸시 시 GitHub Actions가 테스트 → 빌드 → GitHub Pages 배포를 자동 수행한다.
(`.github/workflows/deploy.yml`)

## 블로그 렌더링 파이프라인

`output: "export"`라 런타임 서버가 없다 — 모든 것이 빌드 타임에 끝난다.

- `.md` → **`@next/mdx`** 가 React 컴포넌트로 컴파일. `@next/mdx`는 기본값이 `.mdx`뿐이라
  `next.config.ts`에서 `extension: /\.(md|mdx)$/`로 넓혔다.
- **Next 16은 Turbopack이 기본**이라 remark/rehype 플러그인은 **문자열로만** 넘길 수 있다
  (Rust에 JS 함수를 전달할 수 없다). 직렬화 불가능한 옵션을 쓰는 플러그인은 사용 불가.
  - `remark-frontmatter` — YAML 블록이 본문으로 새지 않게 걷어낸다
  - `remark-gfm` — 표·취소선 (CommonMark에는 없다)
  - `rehype-slug` — 제목에 `id`를 달아 목차 앵커가 걸리게 한다
- `mdx-components.tsx`의 **`useMDXComponents()`는 인자를 받지 않는다** (Next 16 기준. 구버전
  시그니처와 다르다).
- 메타데이터·목차·읽는 시간은 `src/shared/lib/blog.ts`가 원문을 직접 파싱해 만든다.
  목차 `id`는 `rehype-slug`가 붙이는 값과 **정확히 일치해야** 앵커가 걸리므로, 양쪽 모두
  github-slugger를 쓰고 중복 제목 카운터를 맞추려 **모든 레벨의 제목**을 순서대로 흘려보낸다.

## 구조

```
src/
├── app/
│   ├── layout.tsx        # 공용 셸 — 컨테이너 + Nav + Footer
│   ├── page.tsx          # 메인 (섹션 + 사이드 목차)
│   ├── work/             # /work, /work/[slug]
│   ├── blog/             # /blog, /blog/[slug], /blog/tag/[tag]
│   ├── about/            # /about
│   └── sitemap.ts · robots.ts
├── content/blog/*.md     # ★ 블로그 글
├── features/
│   ├── site/             # Nav · Hero · Works · Experience · About · Contact · SectionToc · Footer
│   └── blog/             # PostList · TagRow · Toc
├── shared/
│   ├── lib/profile.ts    # ★ 이력·작업 콘텐츠
│   ├── lib/blog.ts       # 글 파싱 (프론트매터 · 목차 · 읽는 시간)
│   └── ui/reveal.tsx
└── mdx-components.tsx    # 마크다운 태그 → 디자인 시스템
public/
├── work/                 # 최적화된 스크린샷 (webp/avif)
└── docs/                 # 이력서 PDF
```

데이터 출처: brain vault `40_Areas/커리어/resume3.md` + 이전 포트폴리오(portfolio-legacy) 자산
