import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/component/Nav'
import Users from '../components/Users'

const Feed = () => {
    const { handleGetFeed, loading, feed } = usePost()

    useEffect(() => {
        const fetchFeed = async () => {
            await handleGetFeed()
        }
        fetchFeed()
    }, [])

    if (loading || !feed) {
        return (<main><div>Feed is Loading...</div></main>)
    }




    return (
        <main className='feed-main'>
            <div className="feed-page">
                <Nav />

                <div className="feed-content">
                    <div className="posts">
                        {feed.map((post) => {
                            return <Post key={post._id} post={post} user={post.user} />
                        })
                        }
                    </div>

                    <div className="sidebar">
                        <Users />
                    </div>
                </div>
            </div>
        </main >
    )
}

export default Feed