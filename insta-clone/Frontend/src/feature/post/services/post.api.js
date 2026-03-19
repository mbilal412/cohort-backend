import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export async function getFeed(){
    try{
        const response  = await api.get('/api/post/feed')
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function likePost(postId){
    try{
        const response = await api.post(`/api/post/like/${postId}`)
        
        return response.data
    }
    catch(error){
        throw error
    }
}
export async function unlikePost(postId){
    try{
        const response = await api.post(`/api/post/unlike/${postId}`)
        
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function createPost(caption, postImage){
    const formData = new FormData()
    formData.append('post-image', postImage)
    formData.append('caption', caption)

    try{
        const response = await api.post('/api/post/create', formData)
        return response.data
    }
    catch(error){ 
        throw error
    }



}
