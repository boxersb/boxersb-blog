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
