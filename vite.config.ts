import path from 'node:path'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

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
            },
        }),
        viteReact(),
        tailwindcss(),
    ],
})
