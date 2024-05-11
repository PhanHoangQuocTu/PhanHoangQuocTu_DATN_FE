import { createQuery } from 'react-query-kit';

import { getAllUserRequest, isAdminRequest } from './requests';
import { type IGetAllUserParams, type IGetAllUserResponse, type IIsAdminParams, type IIsAdminResponse } from './types';

export const useIsAdminQuery = createQuery<IIsAdminResponse, IIsAdminParams>({
  primaryKey: '/api/v1/user/isAdmin',
  queryFn: ({ queryKey: [, params] }) => isAdminRequest(params),
});

export const useGetAllUserQuery = createQuery<IGetAllUserResponse, IGetAllUserParams>({
  primaryKey: '/api/v1/user',
  queryFn: ({ queryKey: [, params] }) => getAllUserRequest(params),
});
