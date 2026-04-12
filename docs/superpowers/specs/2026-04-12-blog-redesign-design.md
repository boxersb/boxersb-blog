# boxersb Blog Redesign — Design Spec

## Overview

Frontend 개발자 개인 블로그. 개발 글, 기술 에세이, 일상 기록을 위한 공간. Linear 블로그 스타일의 Swiss/International 디자인에 네이버페이 브랜드 컬러를 적용한다.

**목적**: 콘텐츠 중심의 깔끔한 읽기 경험 + 커버 이미지 활용한 비주얼 + 부드러운 모션
**대상**: 개발자 커뮤니티, 동료, 채용 담당자
**호스팅**: GitHub Pages (정적 사이트)

---

## Tech Stack

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | TanStack Start + TanStack Router | 학습 목적, SSG 모드로 정적 빌드 |
| 마크다운 | MDX + @mdx-js/rollup | React 컴포넌트 혼용 가능 |
| 메타데이터 | gray-matter | frontmatter 파싱, 단순하고 안정적 |
| 코드 하이라이팅 | Shiki | 빌드타임 처리, 다양한 테마 |
| 스타일링 | Tailwind CSS v4 | 유틸리티 기반, CSS 변수 활용 |
| 빌드 | Vinxi (TanStack Start 내장) | SSG 출력 → GitHub Pages 배포 |
| 패키지 매니저 | pnpm | 기존 프로젝트 유지 |

---

## Site Structure

### Pages

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | Home | 포스트 피드 + 카테고리 탭 |
| `/posts/:slug` | Post Detail | 커버 이미지 + 본문 |
| `/about` | About | 자기소개 |
| `/projects` | Projects | 프로젝트 포트폴리오 |
| `/resume` | Resume | 이력서/CV |

### Navigation

- **Header**: 로고(boxersb) + 메인 내비(Blog, Projects, About, Resume) + 테마 토글 + GitHub 링크
- **카테고리 탭**: Home 페이지 상단에 All / 개발 / 에세이 / 일상 탭
- **모바일**: 햄버거 메뉴 전환

### Content Categories

카테고리는 frontmatter의 `category` 필드로 관리:
- `dev` — 개발 (Frontend, 기술 글)
- `essay` — 에세이 (기술 에세이, 생각)
- `life` — 일상 (일상 기록)

---

## Layout

### Container Widths

- **최대 컨테이너**: 1080px
- **본문 (prose)**: 680px
- **모바일**: 풀 너비, 양쪽 16px 패딩

### Home — Post Feed

포스트 리스트 형태:
- 각 아이템: 날짜 + 카테고리 / 제목 (22px, 600) / 요약 텍스트 / 오른쪽 커버 썸네일 (160x100)
- 모바일: 썸네일 숨김, 풀 너비 텍스트

### Post Detail

- 풀 너비 커버 이미지 (상단)
- 메타 정보: 날짜 · 카테고리 · 읽기 시간
- 본문: 680px 단일 컬럼, 18px/1.8 line-height
- 코드 블록: Shiki 하이라이팅, 라이트/다크 테마별 색상

### Responsive Breakpoints

| Breakpoint | 동작 |
|------------|------|
| < 640px | 모바일: 햄버거 메뉴, 썸네일 숨김, 풀 너비 |
| 640-1024px | 태블릿: 축소된 여백, 단일 컬럼 유지 |
| > 1024px | 데스크탑: 전체 레이아웃 |

---

## Typography

### Font Stack

- **Heading + Body**: Pretendard (한글/영문 산세리프, Inter와 유사)
- **Code**: JetBrains Mono (리거처 지원)

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (포스트 제목) | clamp(32px, 5vw, 42px) | 700 | 1.2 |
| H2 | 28px | 600 | 1.3 |
| H3 | 22px | 600 | 1.4 |
| H4 | 18px | 500 | 1.4 |
| Body | 18px | 400 | 1.8 |
| Caption / Meta | 15px | 400 | 1.5 |
| Code | 15px | 400 | 1.6 |

---

## Color System

네이버페이 디자인 가이드 기반. 그레이스케일은 브릿지 팔레트, 액센트는 네이버페이 그린 계열.

### Light Theme

| 용도 | Color | Hex |
|------|-------|-----|
| 배경 | Gray 100 | #F6F8FA |
| 카드/서피스 | White | #FFFFFF |
| 서피스 alt | Gray 150 | #F3F5F7 |
| 테두리 | Gray 250 | #DCDEE0 |
| 보조 텍스트 | Gray 600 | #929294 |
| 본문 텍스트 | Gray 900 | #1E1E23 |
| 액센트 | Green 500 | #09AA5C |
| 액센트 hover | Green 600 | #0B9552 |
| 액센트 배경 | Green 100 | #EEF9F3 |
| 코드 블록 배경 | Gray 150 | #F3F5F7 |

### Dark Theme

| 용도 | Color | Hex |
|------|-------|-----|
| 배경 | — | #121214 |
| 카드/서피스 | — | #1C1C1F |
| 테두리 | — | #2A2A2E |
| 보조 텍스트 | — | #78787A |
| 본문 텍스트 | — | #E8E8E8 |
| 액센트 | — | #34D399 |
| 액센트 배경 | — | rgba(52,211,153,0.08) |
| 코드 블록 배경 | — | #0A0A0C |

### Theme Toggle

- `prefers-color-scheme` 기본 감지
- 수동 토글로 오버라이드
- localStorage에 선택 저장
- 색상 전환: 250ms ease-out

---

## Motion & Interaction

### Timing Tokens

| Token | Duration | Easing | 용도 |
|-------|----------|--------|------|
| --duration-fast | 150ms | ease-out | 호버, 포커스, 토글 |
| --duration-normal | 250ms | cubic-bezier(0.16, 1, 0.3, 1) | 페이드, 슬라이드 |
| --duration-slow | 400ms | cubic-bezier(0.16, 1, 0.3, 1) | 페이지 진입, 히어로 |

### Interactions

**포스트 리스트 호버:**
- 배경색 전환 (150ms)
- 썸네일 scale(1.02) (250ms)
- transform + opacity만 애니메이션 (compositor-friendly)

**페이지 전환:**
- View Transitions API 활용
- fade-out 150ms → fade-in 250ms + content slide-up 12px

**포스트 목록 진입:**
- 각 아이템 fade-in + slide-up(12px), stagger 50ms
- CSS `@starting-style` + `transition` 사용

**포스트 상세 진입:**
- 커버 이미지: fade-in (400ms)
- 제목: fade-in + slide-up (250ms, 100ms delay)
- 본문: fade-in (250ms, 200ms delay)

**테마 토글:**
- 배경/텍스트: 250ms ease-out
- 아이콘: rotate(180deg) + fade

**내비게이션 활성 탭:**
- 하단 인디케이터 width + transform slide (250ms)

### Accessibility

- `prefers-reduced-motion: reduce` 시 모든 모션 비활성화
- 모션 없이도 정보 전달 가능한 구조

### Anti-patterns

사용하지 않음:
- 스크롤 하이재킹
- width/height/margin 애니메이션
- 무의미한 바운스, 펄스
- 3초 이상 로딩 애니메이션

---

## Content Schema (MDX Frontmatter)

```yaml
---
title: string (required)
date: YYYY-MM-DD (required)
category: 'dev' | 'essay' | 'life' (required)
description: string (required, 요약)
coverImage: string (optional, 이미지 경로)
tags: string[] (optional)
draft: boolean (optional, default false)
---
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| FCP | < 1.5s |
| JS Budget (gzipped) | < 80kb (정적 블로그) |
| CSS Budget | < 15kb |

---

## Out of Scope (v1)

- 댓글 시스템 (giscus 등은 v2에서 고려)
- 검색 기능
- RSS 피드
- i18n (한국어 단일 언어)
- 분석/애널리틱스
