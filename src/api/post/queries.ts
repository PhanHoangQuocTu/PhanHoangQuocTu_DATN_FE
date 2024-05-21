import { createQuery } from 'react-query-kit';

import { getAllPostByMeRequest, getAllPostRequest } from './requests';
import {
  type IGetAllPostByMeParams,
  type IGetAllPostByMeResponse,
  type IGetAllPostParams,
  type IGetAllPostResponse,
} from './types';

export const useGetAllPostQuery = createQuery<IGetAllPostResponse, IGetAllPostParams>({
  primaryKey: 'api/v1/post',
  queryFn: ({ queryKey: [, params] }) => getAllPostRequest(params),
});

export const useGetAllPostByMeQuery = createQuery<IGetAllPostByMeResponse, IGetAllPostByMeParams>({
  primaryKey: 'api/v1/post/me',
  queryFn: ({ queryKey: [, params] }) => getAllPostByMeRequest(params),
});
