import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resume')({
    component: ResumePage,
})

function ResumePage() {
    return (
        <main className="mx-auto max-w-[1080px] px-4 py-12">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
                Resume
            </h1>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Coming soon.
            </p>
        </main>
    )
}
