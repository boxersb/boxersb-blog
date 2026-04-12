const CATEGORIES = [
    { value: 'all', label: 'All' },
    { value: 'dev', label: '개발' },
    { value: 'essay', label: '에세이' },
    { value: 'life', label: '일상' },
] as const

interface CategoryTabsProps {
    selected: string
    onSelect: (category: string) => void
}

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
    return (
        <div
            role="tablist"
            aria-label="카테고리 필터"
            className="flex gap-6 border-b border-[var(--color-border)]"
        >
            {CATEGORIES.map(({ value, label }) => {
                const isActive = selected === value
                return (
                    <button
                        key={value}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onSelect(value)}
                        className="relative pb-3 text-[15px] transition-colors duration-[--duration-fast] cursor-pointer"
                        style={{
                            color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                            fontWeight: isActive ? 500 : 400,
                        }}
                    >
                        {label}
                        {isActive && (
                            <span
                                aria-hidden="true"
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
