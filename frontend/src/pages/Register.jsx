import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [validated, setValidated] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false || password !== confirmPassword) {
            event.stopPropagation();
            setPasswordMatch(password === confirmPassword);
            setValidated(true);
            return;
        }

        try {
            const res = await api.post('/api/user/register/', {
                firstName,
                lastName,
                username,
                email,
                password,
            });
            navigate('/login');
        } catch (error) {
            alert('An error occurred');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

  return (
    <div className="login-background">

        <div className='container'>
            <div className={`row align-items-center ${isMobile ? "" : "vh-100"}`}>
                <div className={`col-md-5 ${isMobile ? "mt-4" : "me-5"} text-center text-md-start`}>
                    <h1 className="display-4">Sign Up to</h1>
                    <h1 className="display-4">Manage Awesome</h1>
                    <h1 className="display-4">Stuff</h1>
                    <p className="mt-4">if you already have an account, <a className='text-decoration-none' href="/login">log in here</a>.</p>
                </div>
                <div className={`col-md-5 ${isMobile ? "" : "ms-5"}`}>
                    <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder="First Name"
                                required
                                onChange={(e) => handleInputChange(e, setFirstName)}
                                value={firstName}
                            />
                            <label htmlFor="firstName">First Name</label>
                            <div className="invalid-feedback">Please provide a first name.</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="Last Name"
                                required
                                onChange={(e) => handleInputChange(e, setLastName)}
                                value={lastName}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <div className="invalid-feedback">Please provide a last name.</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                required
                                onChange={(e) => handleInputChange(e, setUsername)}
                                value={username}
                            />
                            <label htmlFor="username">Username</label>
                            <div className="invalid-feedback">Please provide a username.</div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                required
                                onChange={(e) => handleInputChange(e, setEmail)}
                                value={email}
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
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className={`form-control ${!passwordMatch ? 'is-invalid' : ''}`}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                onChange={handleConfirmPasswordChange}
                                value={confirmPassword}
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="invalid-feedback">{!passwordMatch ? 'Passwords do not match.' : 'Please confirm your password.'}</div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
