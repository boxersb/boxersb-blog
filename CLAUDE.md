# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory

생각은 영어로 하되, 대답은 항상 한국어로만 하세요.
코드를 수정한 다음 항상 테스트 하세요.


## Project Overview

A personal blog built with **TanStack Start** (SSG mode), **MDX** for markdown-based content with React components, and **Tailwind CSS v4** for styling. Package manager is **pnpm**.

## Commands

```bash
pnpm dev              # Start dev server (Vite)
pnpm build            # Production build (static prerender)
pnpm start            # Serve production build (Vite preview)
pnpm typecheck        # Run tsc
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm prettier         # Prettier check
pnpm prettier:fix     # Prettier auto-fix
```

## Architecture

### Routing

Routes use TanStack Router file-based routing under `src/routes/`:
- `__root.tsx` — Root layout with Header and Footer
- `index.tsx` — Home page with post feed
- `posts/$slug.tsx` — Dynamic post detail
- `about.tsx`, `projects.tsx`, `resume.tsx` — Static pages

### Content (MDX)

- MDX posts live in `posts/` directory
- Frontmatter parsed with `gray-matter`
- Compiled with `@mdx-js/mdx` on server
- Custom components in `src/components/mdx/MdxComponents.tsx`

### Path Aliases

- `~/*` maps to `./src/*`

### Design System

- Naver Pay-inspired color palette (CSS custom properties)
- Light/dark theme via `data-theme` attribute
- Pretendard (sans) + JetBrains Mono (code)

## Code Style

- **Indent**: 4 spaces (enforced by `.editorconfig`)
- **Line length**: 120 characters max
- **ESLint**: `@naverpay/eslint-config` (node + typescript + strict + packageJson configs)
- **Prettier**: `@naverpay/prettier-config`
- **Line endings**: LF
