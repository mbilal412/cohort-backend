import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        handleGetMe()
    }, [])
    
    const handleGetMe = async () => {
        try {
            const response = await getMe() 
            console.log(response.user)
            setUser(response.user) 
            setLoading(false)
        } catch(error) {
            console.log(error?.response?.data || error)
            setUser(null)
            setLoading(false)
        }
    }

    return (

        <AuthContext.Provider value={{ loading, setLoading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}