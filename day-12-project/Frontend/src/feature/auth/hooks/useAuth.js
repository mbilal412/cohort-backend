import { registerUser, loginUser } from "../services/auth.api"

export const useAuth = () => {


    async function handleRegister(email, username, password, profileImage) {

        try {
            const response = await registerUser(email, username, password, profileImage)
            console.log(response)

        } catch (error) {
            throw error.response.data
        }

        

    }

    async function handleLogin(email, password) {
        try{
            const response = await loginUser(email, password)
            
            console.log(response)
        }
        catch(error){
            throw error.response.data
        }
    }

    return {
            handleRegister,
            handleLogin
        }
}