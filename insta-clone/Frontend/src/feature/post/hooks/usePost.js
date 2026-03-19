import { getFeed, likePost, unlikePost, createPost} from "../services/post.api.js"
import { useContext } from "react"
import { PostContext } from "../post.context.jsx"


export const usePost = () => {
    const {feed, setFeed, loading, setLoading} = useContext(PostContext)

    async function handleGetFeed(){
        try{
            setLoading(true)
            const response = await getFeed()
            
            setFeed(response.posts.reverse())
            setLoading(false)
            console.log(response)
        }
        catch(error){
            throw error
            setLoading(false)
        }
    }

    async function handleLikePost(postId){
        try{
            const response = await likePost(postId)
            const updatedFeed = feed.map(post => {
                if(post._id === postId){
                    post.isLiked = true
                }
                return post
            })
            setFeed(updatedFeed)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleUnlikePost(postId){
        try{
            const response = await unlikePost(postId)
            const updatedFeed = feed.map(post => {
                if(post._id === postId){
                    post.isLiked = false
                }
                return post
            })
            setFeed(updatedFeed)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleCreatePost(caption, postImage){
        try{
            const response = await createPost(caption, postImage)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
            throw error.response.data
        }
    }

    return{
        handleGetFeed, feed, loading, handleLikePost, handleUnlikePost, handleCreatePost
    }
}