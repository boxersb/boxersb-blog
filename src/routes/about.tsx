import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    head: () => ({
        meta: [
            {title: 'About — boxersb blog'},
            {name: 'description', content: 'boxersb에 대해'},
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
            <div className="text-lg leading-[1.8]" style={{color: 'var(--color-text)'}}>
                <p className="mb-6">
                    안녕하세요. Frontend 개발자 <strong>boxersb</strong>입니다.
                </p>
                <p className="mb-6" style={{color: 'var(--color-text-secondary)'}}>
                    이 블로그에서는 개발 경험, 기술 에세이, 그리고 일상을 기록합니다.
                </p>
            </div>
        </main>
    )
}
