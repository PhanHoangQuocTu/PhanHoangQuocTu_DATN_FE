import { createQuery } from 'react-query-kit';

import { getMyOrdersRequest } from './requests';
import { type IGetMyOrderParams, type IGetMyOrdersResponse } from './types';

export const useGetMyOrdersQuery = createQuery<IGetMyOrdersResponse, IGetMyOrderParams>({
  primaryKey: '/api/v1/orders/user/me',
  queryFn: ({ queryKey: [, params] }) => getMyOrdersRequest(params),
});
