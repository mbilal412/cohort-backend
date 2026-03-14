import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true
})
export async function registerUser({email, username, password, profileImage}) {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('profile-image', profileImage)
    try {
        const response = await api.post('/register', formData)
        return response.data
    }
    catch (error) {
        throw error
    }

}

export async function loginUser({identifier, password}){
    
    try{
        const response = await api.post('/login', {
            identifier, password
        })
        return response.data
    }

    catch(error){
        throw error
    }
}