import React, { useState } from 'react'
import { createContext } from 'react'
import Post from './components/Post'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    const [feed, setFeed] = useState(null)
    const [loading, setLoading] = useState(false)
    return (

        <PostContext.Provider value={{ feed, setFeed, loading, setLoading }}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider