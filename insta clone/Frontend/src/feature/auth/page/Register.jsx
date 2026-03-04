import React, { useEffect, useState, useRef } from 'react'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const { handleRegister } = useAuth()
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
            await handleRegister(email, username, password, profileImage)
            navigate('/login')
        }
        catch (error) {
            console.log(error)
        }
        finally {

            setEmail('')
            setUsername('')
            setPassword('')
        }
    }
    return (
        <main >
            <div className='form-container'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='email' />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
                    <input hidden ref={profileImageInputRef} id='profile' type="file" name='profileImage' onChange={handleFileChange} />
                    <label htmlFor="profile">{selectedFile ? `🗃️ ${selectedFile}` : 'Select profile picture'}</label>
                    <button className='register primary-btn' type='submit'>Register</button>
                    <p>Already have an account? <Link className='login-link' to={"/login"}>Login</Link></p>

                </form>
            </div>
        </main >
    )
}

export default Register