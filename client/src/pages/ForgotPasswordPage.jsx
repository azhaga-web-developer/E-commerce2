import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
  return (
    <div className="auth-page recovery-page">
      <div className="recovery-layout container">
        <main className="auth-card recovery-card">
          <Link className="back-link" to="/login">← Back to Sign In</Link>
          <span className="auth-kicker recovery-kicker">● ACCOUNT ACCESS</span>
          <div className="auth-lock">↻</div>
          <h1>Forgot Your Password?</h1>
          <p className="auth-intro">It happens. Enter your email address and we'll send you a link to reset<br className="desktop-only" /> your password.</p>
          <form className="auth-form">
            <label className="password-label">Email Address <small>Required</small><input placeholder="✉  arun.kumar@domain.com" type="email" /></label>
            <button className="auth-submit" type="submit">Send Reset Link ▷</button>
          </form>
          <div className="auth-divider"><span>OR PREFER INSTANT CODE?</span></div>
          <div className="mobile-otp-row"><span>▣</span><b>Reset via SMS OTP<small>Resend a 6-digit code to ••••••8921</small></b><button type="button">Use Mobile OTP ›</button></div>
          <div className="encryption">◉ 256-Bit SSL End-to-End Encryption <a href="#">Need Help? Contact Support ↗</a></div>
        </main>
        <aside className="recovery-aside">
          <div className="instructions-card"><span className="aside-icon">✉</span><small>CHECK YOUR INBOX <em>Just now</em></small><h2>Instructions Dispatched</h2><p>If an account exists with that email address, we've sent instructions and a secure 6-digit verification code to reset your password.</p><div className="resend-box">Didn't receive email? <a href="#">Resend in 44s</a><br /><small>Check your spam folder or verify whether you used your personal or work email.</small><br />↻ Click here to resend link</div></div>
          <div className="security-card"><h3>♧ Account Security Best Practices <small>Guide</small></h3><p>◉ <b>Time-sensitive:</b> The reset URL expires in 15 minutes for your protection.</p><p>◉ <b>One-time token:</b> Once used, this unique access link cannot be re-opened.</p><p>◉ <b>Never share:</b> Your URL and staff will never ask for your password or verification OTP.</p><div className="chat-box">♧ <b>Live Chat Available</b><small>Average wait time ~1 min</small><button type="button">Chat Now</button></div></div>
        </aside>
      </div>
      <section className="faq-card container"><h3>Frequently Asked Recovery Questions <a href="#">View all security FAQs →</a></h3><p>Common solutions when regaining access to your account.</p><div><article><b>♧ Lost Mobile Access?</b><span>Update your registered device through primary government ID verification.</span></article><article><b>♧ Active Sessions</b><span>Resetting your password automatically signs out any other open browsers.</span></article><article><b>✉ No Email in Inbox?</b><span>Allow up to 2–3 minutes or check for filters configured to custom corporate mailboxes.</span></article></div></section>
    </div>
  );
}

export default ForgotPasswordPage;
