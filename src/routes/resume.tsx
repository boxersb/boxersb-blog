import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/resume')({
    head: () => ({
        meta: [{title: 'Resume — boxersb blog'}, {name: 'description', content: 'boxersb 이력서'}],
    }),
    component: ResumePage,
})

function ResumePage() {
    return (
        <main className="mx-auto max-w-[680px] px-4 py-10">
            <h1 className="mb-6 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]">Resume</h1>
            <p style={{color: 'var(--color-text-muted)'}}>이력서가 준비 중입니다.</p>
        </main>
    )
}
