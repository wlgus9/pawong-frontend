import ApiConfig from '../../config/api';
import auth from '../auth';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: number;
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

    const response = await fetch(`${ApiConfig.baseURL}${ApiConfig.endpoints.auth.reissue}`, {
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

export const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | undefined> => {
  try {
    // 로그인과 회원가입을 제외한 모든 요청에 인증 필요
    const isAuthRequired = !endpoint.includes('/auth/login') && !endpoint.includes('/auth/signup');
    const tokens = await auth.getTokens();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (isAuthRequired) {
      if (!tokens?.token) {
        return undefined;
      }
      headers['Authorization'] = `Bearer ${tokens.token}`;
    }

    const response = await fetch(`${ApiConfig.baseURL}${endpoint}`, {
      headers,
      ...options,
    });

    if (response.status === 401 && !isRefreshing && isAuthRequired) {
      isRefreshing = true;
      try {
        const refreshResponse = await refreshToken();
        if (refreshResponse?.data?.accessToken) {
          await auth.saveTokens(refreshResponse.data.accessToken);
          processQueue();
          return fetchApi(endpoint, options);
        } else {
          processQueue(new Error('토큰 재발급 실패'));
          return undefined;
        }
      } catch (error) {
        processQueue(error);
        return undefined;
      } finally {
        isRefreshing = false;
      }
    }

    const data = await response.json();
    return response.ok ? data : undefined;
  } catch (error) {
    console.error('API 호출 중 오류:', error);
    return undefined;
  }
}; 