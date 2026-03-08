
import { registerUser, loginUser, logoutUser, getMe } from '../services/auth.api'
import { useContext } from 'react'
import { AuthContext } from '../auth.context'

export const useAuth = () => {

    const { loading, setLoading, user, setUser } = useContext(AuthContext)

   


    async function handleRegister({ username, email, password }) {
        try {
            const response = await registerUser({ username, email, password })
            console.log(response)
        }
        catch (error) {
            conosole.log(error.response.data)
            throw error
        }
    }

    async function handleLogin({ identifier, password }) {
        try {
            const response = await loginUser({ identifier, password })
            setLoading(false)
            setUser(response.user)
        }
        catch (error) {
            console.log(error.response.data)
            throw error
        }
    }

    async function handleLogout({ }) { }
    


    return { handleRegister, handleLogin, handleLogout, user, loading }
}