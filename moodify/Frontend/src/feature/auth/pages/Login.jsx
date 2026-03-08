import React from 'react';
import FormGroup from '../Component/FormGroup';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from "react-router";
import '../styles/login.scss';
import '../../shared/button.scss';
import '../../shared/link.scss';

const Login = () => {
    const navigate = useNavigate()
    const { handleLogin } = useAuth()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await handleLogin({ identifier, password })
            navigate('/')
            setIdentifier('')
            setPassword('')
        }
        catch (error) {
            alert(error.response.data)
        }

    }


    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Log in to Moodify</h2>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        label="Email or username"
                        type="text"
                        name="identifier"
                        placeholder="Email or username"
                        required={true}
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required={true}
                    />
                    <button type="submit" className="btn btn-primary btn-block">
                        Log In
                    </button>
                </form>
                <div className="auth-footer">
                    Don't have an account? <a href="/register" className="link">Register here</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
