import axios from 'axios';

import { env } from '@/lib/const';

import { request } from '../axios';
import type {
  IChangePasswordRequest,
  IChangePasswordResponse,
  IDeleteUserParams,
  IDeleteUserResponse,
  IEditProfileRequest,
  IEditProfileResponse,
  IFollowUserParams,
  IFollowUserResponse,
  IGetAllUserParams,
  IGetAllUserResponse,
  IIsAdminParams,
  IIsAdminResponse,
  ISendVerifyCodeResponse,
  IUserDetailParams,
  IUserDetailResponse,
  IVerifyAccountRequest,
  IVerifyAccountResponse,
} from './types';

export const isAdminRequest = async (params: IIsAdminParams): Promise<IIsAdminResponse> => {
  const { data } = await axios.get(`${env.API_URL}/api/v1/user/isAdmin`, {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });

  return data;
};

export const getAllUserRequest = async (params: IGetAllUserParams): Promise<IGetAllUserResponse> => {
  const { data } = await request({
    url: '/api/v1/user',
    method: 'GET',
    params,
  });

  return data;
};

export const deleteUserRequest = async (params: IDeleteUserParams): Promise<IDeleteUserResponse> => {
  const { data } = await request({
    url: `/api/v1/user/${params.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};

export const getUserDetailRequest = async (params: IUserDetailParams): Promise<IUserDetailResponse> => {
  const { data } = await request({
    url: `/api/v1/user/${params.id}`,
    method: 'GET',
    params,
  });

  return data;
};

export const editProfileRequest = async (body: IEditProfileRequest): Promise<IEditProfileResponse> => {
  const { data } = await request({
    url: '/api/v1/user/edit-profile',
    method: 'PATCH',
    data: body,
  });

  return data;
};

export const changePasswordRequest = async (body: IChangePasswordRequest): Promise<IChangePasswordResponse> => {
  const { data } = await request({
    url: '/api/v1/user/change-password',
    method: 'POST',
    data: body,
  });

  return data;
};

export const sendVerifyCodeRequest = async (): Promise<ISendVerifyCodeResponse> => {
  const { data } = await request({
    url: '/api/v1/user/generate-verify-code',
    method: 'POST',
  });

  return data;
};

export const verifyAccountRequest = async (body: IVerifyAccountRequest): Promise<IVerifyAccountResponse> => {
  const { data } = await request({
    url: '/api/v1/user/activate-user',
    method: 'POST',
    data: body,
  });

  return data;
};

export const getUserPerDayRequest = async (params: IFollowUserParams): Promise<IFollowUserResponse> => {
  const { data } = await request({
    url: '/api/v1/user/new-users-count-per-day',
    method: 'GET',
    params,
  });

  return data;
};
