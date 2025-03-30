import { ApiConfig } from '../../config/api';
import { UserInfo, UserInfoResponse } from '../../types/api';
import { cache, CACHE_KEYS } from '../cache';
import { fetchApi } from './core';

interface ApiResponse {
  code: number;
  message: string;
  data: any;
}

export interface UpdateUserInfoRequest {
  nickName?: string;
  phone?: string;
  comment?: string;
}

interface UpdateUserInfoResponse {
  code: number;
  message: string;
  data: UserInfo;
}

export const fetchUserInfo = async () => {
  try {
    console.log('fetchUserInfo 요청 URL:', ApiConfig.endpoints.mypage.userInfo);
    const response = await fetchApi<UserInfoResponse>(ApiConfig.endpoints.mypage.userInfo, {
      method: 'GET',
    });

    console.log('fetchUserInfo 응답:', response);

    if (response?.code === 200) {
      return response;
    }

    console.log('fetchUserInfo 실패:', response);
    return undefined;
  } catch (error) {
    console.error('fetchUserInfo 에러:', error);
    return undefined;
  }
};

export const updateUserInfo = async (data: UpdateUserInfoRequest): Promise<UpdateUserInfoResponse | undefined> => {
  try {
    console.log('updateUserInfo 요청 URL:', ApiConfig.endpoints.mypage.updateUserInfo);
    console.log('updateUserInfo 요청 데이터:', data);
    
    const response = await fetchApi<UpdateUserInfoResponse>(ApiConfig.endpoints.mypage.updateUserInfo, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    console.log('updateUserInfo 응답:', response);

    if (response?.code === 200) {
      // 사용자 정보가 업데이트되면 캐시 삭제
      await cache.remove(CACHE_KEYS.USER_INFO);
      return response;
    }

    console.log('updateUserInfo 실패:', response);
    return undefined;
  } catch (error) {
    console.error('updateUserInfo 에러:', error);
    return undefined;
  }
};

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const response = await fetchApi<ApiResponse>(ApiConfig.endpoints.mypage.deleteAccount, {
      method: 'DELETE',
    });

    return response?.code === 200;
  } catch (error) {
    return false;
  }
}; 