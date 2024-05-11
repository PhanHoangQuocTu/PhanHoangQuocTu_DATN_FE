import { request } from '../axios';
import type {
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenRequest,
  IRefreshTokenResponse,
  IRegisterRequest,
  IRegisterResponse,
} from './types';

export const loginRequest = async (body: ILoginRequest): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/sign-in',
    method: 'POST',
    data: body,
  });

  return data;
};

export const registerRequest = async (body: IRegisterRequest): Promise<IRegisterResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/sign-up',
    method: 'POST',
    data: body,
  });

  return data;
};

export const refreshTokenRequest = async (body: IRefreshTokenRequest): Promise<IRefreshTokenResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/refresh-token',
    method: 'POST',
    data: body,
  });

  return data;
};
