import { ApiConfig } from '../../config/api';
import { UserType } from '../../types/navigation';
import auth from '../auth';
import { fetchApi } from './core';

interface SignupParams {
  email: string;
  password: string;
  userName: string;
  phone: string;
  userType: UserType;
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

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetchApi<LoginResponse>(ApiConfig.endpoints.auth.login, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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