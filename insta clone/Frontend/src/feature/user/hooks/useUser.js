import { getFollowers, acceptRequest, rejectRequest, getFollowing, unfollowUser, cancelFollowRequest } from "../services/user.api"
import { useContext } from "react"
import { UserContext } from '../user.context'



export const useUser = () => {

    const {followers, setFollowers, following, setFollowing} = useContext(UserContext)

    async function handleGetFollowers(){
        try{
            const response = await getFollowers()
            setFollowers(response.followers)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleAcceptRequest(postId){
        try{
            const response = await acceptRequest(postId)
            const updatedFollowers = followers.map(f =>{
                if(f._id === postId){
                    f.status = 'accepted'
                }
                return f
            })
            setFollowers(updatedFollowers)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleRejectRequest(postId){
        try{
            const response = await rejectRequest(postId)
            const updatedFollowers = followers.filter(f =>{
                return f._id !== postId
            })
            setFollowers(updatedFollowers)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleGetFollowing(){
        try{
            const response = await getFollowing()
            setFollowing(response.following)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleUnfollowUser(userId){
        try{
            const response = await unfollowUser(userId)
            const updatedFollowing = following.filter(f =>{
                return f.followee._id !== userId
            })
            setFollowing(updatedFollowing)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    async function handleCancelFollowRequest(userId){
        try{
            const response = await cancelFollowRequest(userId)
            const updatedFollowing = following.filter(f =>{
                return f.followee._id !== userId
            })
            setFollowing(updatedFollowing)
            console.log(response)
        }
        catch(error){
            console.log(error.response.data)
        }
    }

    return {
        handleGetFollowers,handleAcceptRequest,handleRejectRequest,handleGetFollowing, handleUnfollowUser, handleCancelFollowRequest,  followers, following
    }
} 