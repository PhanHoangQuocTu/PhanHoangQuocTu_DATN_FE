import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import Router from 'next/router';
import { toast } from 'sonner';

import { env } from '@/lib/const';
import { useUserStore } from '@/stores';
import { ROUTE } from '@/types';

import { refreshTokenRequest } from './auth';

let isRefresh = false;

export const request = axios.create({
  baseURL: env.API_URL,
});

const onRefreshToken = async () => {
  const store = useUserStore.getState();
  const refreshToken = store?.refreshToken;

  if (refreshToken) {
    try {
      const { accessToken: newAccessToken } = await refreshTokenRequest({ refreshToken });
      store?.setAccessToken(newAccessToken);

      return newAccessToken;
    } catch (e) {
      Router.replace(ROUTE.HOME);
      store?.logout();
    }
  } else {
    if (Router.pathname !== ROUTE.HOME) {
      toast.error('Your session is expired, please try to login again');
      Router.replace(ROUTE.HOME);
    }
    store?.logout();
  }

  return null;
};

const handleSuccess = (res: AxiosResponse) => {
  return res;
};

const handleError = async (error: any) => {
  const originalRequest = error.config!;
  const data = error?.response?.data as any;
  const store = useUserStore.getState();
  const refreshToken = store?.refreshToken;
  const isLoggedIn = !!refreshToken;

  if (data?.statusCode === 403 && !isRefresh && isLoggedIn) {
    isRefresh = true;
    const token = await onRefreshToken();

    if (!token) {
      isRefresh = false;
    }
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    return request(originalRequest);
  }

  return Promise.reject(data?.meta || data || error);
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = useUserStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);
