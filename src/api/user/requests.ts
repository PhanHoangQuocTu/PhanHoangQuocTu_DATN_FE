import axios from 'axios';

import { env } from '@/lib/const';

import { request } from '../axios';
import type { IGetAllUserParams, IGetAllUserResponse, IIsAdminParams, IIsAdminResponse } from './types';

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
