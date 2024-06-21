import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false)
    const [loginError, setLoginError] = useState('');
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
            return
        }

        try {
            const res = await api.post('/api/token/', {
                username,
                password,
            })
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate('/dashboard')
        } catch(error) {
            setLoginError('Invalid email or password')
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleInputChange = (e, setter) => {
        setter(e.target.value)
    }

  return (
    <div className="login-background">
        <div className='container'>
            <div className={`row align-items-center ${isMobile ? "" : "vh-100"}`}>
                <div className={`col-md-5 ${isMobile ? "mt-4" : "me-5"} text-center text-md-start`}>
                    <h1 className="display-4">Sign In to</h1>
                    <h1 className="display-4">Manage Awesome</h1>
                    <h1 className="display-4">Stuff</h1>
                    <p className="mt-4">Don't have an account? <a className='text-decoration-none' href="/register">sign up here</a>.</p>
                </div>
                <div className={`col-md-5 ${isMobile ? "mt-4" : "ms-5"}`}>
                    <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                        {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                required
                                onChange={(e) => handleInputChange(e, setUsername)}
                                value={username}
                            />
                            <label htmlFor="email">Email</label>
                            <div className="invalid-feedback">Please provide a valid email address.</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                required
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <label htmlFor="password">Password</label>
                            <div className="invalid-feedback">Please provide a password.</div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
