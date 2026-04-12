import { Link } from '@tanstack/react-router'
import type { PostMeta } from '~/lib/posts'

const CATEGORY_LABELS: Record<string, string> = {
    dev: '개발',
    essay: '에세이',
    life: '일상',
}

interface PostCardProps {
    post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
    const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category

    return (
        <Link
            to={`/posts/${post.slug}` as '/'}
            className="group block border-b py-6 transition-colors duration-[--duration-fast]"
            style={{ borderColor: 'var(--color-border)' }}
        >
            <div className="flex items-start gap-6">
                <div className="flex-1 min-w-0">
                    <p className="text-[15px] mb-2" style={{ color: 'var(--color-text-muted)' }}>
                        {post.date.slice(0, 10)} &middot; {categoryLabel} &middot; {post.readingTime}
                    </p>
                    <h2
                        className="text-[22px] font-semibold leading-snug mb-2 group-hover:opacity-80 transition-opacity duration-[--duration-fast]"
                        style={{ color: 'var(--color-text)' }}
                    >
                        {post.title}
                    </h2>
                    {post.description && (
                        <p
                            className="text-base leading-relaxed line-clamp-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {post.description}
                        </p>
                    )}
                </div>
                {post.coverImage && (
                    <div className="hidden sm:block shrink-0">
                        <img
                            src={post.coverImage}
                            alt=""
                            width={160}
                            height={100}
                            className="rounded-lg object-cover w-[160px] h-[100px] group-hover:scale-[1.02] transition-transform duration-[--duration-fast]"
                        />
                    </div>
                )}
            </div>
        </Link>
    )
}
