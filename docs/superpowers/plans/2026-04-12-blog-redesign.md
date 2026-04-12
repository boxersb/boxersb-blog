# boxersb Blog Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the blog from React Router v7 + Contentlayer to TanStack Start + MDX with a Linear-style UI using Naver Pay colors, deployed to GitHub Pages as a static site.

**Architecture:** TanStack Start with prerendering (SSG) for static output. MDX files in `posts/` are processed at build time via `@mdx-js/mdx` + `gray-matter`. TanStack Router provides file-based routing under `src/routes/`. Tailwind CSS v4 with CSS custom properties for the Naver Pay-inspired design system. GitHub Actions builds and deploys to GitHub Pages.

**Tech Stack:** TanStack Start, TanStack Router, MDX, gray-matter, Tailwind CSS v4, Pretendard, JetBrains Mono, Vitest, Playwright

**Design Spec:** `docs/superpowers/specs/2026-04-12-blog-redesign-design.md`

---

## File Structure

```
boxersb-blog/
├── src/
│   ├── routes/
│   │   ├── __root.tsx              # Root layout (html, head, body, Header, Footer)
│   │   ├── index.tsx               # Home — post feed with category tabs
│   │   ├── posts/
│   │   │   └── $slug.tsx           # Post detail page
│   │   ├── about.tsx               # About page
│   │   ├── projects.tsx            # Projects portfolio page
│   │   └── resume.tsx              # Resume/CV page
│   ├── components/
│   │   ├── header/
│   │   │   ├── Header.tsx          # Site header with nav + theme toggle
│   │   │   └── MobileMenu.tsx      # Hamburger menu for mobile
│   │   ├── post/
│   │   │   ├── PostCard.tsx        # Post list item (title, meta, thumbnail)
│   │   │   ├── PostList.tsx        # Post feed with category filtering
│   │   │   └── CategoryTabs.tsx    # All / 개발 / 에세이 / 일상 tabs
│   │   ├── mdx/
│   │   │   └── MdxComponents.tsx   # Custom MDX component mappings
│   │   ├── ui/
│   │   │   └── ThemeToggle.tsx     # Light/dark theme toggle button
│   │   └── Footer.tsx              # Site footer
│   ├── lib/
│   │   ├── posts.ts                # Build-time post loading (gray-matter + fs)
│   │   └── theme.ts                # Theme detection + localStorage persistence
│   ├── styles/
│   │   └── app.css                 # Tailwind import + CSS custom properties (design tokens)
│   └── router.tsx                  # TanStack Router createRouter config
├── posts/
│   ├── post-01.mdx                 # Existing post (renamed from .md to .mdx)
│   └── hello-world.mdx             # Sample post with MDX components
├── public/
│   └── fonts/                      # Self-hosted Pretendard + JetBrains Mono subsets
├── vite.config.ts                  # TanStack Start + Tailwind + MDX plugins
├── tsconfig.json                   # Updated paths (~/*)
├── package.json                    # New dependencies
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
└── .gitignore                      # Updated ignores
```

---

## Phase 1: Project Foundation

### Task 1: Clean up old stack and install TanStack Start

**Files:**
- Delete: `app/` (entire directory), `contentlayer.config.ts`, `react-router.config.ts`
- Modify: `package.json`, `tsconfig.json`, `vite.config.ts`, `.gitignore`
- Create: `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/styles/app.css`

- [ ] **Step 1: Remove old dependencies and files**

```bash
rm -rf app/ contentlayer.config.ts react-router.config.ts .react-router/ .contentlayer/
pnpm remove react-router @react-router/dev @react-router/fs-routes @react-router/node @react-router/serve contentlayer concurrently
```

- [ ] **Step 2: Install TanStack Start and new dependencies**

```bash
pnpm add @tanstack/react-router @tanstack/react-start vinxi
pnpm add -D @tanstack/router-plugin @vitejs/plugin-react
```

- [ ] **Step 3: Update vite.config.ts**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        tailwindcss(),
        tanstackStart({
            prerender: {
                enabled: true,
                crawlLinks: true,
            },
        }),
        viteReact(),
    ],
})
```

- [ ] **Step 4: Update tsconfig.json**

```json
{
    "compilerOptions": {
        "lib": ["DOM", "DOM.Iterable", "ES2022"],
        "types": ["node", "vite/client"],
        "target": "ES2022",
        "module": "ES2022",
        "moduleResolution": "bundler",
        "jsx": "react-jsx",
        "baseUrl": ".",
        "paths": {
            "~/*": ["./src/*"]
        },
        "esModuleInterop": true,
        "verbatimModuleSyntax": true,
        "noEmit": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "strict": true
    },
    "include": ["src/**/*", "posts/**/*"]
}
```

- [ ] **Step 5: Update .gitignore**

Add to existing `.gitignore`:
```
# TanStack
.vinxi/
.output/
.nitro/

# Superpowers
.superpowers/
```

- [ ] **Step 6: Create src/styles/app.css with design tokens**

```css
@import "tailwindcss";

/* === Fonts === */
@font-face {
    font-family: 'Pretendard';
    font-weight: 100 900;
    font-display: swap;
    src: url('/fonts/PretendardVariable.subset.woff2') format('woff2');
}

@font-face {
    font-family: 'JetBrains Mono';
    font-weight: 400 700;
    font-display: swap;
    src: url('/fonts/JetBrainsMono-Variable.woff2') format('woff2');
}

/* === Theme Tokens === */
:root {
    --font-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;

    /* Timing */
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 400ms;
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

    /* Light theme (default) */
    --color-bg: #F6F8FA;
    --color-surface: #FFFFFF;
    --color-surface-alt: #F3F5F7;
    --color-border: #DCDEE0;
    --color-text: #1E1E23;
    --color-text-muted: #929294;
    --color-text-secondary: #767678;
    --color-accent: #09AA5C;
    --color-accent-hover: #0B9552;
    --color-accent-bg: #EEF9F3;
    --color-code-bg: #F3F5F7;
}

[data-theme="dark"] {
    --color-bg: #121214;
    --color-surface: #1C1C1F;
    --color-surface-alt: #2A2A2E;
    --color-border: #2A2A2E;
    --color-text: #E8E8E8;
    --color-text-muted: #78787A;
    --color-text-secondary: #A0A0A2;
    --color-accent: #34D399;
    --color-accent-hover: #6EE7B7;
    --color-accent-bg: rgba(52, 211, 153, 0.08);
    --color-code-bg: #0A0A0C;
}

@theme {
    --font-sans: var(--font-sans);
    --font-mono: var(--font-mono);
}

html {
    font-family: var(--font-sans);
    background-color: var(--color-bg);
    color: var(--color-text);
    transition: background-color var(--duration-normal) ease-out,
                color var(--duration-normal) ease-out;
}

body {
    min-height: 100dvh;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

- [ ] **Step 7: Create src/router.tsx**

```tsx
// src/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
    const router = createTanStackRouter({
        routeTree,
        scrollRestoration: true,
    })

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
```

- [ ] **Step 8: Create src/routes/__root.tsx**

```tsx
// src/routes/__root.tsx
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
    head: () => ({
        meta: [
            { charSet: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { title: 'boxersb blog' },
            { name: 'description', content: 'Frontend 개발, 기술 에세이, 일상 기록' },
        ],
        links: [
            { rel: 'stylesheet', href: appCss },
            {
                rel: 'preload',
                href: '/fonts/PretendardVariable.subset.woff2',
                as: 'font',
                type: 'font/woff2',
                crossOrigin: 'anonymous',
            },
        ],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}
```

- [ ] **Step 9: Create src/routes/index.tsx (minimal)**

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: HomePage,
})

function HomePage() {
    return (
        <main style={{ maxWidth: 1080, margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{ fontSize: 42, fontWeight: 700 }}>boxersb blog</h1>
            <p style={{ color: 'var(--color-text-muted)', marginTop: 8 }}>
                Coming soon — Frontend 개발, 기술 에세이, 일상 기록
            </p>
        </main>
    )
}
```

- [ ] **Step 10: Update package.json scripts**

Add/replace scripts:
```json
{
    "scripts": {
        "dev": "vinxi dev",
        "build": "vinxi build",
        "start": "vinxi start",
        "typecheck": "tsc --noEmit",
        "lint": "eslint '**/*.{js,jsx,ts,tsx}'",
        "lint:fix": "eslint '**/*.{js,jsx,ts,tsx}' --fix",
        "prettier": "prettier --check '**/*.{ts,tsx,js,mjs,cjs,jsx,json}'",
        "prettier:fix": "prettier --write '**/*.{ts,tsx,js,mjs,cjs,jsx,json}'"
    }
}
```

- [ ] **Step 11: Run dev server and verify**

```bash
pnpm dev
```

Expected: Dev server starts on port 3000, navigating to `http://localhost:3000` shows "boxersb blog" heading.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: migrate from React Router v7 to TanStack Start

Remove react-router, contentlayer, and old app/ directory.
Set up TanStack Start with prerendering, Tailwind CSS v4,
and Naver Pay design tokens."
```

---

## Phase 2: Design System & Shared Components

### Task 2: Theme system

**Files:**
- Create: `src/lib/theme.ts`, `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Create src/lib/theme.ts**

```ts
// src/lib/theme.ts
type Theme = 'light' | 'dark'

const STORAGE_KEY = 'boxersb-theme'

export function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'light'

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
}

export function toggleTheme(): Theme {
    const current = document.documentElement.getAttribute('data-theme') as Theme
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    return next
}
```

- [ ] **Step 2: Create src/components/ui/ThemeToggle.tsx**

```tsx
// src/components/ui/ThemeToggle.tsx
import { useCallback, useEffect, useState } from 'react'
import { getInitialTheme, applyTheme, toggleTheme } from '~/lib/theme'

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const initial = getInitialTheme()
        applyTheme(initial)
        setTheme(initial)
    }, [])

    const handleToggle = useCallback(() => {
        const next = toggleTheme()
        setTheme(next)
    }, [])

    return (
        <button
            onClick={handleToggle}
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="w-9 h-9 flex items-center justify-center rounded-lg
                       transition-colors duration-[--duration-fast]
                       hover:bg-[var(--color-surface-alt)]"
        >
            {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/theme.ts src/components/ui/ThemeToggle.tsx
git commit -m "feat: add theme system with light/dark toggle

Detects prefers-color-scheme, persists to localStorage,
applies via data-theme attribute on html element."
```

---

### Task 3: Header and Footer components

**Files:**
- Create: `src/components/header/Header.tsx`, `src/components/header/MobileMenu.tsx`, `src/components/Footer.tsx`
- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Create src/components/header/Header.tsx**

```tsx
// src/components/header/Header.tsx
import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '~/components/ui/ThemeToggle'
import { MobileMenu } from './MobileMenu'

const NAV_ITEMS = [
    { to: '/' as const, label: 'Blog' },
    { to: '/projects' as const, label: 'Projects' },
    { to: '/about' as const, label: 'About' },
    { to: '/resume' as const, label: 'Resume' },
] as const

export function Header() {
    return (
        <header
            className="sticky top-0 z-50 border-b"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
            }}
        >
            <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-lg font-bold">
                        boxersb
                    </Link>
                    <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="text-sm transition-colors duration-[--duration-fast]"
                                style={{ color: 'var(--color-text-muted)' }}
                                activeProps={{
                                    style: { color: 'var(--color-text)', fontWeight: 500 },
                                }}
                                activeOptions={item.to === '/' ? { exact: true } : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <a
                        href="https://github.com/boxersb"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <MobileMenu items={NAV_ITEMS} />
                </div>
            </div>
        </header>
    )
}
```

- [ ] **Step 2: Create src/components/header/MobileMenu.tsx**

```tsx
// src/components/header/MobileMenu.tsx
import { Link } from '@tanstack/react-router'
import { useState, useCallback } from 'react'

interface NavItem {
    readonly to: string
    readonly label: string
}

interface MobileMenuProps {
    readonly items: readonly NavItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    const handleClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    return (
        <div className="md:hidden">
            <button
                onClick={handleToggle}
                aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isOpen}
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    {isOpen ? (
                        <>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </>
                    ) : (
                        <>
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </>
                    )}
                </svg>
            </button>
            {isOpen && (
                <nav
                    className="absolute left-0 right-0 top-14 border-b p-4"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                    }}
                    aria-label="Mobile navigation"
                >
                    <ul className="flex flex-col gap-2">
                        {items.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    onClick={handleClose}
                                    className="block rounded-lg px-3 py-2 text-base transition-colors duration-[--duration-fast]"
                                    style={{ color: 'var(--color-text-muted)' }}
                                    activeProps={{
                                        style: {
                                            color: 'var(--color-text)',
                                            fontWeight: 500,
                                            backgroundColor: 'var(--color-surface-alt)',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    )
}
```

- [ ] **Step 3: Create src/components/Footer.tsx**

```tsx
// src/components/Footer.tsx
export function Footer() {
    return (
        <footer
            className="border-t py-8"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <div className="mx-auto max-w-[1080px] px-4">
                <p
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    &copy; {new Date().getFullYear()} boxersb. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
```

- [ ] **Step 4: Update __root.tsx to include Header and Footer**

Replace `RootComponent` in `src/routes/__root.tsx`:
```tsx
function RootComponent() {
    return (
        <RootDocument>
            <Header />
            <Outlet />
            <Footer />
        </RootDocument>
    )
}
```

Add imports at top:
```tsx
import { Header } from '~/components/header/Header'
import { Footer } from '~/components/Footer'
```

- [ ] **Step 5: Run dev server and verify Header/Footer render**

```bash
pnpm dev
```

Expected: Header with "boxersb" logo, navigation links, theme toggle, and GitHub icon. Footer at bottom. Mobile menu works on narrow viewport.

- [ ] **Step 6: Commit**

```bash
git add src/components/ src/routes/__root.tsx
git commit -m "feat: add Header with nav, theme toggle, mobile menu, and Footer

Sticky header with desktop nav + hamburger menu.
Naver Pay color tokens applied throughout."
```

---

## Phase 3: Content Pipeline (MDX)

### Task 4: MDX processing with gray-matter

**Files:**
- Create: `src/lib/posts.ts`, `src/components/mdx/MdxComponents.tsx`
- Modify: `vite.config.ts`, `package.json`
- Rename: `posts/post-01.md` to `posts/post-01.mdx`

- [ ] **Step 1: Install MDX and content dependencies**

```bash
pnpm add @mdx-js/mdx @mdx-js/rollup @mdx-js/react gray-matter reading-time
pnpm add -D @types/mdx remark-gfm rehype-slug rehype-autolink-headings
```

- [ ] **Step 2: Update vite.config.ts with MDX plugin**

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        tsconfigPaths: true,
    },
    plugins: [
        tailwindcss(),
        mdx({
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        }),
        tanstackStart({
            prerender: {
                enabled: true,
                crawlLinks: true,
            },
        }),
        viteReact(),
    ],
})
```

- [ ] **Step 3: Create src/lib/posts.ts**

```ts
// src/lib/posts.ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface PostMeta {
    slug: string
    title: string
    date: string
    category: 'dev' | 'essay' | 'life'
    description: string
    coverImage?: string
    tags?: string[]
    draft?: boolean
    readingTime: string
}

const POSTS_DIR = path.join(process.cwd(), 'posts')

export function getAllPosts(): PostMeta[] {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

    const posts = files
        .map((filename): PostMeta | null => {
            const filePath = path.join(POSTS_DIR, filename)
            const raw = fs.readFileSync(filePath, 'utf-8')
            const { data, content } = matter(raw)

            if (data.draft) return null

            const slug = filename.replace(/\.mdx$/, '')
            const stats = readingTime(content)

            return {
                slug,
                title: data.title,
                date: data.date,
                category: data.category,
                description: data.description,
                coverImage: data.coverImage,
                tags: data.tags,
                draft: data.draft,
                readingTime: stats.text,
            }
        })
        .filter((post): post is PostMeta => post !== null)

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostSlugs(): string[] {
    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPostMeta(slug: string): PostMeta | null {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const stats = readingTime(content)

    return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        description: data.description,
        coverImage: data.coverImage,
        tags: data.tags,
        draft: data.draft,
        readingTime: stats.text,
    }
}

export function getPostContent(slug: string): string | null {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { content } = matter(raw)
    return content
}
```

- [ ] **Step 4: Create src/components/mdx/MdxComponents.tsx**

```tsx
// src/components/mdx/MdxComponents.tsx
import type { ComponentPropsWithoutRef } from 'react'

export const mdxComponents = {
    h1: (props: ComponentPropsWithoutRef<'h1'>) => (
        <h1 className="mt-10 mb-4 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]" {...props} />
    ),
    h2: (props: ComponentPropsWithoutRef<'h2'>) => (
        <h2 className="mt-8 mb-3 text-[28px] font-semibold leading-[1.3]" {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<'h3'>) => (
        <h3 className="mt-6 mb-2 text-[22px] font-semibold leading-[1.4]" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<'p'>) => (
        <p className="mb-6 text-lg leading-[1.8]" style={{ color: 'var(--color-text)' }} {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<'a'>) => (
        <a
            className="underline underline-offset-2 transition-colors duration-[--duration-fast]"
            style={{ color: 'var(--color-accent)' }}
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        />
    ),
    ul: (props: ComponentPropsWithoutRef<'ul'>) => (
        <ul className="mb-6 list-disc pl-6 text-lg leading-[1.8]" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<'ol'>) => (
        <ol className="mb-6 list-decimal pl-6 text-lg leading-[1.8]" {...props} />
    ),
    li: (props: ComponentPropsWithoutRef<'li'>) => (
        <li className="mb-1" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
        <blockquote
            className="mb-6 border-l-3 pl-4 italic"
            style={{
                borderColor: 'var(--color-accent)',
                color: 'var(--color-text-secondary)',
            }}
            {...props}
        />
    ),
    code: (props: ComponentPropsWithoutRef<'code'>) => (
        <code
            className="rounded px-1.5 py-0.5 font-mono text-[15px]"
            style={{ backgroundColor: 'var(--color-code-bg)' }}
            {...props}
        />
    ),
    pre: (props: ComponentPropsWithoutRef<'pre'>) => (
        <pre
            className="mb-6 overflow-x-auto rounded-lg p-4 font-mono text-[15px] leading-[1.6]"
            style={{ backgroundColor: 'var(--color-code-bg)' }}
            {...props}
        />
    ),
    img: (props: ComponentPropsWithoutRef<'img'>) => (
        <img className="my-6 rounded-lg" loading="lazy" {...props} />
    ),
    hr: () => (
        <hr className="my-8" style={{ borderColor: 'var(--color-border)' }} />
    ),
}
```

- [ ] **Step 5: Rename and update existing post**

```bash
mv posts/post-01.md posts/post-01.mdx
```

Update `posts/post-01.mdx` frontmatter:
```mdx
---
title: My First Post
date: 2021-12-24
category: dev
description: Ullamco et nostrud magna commodo nostrud
---

Ullamco et nostrud magna commodo nostrud ...
```

- [ ] **Step 6: Create a sample post with MDX features**

Create `posts/hello-world.mdx`:
```mdx
---
title: Hello World — 블로그를 시작합니다
date: 2026-04-12
category: life
description: TanStack Start와 MDX로 만든 새 블로그의 첫 번째 포스트입니다.
---

## 블로그를 새로 만들었습니다

TanStack Start와 MDX를 사용해 블로그를 처음부터 다시 만들었습니다.

### 기술 스택

- **프레임워크**: TanStack Start
- **스타일링**: Tailwind CSS v4
- **콘텐츠**: MDX
- **호스팅**: GitHub Pages

> 새로운 시작은 언제나 설레는 법이다.

앞으로 이 공간에서 개발 이야기, 기술 에세이, 그리고 일상을 기록하겠습니다.
```

- [ ] **Step 7: Commit**

```bash
git add posts/ src/lib/posts.ts src/components/mdx/ vite.config.ts package.json pnpm-lock.yaml
git commit -m "feat: add MDX content pipeline with gray-matter and custom components

Build-time post parsing with frontmatter metadata,
reading time calculation, and styled MDX components."
```

---

## Phase 4: Page Implementation

### Task 5: Home page with post feed and category tabs

**Files:**
- Create: `src/components/post/PostCard.tsx`, `src/components/post/PostList.tsx`, `src/components/post/CategoryTabs.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Create src/components/post/CategoryTabs.tsx**

```tsx
// src/components/post/CategoryTabs.tsx
const CATEGORIES = [
    { value: 'all', label: 'All' },
    { value: 'dev', label: '개발' },
    { value: 'essay', label: '에세이' },
    { value: 'life', label: '일상' },
] as const

interface CategoryTabsProps {
    readonly selected: string
    readonly onSelect: (category: string) => void
}

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
    return (
        <div
            className="flex gap-4 border-b"
            style={{ borderColor: 'var(--color-border)' }}
            role="tablist"
            aria-label="카테고리 필터"
        >
            {CATEGORIES.map((cat) => {
                const isActive = selected === cat.value
                return (
                    <button
                        key={cat.value}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelect(cat.value)}
                        className="relative pb-3 text-[15px] transition-colors duration-[--duration-fast]"
                        style={{
                            color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                            fontWeight: isActive ? 500 : 400,
                        }}
                    >
                        {cat.label}
                        {isActive && (
                            <span
                                className="absolute bottom-0 left-0 right-0 h-0.5"
                                style={{ backgroundColor: 'var(--color-text)' }}
                            />
                        )}
                    </button>
                )
            })}
        </div>
    )
}
```

- [ ] **Step 2: Create src/components/post/PostCard.tsx**

```tsx
// src/components/post/PostCard.tsx
import { Link } from '@tanstack/react-router'
import type { PostMeta } from '~/lib/posts'

const CATEGORY_LABELS: Record<string, string> = {
    dev: '개발',
    essay: '에세이',
    life: '일상',
}

interface PostCardProps {
    readonly post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link
            to="/posts/$slug"
            params={{ slug: post.slug }}
            className="group block border-b py-6 transition-colors duration-[--duration-fast]"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <p
                        className="mb-2 text-[15px]"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        {post.date} &middot; {CATEGORY_LABELS[post.category] ?? post.category}
                    </p>
                    <h2 className="mb-2 text-[22px] font-semibold leading-[1.3]">
                        {post.title}
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {post.description}
                    </p>
                </div>
                {post.coverImage && (
                    <img
                        src={post.coverImage}
                        alt=""
                        width={160}
                        height={100}
                        className="hidden flex-shrink-0 rounded-lg object-cover transition-transform duration-[--duration-normal] group-hover:scale-[1.02] sm:block"
                        loading="lazy"
                    />
                )}
            </div>
        </Link>
    )
}
```

- [ ] **Step 3: Create src/components/post/PostList.tsx**

```tsx
// src/components/post/PostList.tsx
import { useState } from 'react'
import type { PostMeta } from '~/lib/posts'
import { CategoryTabs } from './CategoryTabs'
import { PostCard } from './PostCard'

interface PostListProps {
    readonly posts: PostMeta[]
}

export function PostList({ posts }: PostListProps) {
    const [category, setCategory] = useState('all')

    const filtered = category === 'all'
        ? posts
        : posts.filter((p) => p.category === category)

    return (
        <div>
            <CategoryTabs selected={category} onSelect={setCategory} />
            <div className="mt-2" role="tabpanel">
                {filtered.length === 0 ? (
                    <p
                        className="py-12 text-center"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        이 카테고리에 아직 포스트가 없습니다.
                    </p>
                ) : (
                    filtered.map((post) => <PostCard key={post.slug} post={post} />)
                )}
            </div>
        </div>
    )
}
```

- [ ] **Step 4: Update src/routes/index.tsx**

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PostList } from '~/components/post/PostList'
import { getAllPosts } from '~/lib/posts'

const fetchPosts = createServerFn().handler(async () => {
    return getAllPosts()
})

export const Route = createFileRoute('/')({
    loader: () => fetchPosts(),
    component: HomePage,
})

function HomePage() {
    const posts = Route.useLoaderData()

    return (
        <main className="mx-auto max-w-[1080px] px-4 py-8">
            <PostList posts={posts} />
        </main>
    )
}
```

- [ ] **Step 5: Run dev server and verify post list renders**

```bash
pnpm dev
```

Expected: Home page shows category tabs and two posts (post-01, hello-world) with dates, categories, and descriptions.

- [ ] **Step 6: Commit**

```bash
git add src/components/post/ src/routes/index.tsx
git commit -m "feat: add home page with post feed and category tabs

Server-fetched posts, client-side category filtering,
responsive post cards with hover effects."
```

---

### Task 6: Post detail page with MDX rendering

**Files:**
- Create: `src/routes/posts/$slug.tsx`

- [ ] **Step 1: Create src/routes/posts/$slug.tsx**

```tsx
// src/routes/posts/$slug.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useMemo } from 'react'
import * as runtime from 'react/jsx-runtime'
import { compile, run } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { getPostMeta, getPostContent } from '~/lib/posts'
import { mdxComponents } from '~/components/mdx/MdxComponents'

const CATEGORY_LABELS: Record<string, string> = {
    dev: '개발',
    essay: '에세이',
    life: '일상',
}

const fetchPost = createServerFn()
    .validator((slug: string) => slug)
    .handler(async ({ data: slug }) => {
        const meta = getPostMeta(slug)
        const content = getPostContent(slug)
        if (!meta || !content) throw notFound()

        const compiled = await compile(content, {
            outputFormat: 'function-body',
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
        })

        return { meta, code: String(compiled) }
    })

export const Route = createFileRoute('/posts/$slug')({
    loader: ({ params }) => fetchPost({ data: params.slug }),
    head: ({ loaderData }) => ({
        meta: [
            { title: `${loaderData.meta.title} — boxersb blog` },
            { name: 'description', content: loaderData.meta.description },
        ],
    }),
    component: PostPage,
})

function PostPage() {
    const { meta, code } = Route.useLoaderData()

    const MdxContent = useMemo(() => {
        const mod = run(code, { ...runtime })
        return mod.default
    }, [code])

    return (
        <article>
            {meta.coverImage && (
                <div
                    className="h-[300px] w-full bg-cover bg-center md:h-[400px]"
                    style={{ backgroundImage: `url(${meta.coverImage})` }}
                    role="img"
                    aria-label={meta.title}
                />
            )}
            <div className="mx-auto max-w-[680px] px-4 py-10">
                <p
                    className="mb-3 text-[15px]"
                    style={{ color: 'var(--color-text-muted)' }}
                >
                    {meta.date} &middot; {CATEGORY_LABELS[meta.category] ?? meta.category} &middot; {meta.readingTime}
                </p>
                <h1 className="mb-8 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]">
                    {meta.title}
                </h1>
                <MdxContent components={mdxComponents} />
            </div>
        </article>
    )
}
```

- [ ] **Step 2: Run dev and verify post detail route**

```bash
pnpm dev
```

Navigate to `http://localhost:3000/posts/hello-world`. Expected: Post renders with proper headings, lists, blockquotes, and styled components.

- [ ] **Step 3: Commit**

```bash
git add src/routes/posts/
git commit -m "feat: add post detail page with server-compiled MDX

Dynamic route /posts/$slug, MDX compiled on server with
remark-gfm and rehype-slug, rendered with custom components."
```

---

### Task 7: Static pages (About, Projects, Resume)

**Files:**
- Create: `src/routes/about.tsx`, `src/routes/projects.tsx`, `src/routes/resume.tsx`

- [ ] **Step 1: Create src/routes/about.tsx**

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    head: () => ({
        meta: [
            { title: 'About — boxersb blog' },
            { name: 'description', content: 'boxersb에 대해' },
        ],
    }),
    component: AboutPage,
})

function AboutPage() {
    return (
        <main className="mx-auto max-w-[680px] px-4 py-10">
            <h1 className="mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]">
                About
            </h1>
            <div className="text-lg leading-[1.8]" style={{ color: 'var(--color-text)' }}>
                <p className="mb-6">
                    안녕하세요. Frontend 개발자 <strong>boxersb</strong>입니다.
                </p>
                <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    이 블로그에서는 개발 경험, 기술 에세이, 그리고 일상을 기록합니다.
                </p>
            </div>
        </main>
    )
}
```

- [ ] **Step 2: Create src/routes/projects.tsx**

```tsx
// src/routes/projects.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
    head: () => ({
        meta: [
            { title: 'Projects — boxersb blog' },
            { name: 'description', content: 'boxersb의 프로젝트 포트폴리오' },
        ],
    }),
    component: ProjectsPage,
})

function ProjectsPage() {
    return (
        <main className="mx-auto max-w-[1080px] px-4 py-10">
            <h1 className="mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]">
                Projects
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
                프로젝트가 준비 중입니다.
            </p>
        </main>
    )
}
```

- [ ] **Step 3: Create src/routes/resume.tsx**

```tsx
// src/routes/resume.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resume')({
    head: () => ({
        meta: [
            { title: 'Resume — boxersb blog' },
            { name: 'description', content: 'boxersb 이력서' },
        ],
    }),
    component: ResumePage,
})

function ResumePage() {
    return (
        <main className="mx-auto max-w-[680px] px-4 py-10">
            <h1 className="mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]">
                Resume
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>
                이력서가 준비 중입니다.
            </p>
        </main>
    )
}
```

- [ ] **Step 4: Verify all pages and navigation**

```bash
pnpm dev
```

Navigate to each page: `/`, `/about`, `/projects`, `/resume`, `/posts/hello-world`. Verify header nav links highlight correctly.

- [ ] **Step 5: Commit**

```bash
git add src/routes/about.tsx src/routes/projects.tsx src/routes/resume.tsx
git commit -m "feat: add About, Projects, and Resume pages

Placeholder content for static pages with proper
SEO head tags and consistent layout."
```

---

## Phase 5: Fonts & Polish

### Task 8: Self-host Pretendard and JetBrains Mono fonts

**Files:**
- Create: `public/fonts/` (font files)

- [ ] **Step 1: Download and place font files**

```bash
mkdir -p public/fonts

# Download Pretendard Variable woff2
curl -L -o public/fonts/PretendardVariable.subset.woff2 \
  "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"

# Download JetBrains Mono woff2
curl -L -o public/fonts/JetBrainsMono-Variable.woff2 \
  "https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Regular.woff2"
```

> **Note:** Verify exact URLs at build time. If CDN URLs change, download from official release pages.

- [ ] **Step 2: Verify fonts load in dev server**

```bash
pnpm dev
```

Open DevTools > Network > Font. Verify both woff2 files load. Text should render in Pretendard.

- [ ] **Step 3: Commit**

```bash
git add public/fonts/
git commit -m "feat: self-host Pretendard and JetBrains Mono fonts

Variable woff2 files for optimal loading performance."
```

---

## Phase 6: Prerendering & Deployment

### Task 9: Configure prerendering and GitHub Pages deployment

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Update vite.config.ts with explicit prerender routes**

Update the `tanstackStart` config:
```ts
tanstackStart({
    prerender: {
        enabled: true,
        crawlLinks: true,
        routes: ['/', '/about', '/projects', '/resume'],
    },
}),
```

> `crawlLinks: true` will also discover `/posts/*` routes from the home page links.

- [ ] **Step 2: Test build locally**

```bash
pnpm build
```

Expected: Build succeeds, `.output/public/` contains prerendered HTML files for all routes.

- [ ] **Step 3: Create .github/workflows/deploy.yml**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - run: pnpm build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

> **Note:** The `.output/public` path may vary based on TanStack Start's build output. Verify after the first local build and adjust if needed.

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts .github/workflows/deploy.yml
git commit -m "feat: add GitHub Pages deployment with prerendering

GitHub Actions workflow builds static site and deploys
to Pages. Prerender all routes at build time."
```

---

## Phase 7: Update Project Configuration

### Task 10: Update CLAUDE.md and clean up

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md to reflect new stack**

Replace the Project Overview, Commands, and Architecture sections:
```markdown
## Project Overview

A personal blog built with **TanStack Start** (SSG mode), **MDX** for markdown-based content with React components, and **Tailwind CSS v4** for styling. Package manager is **pnpm**.

## Commands

\`\`\`bash
pnpm dev              # Start dev server (Vinxi)
pnpm build            # Production build (static prerender)
pnpm start            # Serve production build
pnpm typecheck        # Run tsc
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm prettier         # Prettier check
pnpm prettier:fix     # Prettier auto-fix
\`\`\`

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
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for TanStack Start stack

Reflect new architecture, commands, routing, and
content pipeline."
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Foundation | Task 1 | Remove old stack, install TanStack Start, design tokens |
| 2. Design System | Tasks 2-3 | Theme system, Header, Footer, mobile menu |
| 3. Content | Task 4 | MDX pipeline with gray-matter, custom components |
| 4. Pages | Tasks 5-7 | Home feed, post detail with MDX, About, Projects, Resume |
| 5. Fonts | Task 8 | Self-hosted Pretendard + JetBrains Mono |
| 6. Deploy | Task 9 | Prerendering config, GitHub Actions workflow |
| 7. Config | Task 10 | Update CLAUDE.md |
