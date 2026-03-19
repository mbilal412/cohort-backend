import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
});

export const register = async ({fullname, email, password}) =>{
    const response = await api.post("/register", {name: fullname, email, password});
    return response.data
}

export const login = async ({email, password}) => {
    const response = await api.post("/login", {email, password});
    return response.data
}


export const logout = async () => {
    const response = await api.post("/logout");
    return response.data
}

export const getMe = async () => {
    const response = await api.get("/get-me");
    return response.data
}

export const verifyEmail = async (token) => {
    const response = await api.post("/verify-email?token=" + token);
    return response.data
}