import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { AuthContext } from './AuthContextObject.js';
import { authService } from '../services/authService.js';
import { userService } from '../services/userService.js';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('taskflow_token'));
  const [user, setUser] = useState(null);
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('taskflow_token');
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      logout();
      toast.error('Session expired. Please log in again.');
      navigate('/login', { replace: true });
    }
    window.addEventListener('taskflow:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('taskflow:unauthorized', handleUnauthorized);
  }, [logout, navigate]);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('taskflow_token', data.access_token);
    setToken(data.access_token);
    try {
      const me = await userService.getMe();
      setUser(me);
    } catch {
      // profile fetch failing shouldn't block login
    }
    return data;
  }, []);

  const register = useCallback(
    (name, email, password) => authService.register(name, email, password),
    []
  );

  const value = { token, user, setUser, isAuthenticated: Boolean(token), isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}