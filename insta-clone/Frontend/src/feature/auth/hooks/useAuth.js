import { registerUser, loginUser } from "../services/auth.api"
import { useContext } from "react"
import { AuthContext } from "../auth.context"

export const useAuth = () => {

    const {user, setUser, loading, setLoading} = useContext(AuthContext)


    async function handleRegister({email, username, password, profileImage}) {

        try {
            setLoading(true)
            const response = await registerUser({email, username, password, profileImage})
            console.log(response)
            setUser(response.user)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            throw error.response.data
        }
    }

    async function handleLogin({identifier, password}) {
        try {
            setLoading(true)
            const response = await loginUser({identifier, password})

            setUser(response.user)
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            throw error.response.data
        }
    }

    return {
        handleRegister,
        handleLogin,
        user,
        loading
    }
}