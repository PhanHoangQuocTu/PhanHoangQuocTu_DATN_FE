import { createQuery } from 'react-query-kit';

import { isAdminRequest } from './requests';
import { type IIsAdminParams, type IIsAdminResponse } from './types';

export const useIsAdminQuery = createQuery<IIsAdminResponse, IIsAdminParams>({
  primaryKey: '/api/v1/user/isAdmin',
  queryFn: ({ queryKey: [, params] }) => isAdminRequest(params),
});
