import { request } from '../axios';
import {
  type ICancelOrderParams,
  type ICancelOrderResponse,
  type ICreateOrderRequest,
  type ICreateOrderResponse,
  type IGetAllOrderParams,
  type IGetAllOrderResponse,
  type IGetMonthlyReportParams,
  type IGetMonthlyReportResponse,
  type IGetMyOrderParams,
  type IGetMyOrdersResponse,
  type IGetVnPayUrlParams,
  type IGetVnPayUrlRequest,
  type IGetVnPayUrlResponse,
  type IUpdateStatusOrderParams,
  type IUpdateStatusOrderRequest,
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

export const getAllOrderRequest = async (params: IGetAllOrderParams): Promise<IGetAllOrderResponse> => {
  const { data } = await request({
    url: '/api/v1/orders',
    method: 'GET',
    params,
  });

  return data;
};

export const updateStatusOrdersRequest = async (req: {
  params: IUpdateStatusOrderParams;
  body: IUpdateStatusOrderRequest;
}): Promise<ICancelOrderResponse> => {
  const { data } = await request({
    url: `/api/v1/orders/${req?.params?.id}`,
    method: 'PUT',
    params: req?.params,
    data: req?.body,
  });

  return data;
};

export const getMonthlyReportRequest = async (params: IGetMonthlyReportParams): Promise<IGetMonthlyReportResponse> => {
  const { data } = await request({
    url: '/api/v1/orders/monthly-revenue',
    method: 'GET',
    params,
  });

  return data;
};

export const getVnPayUrlRequest = async (req: {
  params: IGetVnPayUrlParams;
  body: IGetVnPayUrlRequest;
}): Promise<IGetVnPayUrlResponse> => {
  const { data } = await request({
    url: '/api/v1/orders//create-checkout-vnpay',
    method: 'POST',
    params: req?.params,
    data: req?.body,
  });

  return data;
};
