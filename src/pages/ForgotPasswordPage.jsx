import useForgotPasswordBehavior from "../hooks/useForgotPasswordBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";

export default function ForgotPasswordPage() {
  useForgotPasswordBehavior();
  useWhatsAppWidget();
  return (
    <>
      <main className="login-layout">
            <section className="login-visual" aria-hidden="true">
              <img src="../Images/image 41.png" alt="Fashion model" className="login-visual-image" />
              <div className="login-visual-overlay">
                <h2>Premium African Fabrics</h2>
                <p>Securely reset your account password.</p>
              </div>
            </section>
      
            <section className="login-pane">
              <div className="login-card" id="forgot-card">
                <img src="../Images/logo.png" alt="Taye's Fabrics Logo" className="login-mobile-logo" />
                <a href="/userpage/login.html" className="login-back-link"><i className="bx bx-arrow-back"></i> Back</a>
      
                <section id="forgot-step-email" className="forgot-step-panel">
                  <h1>Forgot Password</h1>
                  <p className="login-subtitle">Enter your registered email address. We'll send you a code to reset your password.</p>
      
                  <form id="forgot-email-form" className="login-form" noValidate>
                    <label htmlFor="forgot-email">Email Address</label>
                    <input id="forgot-email" type="email" name="email" placeholder="Enter your email" autoComplete="email" />
                    <span className="login-error" id="forgot-email-error" aria-live="polite"></span>
      
                    <button type="submit" className="login-submit-btn" id="forgot-send-btn" disabled>Send OTP</button>
                  </form>
                </section>
      
                <section id="forgot-step-otp" className="forgot-step-panel" hidden>
                  <h1>Enter OTP</h1>
                  <p className="login-subtitle">We have shared a code to your registered email address.</p>
      
                  <form id="forgot-otp-form" className="login-form" noValidate>
                    <label>Verification Code</label>
                    <div className="login-otp-grid" id="otp-grid" aria-label="OTP code input">
                      <input type="text" maxLength="1" inputmode="numeric" className="login-otp-input" />
                      <input type="text" maxLength="1" inputmode="numeric" className="login-otp-input" />
                      <input type="text" maxLength="1" inputmode="numeric" className="login-otp-input" />
                      <input type="text" maxLength="1" inputmode="numeric" className="login-otp-input" />
                    </div>
                    <span className="login-error" id="forgot-otp-error" aria-live="polite"></span>
      
                    <button type="submit" className="login-submit-btn" id="forgot-verify-btn" disabled>Verify</button>
                  </form>
                </section>
      
                <section id="forgot-step-reset" className="forgot-step-panel" hidden>
                  <h1>Reset Password</h1>
                  <p className="login-subtitle">Create a new password for your account.</p>
      
                  <form id="forgot-reset-form" className="login-form" noValidate>
                    <label htmlFor="forgot-new-password">New Password</label>
                    <div className="login-password-wrap">
                      <input id="forgot-new-password" type="password" className="login-password-field" placeholder="Enter new password" autoComplete="new-password" />
                      <button type="button" className="login-password-toggle" id="forgot-new-password-toggle" aria-label="Show password">
                        <i className="bx bx-hide"></i>
                      </button>
                    </div>
                    <span className="login-error" id="forgot-new-password-error" aria-live="polite"></span>
      
                    <label htmlFor="forgot-confirm-password">Confirm Password</label>
                    <div className="login-password-wrap">
                      <input id="forgot-confirm-password" type="password" className="login-password-field" placeholder="Confirm new password" autoComplete="new-password" />
                      <button type="button" className="login-password-toggle" id="forgot-confirm-password-toggle" aria-label="Show password">
                        <i className="bx bx-hide"></i>
                      </button>
                    </div>
                    <span className="login-error" id="forgot-confirm-password-error" aria-live="polite"></span>
      
                    <button type="submit" className="login-submit-btn" id="forgot-reset-btn" disabled>Update Password</button>
                  </form>
                </section>
              </div>
            </section>
          </main>
      
          <div className="login-success-modal" id="forgot-success-modal" hidden>
            <div className="login-success-card" role="dialog" aria-modal="true" aria-labelledby="forgot-success-title">
              <h3 id="forgot-success-title">Password Changed Successfully</h3>
              <p>Your password has been updated successfully.</p>
              <a href="/userpage/login.html" className="login-submit-btn login-success-action">Back to Login</a>
            </div>
          </div>
    </>
  );
}
