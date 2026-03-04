import { getFollowers, acceptRequest, rejectRequest } from "../services/user.api"
import { useContext } from "react"
import { UserContext } from '../user.context'



export const useUser = () => {

    const {followers, setFollowers, following, setFollowing} = useContext(UserContext)

    async function handleGetFollowers(){
        try{
            const response = await getFollowers()
            setFollowers(response.follows)
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

    return {
        handleGetFollowers,handleAcceptRequest,handleRejectRequest, followers
    }
} 