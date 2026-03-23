import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import '../style/auth.scss';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Login = () => {


  const auth = useAuth()

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.handleLogin({ email, password })
      navigate("/")
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
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
            Your AI-powered search companion that understands context, not just keywords.
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
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="feature-info">
                <h3>Always Learning</h3>
                <p>Adapts to your search style over time.</p>
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
            <h2>Welcome back</h2>
            <p>Log in to your account to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="email">Email</label>
              </div>
              <input
              required
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              <span className="error-msg"></span>
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
              <span className="error-msg">{error}</span>
            </div>

            <button type="submit" className="submit-btn">
              Sign in
            </button>
          </form>

          {/* Social auth and divider removed */}

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
