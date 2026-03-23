import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export async function getFollowers(){
    try{
        const response = await api.get('/api/user/followers')
        return response.data
    }catch(error){
        throw error
    }
}

export async function acceptRequest(postId){
    try{
        const response = await api.patch(`/api/user/follow/accept/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
} 

export async function rejectRequest(postId){
    try{
        const response = await api.delete(`/api/user/follow/reject/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
} 

export async function getFollowing(){
    try{
        const response = await api.get('/api/user/following')
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function unfollowUser(userId){
    try{
        const response = await api.delete(`/api/user/unfollow/${userId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function cancelFollowRequest(userId){
    try{
        const response = await api.delete(`/api/user/follow/cancel/${userId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function getSuggestedUsers(){
    try{
        const response = await api.get('/api/user/suggested-users')
        return response.data
    }catch(error){
        throw error
    }
}

export async function followUser(userId){
    try{
        const response = await api.post(`/api/user/follow/${userId}`)
        return response.data
    }catch(error){
        throw error
    }
}