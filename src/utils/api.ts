import ApiConfig from '../config/api';
import { UserType } from '../types/navigation';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface SignupParams {
  email: string;
  password: string;
  userName: string;
  phone: string;
  userType: UserType;
}

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${ApiConfig.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    return {
      success: response.ok,
      data: response.ok ? data : undefined,
      error: !response.ok ? data.message : undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
};

export const login = async (email: string, password: string) => {
  return fetchApi(ApiConfig.endpoints.login, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const signup = async (params: SignupParams): Promise<ApiResponse> => {
  const requestBody = {
    ...params,
    userType: Number(params.userType),
  };

  return fetchApi(ApiConfig.endpoints.signup, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
}; 