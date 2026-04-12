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
