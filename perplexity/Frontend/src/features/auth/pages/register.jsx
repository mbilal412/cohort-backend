import React, { useState } from 'react';
import { Link } from 'react-router';
import '../style/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Register = () => {


  const auth = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullname, setFullname] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.handleRegister({ email, password, fullname })
      navigate("/verify-email")
    } catch (error) {
      const newError = {}
      error.response.data.errors.map((error) => {
        newError[error.path] = error.msg
      })
      setError(newError)
      console.table(newError)
    }
  }

  return (
    <div className="auth-page">
      {/* Left Panel: Branding */}
      <div className="branding-panel">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>

        <div className="branding-content">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>Nexus AI</span>
          </div>

          <h1>Think faster.<br />Know more.</h1>
          <p className="subtext">
            Join the future of search. Discover insights with our advanced contextual intelligence.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="feature-info">
                <h3>Instant Answers</h3>
                <p>Get real-time responses from across the web.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="feature-info">
                <h3>Deep Research</h3>
                <p>Multi-step reasoning for complex questions.</p>
              </div>
            </div>
          </div>

          {/* Testimonial card removed */}
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="form-panel">
        <div className="auth-form-container">
          <div className="form-header">
            <div className="mobile-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <h2>Create account</h2>
            <p>Enter your details below to get started</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="fullName">Full Name</label>
              </div>
              <input
                required
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}

              />
              {<span className="error-msg">{error.name ? error.name : ""}</span>}
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="email">Email</label>
              </div>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              {<span className="error-msg">{error.email ? error.email : ""}</span>}
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
              </div>
              <div className="password-wrapper">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {<span className="error-msg">{error.password ? error.password : ""}</span>}
            </div>

            <button type="submit" className="submit-btn">
              Create account
            </button>
          </form>



          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
