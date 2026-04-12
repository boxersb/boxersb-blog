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
