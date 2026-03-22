import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})
export async function registerUser({email, username, password, profileImage}) {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('profile-image', profileImage)
    try {
        const response = await api.post('/api/auth/register', formData)
        return response.data
    }
    catch (error) {
        throw error
    }

}

export async function loginUser({identifier, password}){
    
    try{
        const response = await api.post('/api/auth/login', {
            identifier, password
        })
        return response.data
    }

    catch(error){
        throw error
    }
}

export async function logoutUser(){
    try{
        const response = await api.post('/api/auth/logout')
        return response.data
    }
    catch(error){
        throw error
    }
}

export async function getMe(){
    try{
        const response = await api.get('/api/auth/get-me')
        return response.data
    }
    catch(error){
        throw error
    }
}