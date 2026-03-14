import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()
    const { handleLogin, loading } = useAuth()
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            await handleLogin({identifier, password})

            navigate('/feed')
            setIdentifier('')
            setPassword('')
        }
        catch (error) {
            if(error.errors){

                const newErrors = {}
                error.errors.forEach(err => {
                    newErrors[err.path] = err.msg
                })
                setFormErrors(newErrors)
            }
            else{
                setFormErrors({message: error.message})
            }
        }
    }
    return (
        <main >
            <section className='form-container'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} type="text" placeholder='email or username' />
                    <p className='error'>{formErrors.email}</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
                    <p className='error'>{formErrors.password}</p>
                    <button disabled = {loading} className='login primary-btn' type='submit'>Login</button>
                    <p className='error'>{formErrors.message}</p>
                    <p>Dont have an account? <Link className='register-link' to="/register">Register</Link></p>

                </form>
            </section>
        </main >
    )
}

export default Login