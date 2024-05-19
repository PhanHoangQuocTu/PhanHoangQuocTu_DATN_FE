import { request } from '../axios';
import {
  type ICancelOrderParams,
  type ICancelOrderResponse,
  type ICreateOrderRequest,
  type ICreateOrderResponse,
  type IGetMyOrderParams,
  type IGetMyOrdersResponse,
} from './types';

export const createOrderRequest = async (body: ICreateOrderRequest): Promise<ICreateOrderResponse> => {
  const { data } = await request({
    url: '/api/v1/orders',
    method: 'POST',
    data: body,
  });

  return data;
};

export const getMyOrdersRequest = async (params: IGetMyOrderParams): Promise<IGetMyOrdersResponse> => {
  const { data } = await request({
    url: '/api/v1/orders/user/me',
    method: 'GET',
    params,
  });

  return data;
};

export const cancelOrdersRequest = async (params: ICancelOrderParams): Promise<ICancelOrderResponse> => {
  const { data } = await request({
    url: `/api/v1/orders/cancel/${params.id}`,
    method: 'PUT',
    params,
  });

  return data;
};
