import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiUrl } from '../api.js';

const AuthContext = createContext(null);
const SESSION_KEY = 'cartivo.auth.session';

function readStoredSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return session?.token && session?.user ? session : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  useEffect(() => {
    if (!session?.token) return;
    fetch(apiUrl('/api/auth/me'), { headers: { Authorization: `Bearer ${session.token}` } })
      .then(async (response) => {
        if (!response.ok) throw new Error('Session expired');
        const data = await response.json();
        const refreshed = { token: session.token, user: data.user };
        localStorage.setItem(SESSION_KEY, JSON.stringify(refreshed));
        setSession(refreshed);
      })
      .catch(() => {
        localStorage.removeItem(SESSION_KEY);
        setSession(null);
      });
  }, []);

  const saveSession = (nextSession) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    return nextSession.user;
  };

  const authenticate = async (action, values) => {
    const response = await fetch(apiUrl(`/api/auth/${action}`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'We could not complete your request. Please try again.');
    saveSession({ token: data.token, user: data.user });
    return data.user;
  };

  const login = (values) => authenticate('login', values);
  const register = (values) => authenticate('register', values);
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  const value = useMemo(() => ({ user: session?.user || null, token: session?.token || null, login, register, logout }), [session]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
