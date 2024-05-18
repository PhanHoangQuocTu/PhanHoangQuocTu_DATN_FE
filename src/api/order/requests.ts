import { request } from '../axios';
import { type ICreateOrderRequest, type ICreateOrderResponse } from './types';

export const createOrderRequest = async (body: ICreateOrderRequest): Promise<ICreateOrderResponse> => {
  const { data } = await request({
    url: '/api/v1/orders',
    method: 'POST',
    data: body,
  });

  return data;
};
