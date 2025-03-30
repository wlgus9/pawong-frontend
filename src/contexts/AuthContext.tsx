import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import { refreshToken } from '../utils/api/core';
import auth from '../utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshTokenPeriodically: () => void;
  stopTokenRefresh: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let refreshInterval: NodeJS.Timeout | null = null;

  const checkAuthStatus = useCallback(async () => {
    try {
      const tokens = await auth.getTokens();
      setIsAuthenticated(!!tokens?.token);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const refreshTokenPeriodically = useCallback(async () => {
    // 기존 인터벌이 있다면 제거
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    // 토큰 갱신 함수
    const performTokenRefresh = async () => {
      const tokens = await auth.getTokens();
      if (!tokens?.token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await refreshToken();
      if (response.success && response.data) {
        await auth.saveTokens(response.data.data.accessToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    // 최초 실행
    await performTokenRefresh();

    // 55분마다 토큰 갱신 (액세스 토큰 만료 시간이 1시간이므로)
    refreshInterval = setInterval(performTokenRefresh, 55 * 60 * 1000);
  }, []);

  const stopTokenRefresh = useCallback(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
    setIsAuthenticated(false);
  }, []);

  // 컴포넌트 언마운트 시 인터벌 정리
  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isLoading, 
        refreshTokenPeriodically, 
        stopTokenRefresh,
        checkAuthStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 