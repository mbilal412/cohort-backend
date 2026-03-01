import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const { handleLogin } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleLogin(email, password)

            navigate('/feed')
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setEmail('')
            setPassword('')
        }
    }
    return (
        <main >
            <div className='form-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
                    <button className='login primary-btn' type='submit'>Login</button>
                    <p>Dont have an account? <a href="/register">Register</a></p>

                </form>
            </div>
        </main >
    )
}

export default Login