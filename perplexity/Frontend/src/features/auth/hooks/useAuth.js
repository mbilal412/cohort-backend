import { login, register, logout, getMe, verifyEmail } from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setUser, setError, setLoading } from "../auth.slice"



export const useAuth = () => {

    const dispatch = useDispatch();

    const handleRegister = async ({ fullname, email, password }) => {
        try {
            dispatch(setLoading(true))
            const response = await register({ fullname, email, password });
            dispatch(setUser(response.user))
        } catch (error) {
            dispatch(setError(error.response.data.message || "Something went wrong"))
            throw error
           
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            dispatch(setLoading(true))
            const response = await login({ email, password });
            dispatch(setUser(response.user))
        } catch (error) {
            
            dispatch(setError(error.response.data.message || "Something went wrong"))
            throw error
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true))
            const response = await logout();
            dispatch(setUser(null))
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setError(error.response.data.message || "Something went wrong"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))
            const response = await getMe();
            dispatch(setUser(response.user))
        } catch (error) {
            dispatch(setError(error.response.data.message || "Something went wrong"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleVerifyEmail = async (token) => {
        try {
            dispatch(setLoading(true))
            const response = await verifyEmail(token);
            dispatch(setUser(response.user))
        } catch (error) {
            dispatch(setError(error.response.data.message || "Something went wrong"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe,
        handleVerifyEmail
    }
}
