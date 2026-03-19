import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/user',
    withCredentials: true
})

export async function getFollowers(){
    try{
        const response = await api.get('/followers')
        return response.data
    }catch(error){
        throw error
    }
}

export async function acceptRequest(postId){
    try{
        const response = await api.patch(`/follow/accept/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
} 

export async function rejectRequest(postId){
    try{
        const response = await api.delete(`/follow/reject/${postId}`)
        return response.data
    }
    catch(error){
        throw error
    }
} 

export async function getFollowing(){
    try{
        const response = await api.get('/following')
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function unfollowUser(userId){
    try{
        const response = await api.delete(`unfollow/${userId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function cancelFollowRequest(userId){
    try{
        const response = await api.delete(`follow/cancel/${userId}`)
        return response.data
    }
    catch(error){
        throw error
    }
}