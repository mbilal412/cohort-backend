import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const{handleLogin} = useAuth()
    const {user, loading} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isSuccess = await handleLogin(email, password)

        if(isSuccess){
            navigate('/')
        }
        
        setEmail('')
        setPassword('')
    }

    if(loading){
        return <h1>Loading...</h1>
    }


    return (
        <>
            <main>
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} >
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            value={email}
                            required
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            value={password}
                            required />

                        <button>Login</button>
                    </form>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </main>
        </>

    )
}

export default Login