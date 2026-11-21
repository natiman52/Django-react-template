import { useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContext } from './authContextDef';
import { getToken, getStoredUser, clearAuth } from '../utils/token';
import * as authApi from '../api/auth';

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUserState] = useState(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and verify user on mount
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const existingToken = getToken();
      if (!existingToken) {
        if (isMounted) {
          setUserState(null);
          setTokenState(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const currentUser = await authApi.getCurrentUser();
        if (isMounted) {
          setUserState(currentUser);
          setTokenState(existingToken);
        }
      } catch {
        if (isMounted) {
          clearAuth();
          setUserState(null);
          setTokenState(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);
    setTokenState(response.token);
    setUserState(response.user);
    return response;
  }, []);

  const register = useCallback(async (userData) => {
    const response = await authApi.register(userData);
    setTokenState(response.token);
    setUserState(response.user);
    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      setTokenState(null);
      setUserState(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const currentUser = await authApi.getCurrentUser();
    setUserState(currentUser);
    return currentUser;
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      isOwner: user?.status === 'owner',
      isWorker: user?.status === 'worker',
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
