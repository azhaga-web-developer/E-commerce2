import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setError('Please agree to the terms to create your account.');
      return;
    }
    setSubmitting(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
      navigate('/', { replace: true });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <main className="auth-card register-card">
        <div className="auth-lock" aria-hidden="true">♧</div>
        <h1>Create your account</h1>
        <p className="auth-intro">Join us for a more personal shopping experience.</p>
        <div className="auth-divider"><span>YOUR DETAILS</span></div>
        <form className="auth-form" onSubmit={submit}>
          <label>Full name<input autoComplete="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label>Email address<input autoComplete="email" placeholder="name@example.com" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input autoComplete="new-password" placeholder="At least 8 characters" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <label>Confirm password<input autoComplete="new-password" placeholder="Enter your password again" type="password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></label>
          <label className="check-row"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /> <span>I agree to the terms and privacy policy.</span></label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Create account →'}</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </main>
    </div>
  );
}

export default RegisterPage;
