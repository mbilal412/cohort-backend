import React, { useEffect, useState, createContext } from 'react'
import { getMe } from './services/auth.api'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // Start with loading true for initial check

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getMe()
                setUser(response.user)
            }
            catch (error) {
                console.log("Not logged in or session expired")
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider