import React from 'react'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import '../styles/form.scss';

const Register = () => {
    const { handleRegister } = useAuth()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleRegister(email, username, password)

        setEmail('')
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <main>
                <div className="form-container">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder='Username'
                            name='username'
                            value={username}
                            required
                        />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={email}
                            required
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={password}
                            required />

                        <button>Register</button>
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </main>
        </>
    )
}

export default Register