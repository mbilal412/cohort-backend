import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {loading, user} = useAuth()

    if(loading){
        return <div>Loading...</div>
    }
    
    if(!user){
        return <Navigate to='/login' />
    }

    return children
}

export default ProtectedRoute