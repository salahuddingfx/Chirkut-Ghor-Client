import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('guest');
  const logoutTimerRef = useRef(null);

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const logout = useCallback(() => {
    clearLogoutTimer();
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    setRole('guest');
  }, [clearLogoutTimer]);

  const scheduleAutoLogout = useCallback((expiresInSeconds) => {
    clearLogoutTimer();
    const ms = expiresInSeconds * 1000;
    logoutTimerRef.current = setTimeout(() => {
      console.log('⏰ Session expired, auto logging out...');
      logout();
      window.location.href = '/login?expired=1';
    }, ms);
  }, [clearLogoutTimer, logout]);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get('/api/users/profile');
      const userData = response.data;
      setUser(userData);
      setIsAuthenticated(true);
      setRole(userData.role || 'user');

      const storedExpiry = localStorage.getItem('tokenExpiry');
      if (storedExpiry) {
        const remainingMs = Number(storedExpiry) - Date.now();
        if (remainingMs <= 0) {
          console.log('⏰ Token already expired');
          logout();
          return;
        }
        scheduleAutoLogout(remainingMs / 1000);
      } else {
        const isAdmin = userData.role === 'admin' || userData.role === 'super_admin';
        scheduleAutoLogout(isAdmin ? 3600 : 86400);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout, scheduleAutoLogout]);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await checkAuthStatus();
      } else {
        setRole('guest');
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => clearLogoutTimer();
  }, [checkAuthStatus, clearLogoutTimer]);

  const login = async (emailOrUsername, password) => {
    const response = await axios.post('/api/auth/login', { email: emailOrUsername, password });
    const { token, expiresIn, ...userData } = response.data;
    localStorage.setItem('token', token);

    const expiryTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('tokenExpiry', String(expiryTime));

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    setIsAuthenticated(true);
    setRole(userData.role || 'user');

    scheduleAutoLogout(expiresIn);

    return userData;
  };

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData);
    const { token, expiresIn, ...user } = response.data;
    localStorage.setItem('token', token);

    const expiryTime = Date.now() + (expiresIn * 1000);
    localStorage.setItem('tokenExpiry', String(expiryTime));

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    setIsAuthenticated(true);
    setRole(user.role || 'user');

    scheduleAutoLogout(expiresIn);

    return user;
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    role,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
