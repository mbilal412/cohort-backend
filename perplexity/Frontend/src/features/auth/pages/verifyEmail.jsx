import React, { useState } from 'react';
import '../style/auth.scss';

const VerifyEmail = () => {
 

  return (
    <div className="auth-page">
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
            <div className="verify-icon-large">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h2>Check your email</h2>
            <p>We've sent a verification link to your email address. Please click the link to verify your account.</p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;