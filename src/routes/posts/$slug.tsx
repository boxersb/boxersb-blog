import {useMemo} from 'react'

import {compile} from '@mdx-js/mdx'
import {runSync} from '@mdx-js/mdx'
import {createFileRoute, notFound} from '@tanstack/react-router'
import {createServerFn} from '@tanstack/react-start'
import * as runtime from 'react/jsx-runtime'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import type {PostCategory} from '~/lib/posts'

import {mdxComponents} from '~/components/mdx/MdxComponents'
import {getPostMeta, getPostContent} from '~/lib/posts'

const CATEGORY_LABELS: Record<PostCategory, string> = {
    dev: '개발',
    essay: '에세이',
    life: '일상',
}

const fetchPost = createServerFn({method: 'GET'})
    .inputValidator((slug: string) => slug)
    .handler(async ({data: slug}) => {
        const meta = getPostMeta(slug)
        const content = getPostContent(slug)

        if (!meta || !content) {
            throw notFound()
        }

        const compiled = await compile(content, {
            outputFormat: 'function-body',
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
        })

        return {meta, code: String(compiled)}
    })

export const Route = createFileRoute('/posts/$slug')({
    loader: ({params}) => fetchPost({data: params.slug}),
    head: ({loaderData}) => ({
        meta: [
            {title: `${loaderData?.meta.title} — boxersb blog`},
            {name: 'description', content: loaderData?.meta.description ?? ''},
        ],
    }),
    component: PostPage,
})

function PostPage() {
    const {meta, code} = Route.useLoaderData()

    const MdxContent = useMemo(() => {
        const {default: Component} = runSync(code, {
            ...runtime,
            baseUrl: import.meta.url,
        })
        return Component
    }, [code])

    const categoryLabel = CATEGORY_LABELS[meta.category] ?? meta.category

    return (
        <main>
            {meta.coverImage && (
                <div
                    className="h-[300px] w-full bg-cover bg-center md:h-[400px]"
                    style={{backgroundImage: `url(${meta.coverImage})`}}
                />
            )}
            <article className="mx-auto max-w-[680px] px-4 py-10">
                <p className="mb-3 text-[15px]" style={{color: 'var(--color-text-muted)'}}>
                    {meta.date.slice(0, 10)} &middot; {categoryLabel} &middot; {meta.readingTime}
                </p>
                <h1 className="mb-8 text-[clamp(32px,5vw,42px)] font-bold leading-[1.2]">{meta.title}</h1>
                <div className="prose">
                    <MdxContent components={mdxComponents} />
                </div>
            </article>
        </main>
    )
}
