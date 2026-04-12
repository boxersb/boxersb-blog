import { useState } from 'react'
import { Link } from '@tanstack/react-router'

interface NavItem {
    to: string
    label: string
}

interface MobileMenuProps {
    items: readonly NavItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    const close = () => setIsOpen(false)
    const toggle = () => setIsOpen((prev) => !prev)

    return (
        <div className="md:hidden">
            <button
                type="button"
                onClick={toggle}
                aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isOpen}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]"
            >
                {isOpen ? (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <nav
                    aria-label="모바일 내비게이션"
                    className="absolute top-14 left-0 right-0 border-b p-4"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <ul className="flex flex-col gap-1">
                        {items.map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to as '/' | '/projects' | '/about' | '/resume'}
                                    onClick={close}
                                    className="block px-3 py-2 text-sm rounded-md transition-colors duration-[--duration-fast] hover:bg-[var(--color-surface-alt)]"
                                    style={{ color: 'var(--color-text-muted)' }}
                                    activeProps={{
                                        style: {
                                            color: 'var(--color-text)',
                                            fontWeight: 500,
                                        },
                                    }}
                                    {...(item.to === '/' ? { activeOptions: { exact: true } } : {})}
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
