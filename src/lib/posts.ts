import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'posts')

export type PostCategory = 'dev' | 'essay' | 'life'

export interface PostMeta {
    slug: string
    title: string
    date: string
    category: PostCategory
    description: string
    coverImage?: string
    tags?: string[]
    draft?: boolean
    readingTime: string
}

function parseMdxFile(slug: string): { meta: PostMeta; content: string } | null {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
        return null
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    const {data, content} = matter(raw)
    const stats = readingTime(content)

    const meta: PostMeta = {
        slug,
        title: data.title ?? '',
        date: data.date instanceof Date ? data.date.toISOString() : String(data.date ?? ''),
        category: data.category ?? 'dev',
        description: data.description ?? '',
        coverImage: data.coverImage,
        tags: data.tags,
        draft: data.draft,
        readingTime: stats.text,
    }

    return {meta, content}
}

export function getAllPosts(): PostMeta[] {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

    const posts = files
        .map((file) => {
            const slug = file.replace(/\.mdx$/, '')
            const parsed = parseMdxFile(slug)
            return parsed?.meta ?? null
        })
        .filter((meta): meta is PostMeta => meta !== null && meta.draft !== true)

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostSlugs(): string[] {
    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith('.mdx'))
        .map((f) => f.replace(/\.mdx$/, ''))
}

export function getPostMeta(slug: string): PostMeta | null {
    return parseMdxFile(slug)?.meta ?? null
}

export function getPostContent(slug: string): string | null {
    return parseMdxFile(slug)?.content ?? null
}
