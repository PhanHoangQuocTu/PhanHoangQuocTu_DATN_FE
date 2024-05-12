import { createQuery } from 'react-query-kit';

import { getAllProductRequest, getDetailProductRequest } from './requests';
import {
  type IGetAllProductParams,
  type IGetAllProductResponse,
  type IGetDetailBookParams,
  type IGetDetailBookResponse,
} from './types';

export const useGetAllProductQuery = createQuery<IGetAllProductResponse, IGetAllProductParams>({
  primaryKey: 'api/v1/products',
  queryFn: ({ queryKey: [, params] }) => getAllProductRequest(params),
});

export const useGetDetailProductQuery = createQuery<IGetDetailBookResponse, IGetDetailBookParams>({
  primaryKey: 'api/v1/products/:id',
  queryFn: ({ queryKey: [, params] }) => getDetailProductRequest(params),
});
