import { createQuery } from 'react-query-kit';

import {
  getAllUserDeletedRequest,
  getAllUserRequest,
  getUserDetailRequest,
  getUserPerDayRequest,
  isAdminRequest,
} from './requests';
import {
  type IFollowUserParams,
  type IFollowUserResponse,
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
  primaryKey: '/api/v1/user/:id',
  queryFn: ({ queryKey: [, params] }) => getUserDetailRequest(params),
});

export const useGetUserPerDayQuery = createQuery<IFollowUserResponse, IFollowUserParams>({
  primaryKey: '/api/v1/user/new-users-count-per-day',
  queryFn: ({ queryKey: [, params] }) => getUserPerDayRequest(params),
});

export const useGetAllUserDeletedQuery = createQuery<IGetAllUserResponse, IGetAllUserParams>({
  primaryKey: '/api/v1/user/deleted',
  queryFn: ({ queryKey: [, params] }) => getAllUserDeletedRequest(params),
});
