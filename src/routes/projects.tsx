import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
    head: () => ({
        meta: [
            {title: 'Projects — boxersb blog'},
            {name: 'description', content: 'boxersb의 프로젝트 포트폴리오'},
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
            <p style={{color: 'var(--color-text-muted)'}}>
                프로젝트가 준비 중입니다.
            </p>
        </main>
    )
}
