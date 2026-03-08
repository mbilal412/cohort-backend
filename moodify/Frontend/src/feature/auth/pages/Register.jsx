import React from 'react';
import FormGroup from '../Component/FormGroup';
import '../styles/register.scss';
import '../../shared/button.scss';
import '../../shared/link.scss';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { handleRegister } = useAuth()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('password do not match')
            return
        }

        try {
            await handleRegister({ username, email, password })
            navigate('/')
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
        catch (error) {
            alert(error.response.data)
        }


    }


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Sign up for Moodify</h2>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        required={true}
                    />
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required={true}
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        required={true}
                    />
                    <FormGroup
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        required={true}
                    />
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign Up
                    </button>
                </form>
                <div className="auth-footer">
                    Already have an account? <a href="/login" className="link">Log in here</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
