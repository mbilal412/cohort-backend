import { login, register } from '../services/auth.api';
import { AuthContext } from '../auth.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {

    const navigate = useNavigate()
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context
    const handleLogin = async (email, password) => {

        try {
            setLoading(true)
            const response = await login(email, password)

            setUser(response.user)
            setLoading(false)
            return true
        }
        catch (error) {
            setUser(null)
            navigate('/login')
            console.log(error)
            return false
        }
        finally {
            setLoading(false)
        }

    }

    const handleRegister = async (email, username, password) => {
        setLoading(true)
        const response = await register(email, username, password)
        setUser(response.user)
        setLoading(false)
    }

    return {
        handleLogin, handleRegister, user, loading
    }

}