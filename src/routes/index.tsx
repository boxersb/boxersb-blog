import {createFileRoute} from '@tanstack/react-router'
import {createServerFn} from '@tanstack/react-start'

import {PostList} from '~/components/post/PostList'
import {getAllPosts} from '~/lib/posts'

const fetchPosts = createServerFn({method: 'GET'}).handler(() => {
    return getAllPosts()
})

export const Route = createFileRoute('/')({
    loader: () => fetchPosts(),
    component: HomePage,
})

function HomePage() {
    const posts = Route.useLoaderData()

    return (
        <main className="max-w-[1080px] mx-auto px-4 py-8">
            <PostList posts={posts} />
        </main>
    )
}
