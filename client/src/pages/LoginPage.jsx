import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(location.state?.from || '/', { replace: true });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <main className="auth-card login-card">
        <div className="auth-lock">♧</div>
        <h1>Welcome Back</h1>
        <p className="auth-intro">Sign in to continue shopping and keep track of your<br className="desktop-only" /> orders.</p>
        <div className="auth-divider"><span>SIGN IN WITH YOUR ACCOUNT</span></div>
        <form className="auth-form" onSubmit={submit}>
          <label>Email Address<input autoComplete="email" placeholder="name@example.com" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label className="password-label">Password <Link to="/forgot-password">Forgot your password?</Link><input autoComplete="current-password" placeholder="Enter your password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <label className="check-row"><input type="checkbox" defaultChecked /> <span>Remember me for 30 days</span></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign In →'}</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create an account</Link></p>
        <div className="login-trust"><span>◉ 256-Bit SSL</span><i>•</i><span>♧ Instant Order Sync</span><i>•</i><span>♢ Data Protected</span></div>
      </main>
    </div>
  );
}

export default LoginPage;
