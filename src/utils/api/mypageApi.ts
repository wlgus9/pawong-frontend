import { ApiConfig } from '../../config/api';
import { UserInfo, UserInfoResponse } from '../../types/api';
import { cache, CACHE_KEYS } from '../cache';
import { fetchApi } from './core';

interface ApiResponse {
  code: number;
  message: string;
  data: any;
}

export const fetchUserInfo = async (): Promise<UserInfoResponse | undefined> => {
  try {
    const cachedData = await cache.get<UserInfoResponse>(CACHE_KEYS.USER_INFO);
    if (cachedData) {
      console.log('캐시된 사용자 정보:', cachedData);
      return cachedData;
    }

    console.log('사용자 정보 요청 시작');
    const response = await fetchApi<ApiResponse>(ApiConfig.endpoints.mypage.userInfo, {
      method: 'GET',
    });
    console.log('사용자 정보 응답:', response);

    if (response?.code === 200) {
      const userInfoResponse: UserInfoResponse = {
        code: response.code,
        message: response.message,
        data: response.data
      };
      await cache.set(CACHE_KEYS.USER_INFO, userInfoResponse);
      return userInfoResponse;
    }

    return undefined;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    return undefined;
  }
};

export const updateNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await fetchApi<ApiResponse>(ApiConfig.endpoints.mypage.updateNickname, {
      method: 'PUT',
      body: JSON.stringify({ nickname }),
    });

    if (response?.code === 200) {
      await cache.remove(CACHE_KEYS.USER_INFO);
      return true;
    }

    return false;
  } catch (error) {
    console.error('닉네임 업데이트 실패:', error);
    return false;
  }
};

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const response = await fetchApi<ApiResponse>(ApiConfig.endpoints.mypage.deleteAccount, {
      method: 'DELETE',
    });

    return response?.code === 200;
  } catch (error) {
    console.error('계정 삭제 실패:', error);
    return false;
  }
}; 