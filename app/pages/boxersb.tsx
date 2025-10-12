import {allPosts} from 'contentlayer/generated'

import type {Post} from 'contentlayer/generated'

export default function Home() {
    return (
        <>
            <h3>Boxersb It works!</h3>
            <ul>
                {allPosts.map((post: Post) => (
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </>
    )
}
