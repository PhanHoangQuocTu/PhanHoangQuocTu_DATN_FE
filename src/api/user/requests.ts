import axios from 'axios';

import { env } from '@/lib/const';

import type { IIsAdminParams, IIsAdminResponse } from './types';

export const isAdminRequest = async (params: IIsAdminParams): Promise<IIsAdminResponse> => {
  const { data } = await axios.get(`${env.API_URL}/api/v1/user/isAdmin`, {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });

  return data;
};
