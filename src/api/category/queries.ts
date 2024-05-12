import { createQuery } from 'react-query-kit';

import { getAllCategoryRequest, getDetailCategoryRequest } from './requests';
import {
  type IGetAllCategoryParams,
  type IGetAllCategoryResponse,
  type IGetDetailCategoryParams,
  type IGetDetailCategoryResponse,
} from './types';

export const useGetAllCategoryQuery = createQuery<IGetAllCategoryResponse, IGetAllCategoryParams>({
  primaryKey: 'api/v1/category',
  queryFn: ({ queryKey: [, params] }) => getAllCategoryRequest(params),
});

export const useGetDetailCategoryQuery = createQuery<IGetDetailCategoryResponse, IGetDetailCategoryParams>({
  primaryKey: 'api/v1/category/:id',
  queryFn: ({ queryKey: [, params] }) => getDetailCategoryRequest(params),
});
