import type { QueryHookOptions } from 'react-query-kit';

import type { IUser } from '@/api/auth';

export const useUser = (options?: QueryHookOptions<IUser, Error, IUser, any> | undefined) => {
  return {};
};
