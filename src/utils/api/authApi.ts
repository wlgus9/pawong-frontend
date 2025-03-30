import { ApiConfig } from '../../config/api';
import { UserType } from '../../types/navigation';
import auth from '../auth';
import { fetchApi } from './core';
import { cache, CACHE_KEYS } from '../cache';

interface SignupParams {
  email: string;
  password: string;
  userName: string;
  phone: string;
  userType: string;
}

interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
  };
}

interface ApiResponse {
  code: number;
  message: string;
  data: any;
}

interface EmailCheckResponse {
  code: number;
  message: string;
}

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log('로그인 시도:', { email });
    
    const response = await fetchApi<LoginResponse>(ApiConfig.endpoints.auth.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    console.log('로그인 응답:', response);

    if (response?.code === 200 && response.data?.accessToken) {
      const token = response.data.accessToken;
      console.log('저장할 토큰:', token);
      return await auth.saveTokens(token);
    }

    return false;
  } catch (error) {
    console.error('로그인 에러:', error);
    return false;
  }
};

export const signup = async (params: SignupParams): Promise<boolean> => {
  try {
    const requestBody = {
      ...params,
      userType: Number(params.userType),
    };

    const response = await fetchApi<ApiResponse>(ApiConfig.endpoints.auth.signup, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    return response?.code === 200;
  } catch (error) {
    console.error('회원가입 에러:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await fetchApi<ApiResponse>(ApiConfig.endpoints.auth.logout, {
      method: 'POST',
    });

    if (response?.code === 200) {
      // 로그아웃 시 사용자 정보 캐시 제거
      await cache.remove(CACHE_KEYS.USER_INFO);
      return true;
    }

    return false;
  } catch (error) {
    console.error('로그아웃 에러:', error);
    return false;
  }
};

export const checkEmail = async (email: string): Promise<EmailCheckResponse | undefined> => {
  try {
    const response = await fetchApi<EmailCheckResponse>(ApiConfig.endpoints.auth.checkEmail + `?email=${encodeURIComponent(email)}`, {
      method: 'GET'
    });
    return response;
  } catch (error) {
    console.error('이메일 중복 확인 에러:', error);
    return undefined;
  }
}; 