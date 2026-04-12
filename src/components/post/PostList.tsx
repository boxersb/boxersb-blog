'use client'

import { useState } from 'react'
import type { PostMeta } from '~/lib/posts'
import { CategoryTabs } from './CategoryTabs'
import { PostCard } from './PostCard'

interface PostListProps {
    posts: PostMeta[]
}

export function PostList({ posts }: PostListProps) {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const filteredPosts =
        selectedCategory === 'all' ? posts : posts.filter((post) => post.category === selectedCategory)

    return (
        <div>
            <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
            <div>
                {filteredPosts.length === 0 ? (
                    <p
                        className="py-12 text-center text-base"
                        style={{ color: 'var(--color-text-muted)' }}
                    >
                        이 카테고리에 아직 포스트가 없습니다.
                    </p>
                ) : (
                    filteredPosts.map((post) => <PostCard key={post.slug} post={post} />)
                )}
            </div>
        </div>
    )
}
