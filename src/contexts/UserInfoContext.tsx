import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserInfo } from '../types/api';
import { fetchUserInfo } from '../utils/api/mypageApi';
import { cache, CACHE_KEYS } from '../utils/cache';

interface UserInfoContextType {
  userInfo: UserInfo | null;
  isLoading: boolean;
  loadUserInfo: () => Promise<void>;
  setUserInfoData: (data: UserInfo) => void;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserInfo = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      
      // 캐시된 데이터가 있고 강제 새로고침이 아닌 경우 캐시된 데이터 사용
      if (!forceRefresh) {
        const cachedData = await cache.get<UserInfo>(CACHE_KEYS.USER_INFO);
        if (cachedData) {
          setUserInfo(cachedData);
          setIsLoading(false);
          return;
        }
      }

      const response = await fetchUserInfo();
      
      if (response?.code === 200 && response.data) {
        setUserInfo(response.data);
        // 응답 데이터를 캐시에 저장
        await cache.set(CACHE_KEYS.USER_INFO, response.data);
      }
    } catch (error) {
      console.error('사용자 정보 로딩 에러:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUserInfoData = useCallback((data: UserInfo) => {
    setUserInfo(data);
    // 데이터가 변경될 때마다 캐시 업데이트
    cache.set(CACHE_KEYS.USER_INFO, data);
  }, []);

  // 컴포넌트 마운트 시 캐시된 데이터 로드
  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  return (
    <UserInfoContext.Provider value={{ userInfo, isLoading, loadUserInfo, setUserInfoData }}>
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
} 