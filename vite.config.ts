import path from 'node:path'

import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import {tanstackStart} from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import {defineConfig} from 'vite'

export default defineConfig({
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '~': path.resolve(import.meta.dirname, './src'),
        },
    },
    plugins: [
        mdx({
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        }),
        tanstackStart({
            prerender: {
                enabled: true,
                crawlLinks: true,
                routes: ['/', '/about', '/projects', '/resume'],
            },
        }),
        viteReact(),
        tailwindcss(),
    ],
})
