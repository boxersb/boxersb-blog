type Theme = 'light' | 'dark'
const STORAGE_KEY = 'boxersb-theme'

export function getInitialTheme(): Theme {
    if (typeof globalThis === 'undefined') return 'light'
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(STORAGE_KEY, theme)
}

export function toggleTheme(): Theme {
    const current = document.documentElement.dataset.theme as Theme
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    return next
}
