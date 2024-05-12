import { createQuery } from 'react-query-kit';

import { getAllAuthorRequest, getDetailAuthorRequest } from './requests';
import {
  type IGetAllAuthorParams,
  type IGetAllAuthorResponse,
  type IGetDetailAuthorParams,
  type IGetDetailAuthorResponse,
} from './types';

export const useGetAllAuthorQuery = createQuery<IGetAllAuthorResponse, IGetAllAuthorParams>({
  primaryKey: 'api/v1/author',
  queryFn: ({ queryKey: [, params] }) => getAllAuthorRequest(params),
});

export const useGetDetailAuthorQuery = createQuery<IGetDetailAuthorResponse, IGetDetailAuthorParams>({
  primaryKey: 'api/v1/author/:id',
  queryFn: ({ queryKey: [, params] }) => getDetailAuthorRequest(params),
});
