import useLoginBehavior from "../hooks/useLoginBehavior";
import useWhatsAppWidget from "../hooks/useWhatsAppWidget";

export default function LoginPage() {
  useLoginBehavior();
  useWhatsAppWidget();
  return (
    <>
      <main className="login-layout">
            <section className="login-visual" aria-hidden="true">
              <img src="../Images/image 41.png" alt="Fashion model" className="login-visual-image" />
              <div className="login-visual-overlay">
                <h2>Premium African Fabrics</h2>
                <p>Sign in to continue shopping the best collections.</p>
              </div>
            </section>
      
            <section className="login-pane">
              <div className="login-card">
                <img src="../Images/logo.png" alt="Taye's Fabrics Logo" className="login-mobile-logo" />
                <h1>Welcome <span aria-hidden="true">👋</span></h1>
                <p className="login-subtitle">Please login here</p>
      
                <form id="login-form" className="login-form" noValidate>
                  <label htmlFor="login-email">Email Address</label>
                  <input id="login-email" type="email" name="email" placeholder="robertfox@example.com" autoComplete="email" />
                  <span className="login-error" id="login-email-error" aria-live="polite"></span>
      
                  <label htmlFor="login-password">Password</label>
                  <div className="login-password-wrap">
                    <input id="login-password" className="login-password-field" type="password" name="password" placeholder="Enter your password" autoComplete="current-password" />
                    <button type="button" className="login-password-toggle" id="login-password-toggle" aria-label="Show password">
                      <i className="bx bx-hide"></i>
                    </button>
                  </div>
                  <span className="login-error" id="login-password-error" aria-live="polite"></span>
      
                  <div className="login-row">
                    <label className="login-remember">
                      <input id="remember-me" type="checkbox" />
                      <span>Remember Me</span>
                    </label>
                    <a href="/userpage/forgot-password.html" className="login-forgot">Forgot Password?</a>
                  </div>
      
                  <button type="submit" className="login-submit-btn" id="login-submit-btn" disabled>Login</button>
      
                  <p className="login-signup-row">
                    Don't have an account? <a href="/userpage/signup.html">Sign up</a>
                  </p>
                </form>
              </div>
            </section>
          </main>
    </>
  );
}
