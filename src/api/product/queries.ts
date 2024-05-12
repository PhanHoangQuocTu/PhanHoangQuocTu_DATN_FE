import { createQuery } from 'react-query-kit';

import { getAllProductRequest } from './requests';
import { type IGetAllProductParams, type IGetAllProductResponse } from './types';

export const useGetAllProductQuery = createQuery<IGetAllProductResponse, IGetAllProductParams>({
  primaryKey: 'api/v1/products',
  queryFn: ({ queryKey: [, params] }) => getAllProductRequest(params),
});
