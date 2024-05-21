import { createQuery } from 'react-query-kit';

import { getAllOrderRequest, getMonthlyReportRequest, getMyOrdersRequest, getResultVnPaRequest } from './requests';
import {
  type IGetAllOrderParams,
  type IGetAllOrderResponse,
  type IGetMonthlyReportParams,
  type IGetMonthlyReportResponse,
  type IGetMyOrderParams,
  type IGetMyOrdersResponse,
  type IGetVNPAYReturnParams,
  type IGetVNPAYReturnResponse,
} from './types';

export const useGetMyOrdersQuery = createQuery<IGetMyOrdersResponse, IGetMyOrderParams>({
  primaryKey: '/api/v1/orders/user/me',
  queryFn: ({ queryKey: [, params] }) => getMyOrdersRequest(params),
});

export const useGetAllOrdersQuery = createQuery<IGetAllOrderResponse, IGetAllOrderParams>({
  primaryKey: '/api/v1/orders',
  queryFn: ({ queryKey: [, params] }) => getAllOrderRequest(params),
});

export const useGetMonthlyReportQuery = createQuery<IGetMonthlyReportResponse, IGetMonthlyReportParams>({
  primaryKey: '/api/v1/orders/monthly-revenue',
  queryFn: ({ queryKey: [, params] }) => getMonthlyReportRequest(params),
});

export const useGetResultVnPaQuery = createQuery<IGetVNPAYReturnResponse, IGetVNPAYReturnParams>({
  primaryKey: '/api/v1/orders/return_url',
  queryFn: ({ queryKey: [, params] }) => getResultVnPaRequest(params),
});
