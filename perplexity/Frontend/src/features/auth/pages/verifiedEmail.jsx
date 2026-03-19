import React, { useEffect } from 'react';
import { Link } from 'react-router';
import '../style/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';

const VerifiedEmail = () => {

    const user = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.auth.loading)
    const auth = useAuth()

    let token = ""

    useEffect(() => {
        token = new URLSearchParams(window.location.search).get("token")
        console.log(token)

        auth.handleVerifyEmail(token)
      
    }, [])

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return <div>Link is not valid</div>
    }

    return (
        <div className="auth-page centered">
            <div className="form-panel">
                <div className="auth-form-container">
                    <div className="form-header">
                        <div className="verify-icon-large success">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>Email Verified!</h2>
                        <p>Thank you for verifying your email address. Your account is now fully activated and ready to use.</p>
                    </div>

                    <div className="verify-actions">
                        <Link to="/login" className="submit-btn">
                            Back to Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background orbs for aesthetic consistency even without the panel */}
            <div className="bg-orbs-container">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
            </div>
        </div>
    );
};

export default VerifiedEmail;
