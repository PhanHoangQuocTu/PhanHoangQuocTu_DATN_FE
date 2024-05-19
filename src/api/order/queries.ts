import { createQuery } from 'react-query-kit';

import { getAllOrderRequest, getMyOrdersRequest } from './requests';
import {
  type IGetAllOrderParams,
  type IGetAllOrderResponse,
  type IGetMyOrderParams,
  type IGetMyOrdersResponse,
} from './types';

export const useGetMyOrdersQuery = createQuery<IGetMyOrdersResponse, IGetMyOrderParams>({
  primaryKey: '/api/v1/orders/user/me',
  queryFn: ({ queryKey: [, params] }) => getMyOrdersRequest(params),
});

export const useGetAllOrdersQuery = createQuery<IGetAllOrderResponse, IGetAllOrderParams>({
  primaryKey: '/api/v1/orders',
  queryFn: ({ queryKey: [, params] }) => getAllOrderRequest(params),
});
