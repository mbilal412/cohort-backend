import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})


export async function registerUser({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password

        })
        return response.data
    }
    catch (error) {
        throw error
    }
}

export async function loginUser({ identifier, password }) {
    try {
        const response = await api.post('/api/auth/login', {
            identifier, password
        })
        return response.data
    }
    catch (error) {
        throw error
    }
}

export async function logoutUser() {
    try {
        const response = api.post('/api/auth/logout')
        return response.data
    }
    catch (error) {
        throw error
    }
}

export async function getMe() {
    try {
        const response = await api.get('/api/auth/me')
        return response.data
    }
    catch (error) {
        throw error
    }
}