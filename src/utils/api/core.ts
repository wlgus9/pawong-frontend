import ApiConfig from '../../config/api';
import auth from '../auth';

export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = async (error: any = null) => {
  const tokens = await auth.getTokens();
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(tokens?.token || '');
    }
  });
  failedQueue = [];
};

export const refreshToken = async () => {
  try {
    const tokens = await auth.getTokens();
    if (!tokens?.token) {
      return undefined;
    }

    const response = await fetch(`${ApiConfig.baseUrl}${ApiConfig.endpoints.auth.reissue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: tokens.token,
      }),
    });

    if (!response.ok) {
      return undefined;
    }

    return response.json();
  } catch (error) {
    console.error('토큰 재발급 중 오류:', error);
    return undefined;
  }
};

export const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<T | undefined> => {
  try {
    const tokens = await auth.getTokens();
    const isAuthRequired = !endpoint.includes('/login') && !endpoint.includes('/signup');

    const headers = {
      'Content-Type': 'application/json',
      ...(isAuthRequired && tokens?.token ? { Authorization: `Bearer ${tokens.token}` } : {}),
      ...(options.headers || {}),
    };

    const response = await fetch(`${ApiConfig.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    console.log(`API 응답 (${endpoint}):`, data);

    if (!response.ok) {
      console.error(`API 에러 (${endpoint}):`, data.message || 'API 요청 실패');
      return undefined;
    }

    return data;
  } catch (error) {
    console.error(`API 에러 (${endpoint}):`, error instanceof Error ? error.message : '알 수 없는 에러');
    return undefined;
  }
}; 