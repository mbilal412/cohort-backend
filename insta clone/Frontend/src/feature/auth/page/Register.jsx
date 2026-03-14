import React, { useEffect, useState, useRef } from 'react'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const { handleRegister, loading } = useAuth()
    const [formErrors, setFormErrors] = useState({})
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const profileImageInputRef = useRef()
    const profileImage = profileImageInputRef.current?.files[0]

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0].name)
             
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleRegister({email, username, password, profileImage})
            navigate('/login')
            setEmail('')
            setUsername('')
            setPassword('')
        }
        catch (error) {
            console.log(error)
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
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' />
                    <p className='error'>{formErrors.username}</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />
                    <p className='error'>{formErrors.email}</p>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
                    <p className='error'>{formErrors.password}</p>
                    <input hidden ref={profileImageInputRef} id='profile' type="file" name='profileImage' onChange={handleFileChange} />
                    <label htmlFor="profile">{selectedFile ? `🗃️ ${selectedFile}` : 'Select profile picture'}</label>
                    <button disabled = {loading} className='register primary-btn' type='submit'>Register</button>
                    <p className='error'>{formErrors.message}</p>
                    <p>Already have an account? <Link className='login-link' to={"/login"}>Login</Link></p>

                </form>
            </section>
        </main >
    )
}

export default Register