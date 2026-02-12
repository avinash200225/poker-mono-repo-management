import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const TOKEN_KEY = 'tournament_token';
const ADMIN_KEY = 'tournament_admin';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const admin = localStorage.getItem(ADMIN_KEY);
    if (token && admin) {
      try {
        setUser(JSON.parse(admin));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ADMIN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Login failed');
    }
    const { admin, token } = await res.json();
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    setUser(admin);
    return admin;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setUser(null);
  };

  const getHeaders = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const api = (path, options = {}) => {
    return fetch(path, {
      ...options,
      headers: { ...getHeaders(), 'Content-Type': 'application/json', ...options.headers },
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getHeaders, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
