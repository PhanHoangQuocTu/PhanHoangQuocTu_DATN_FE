import { createQuery } from 'react-query-kit';

import { getAllUserRequest, getUserDetailRequest, isAdminRequest } from './requests';
import {
  type IGetAllUserParams,
  type IGetAllUserResponse,
  type IIsAdminParams,
  type IIsAdminResponse,
  type IUserDetailParams,
  type IUserDetailResponse,
} from './types';

export const useIsAdminQuery = createQuery<IIsAdminResponse, IIsAdminParams>({
  primaryKey: '/api/v1/user/isAdmin',
  queryFn: ({ queryKey: [, params] }) => isAdminRequest(params),
});

export const useGetAllUserQuery = createQuery<IGetAllUserResponse, IGetAllUserParams>({
  primaryKey: '/api/v1/user',
  queryFn: ({ queryKey: [, params] }) => getAllUserRequest(params),
});

export const useGetUserDetailQuery = createQuery<IUserDetailResponse, IUserDetailParams>({
  primaryKey: '/api/v1/user',
  queryFn: ({ queryKey: [, params] }) => getUserDetailRequest(params),
});
