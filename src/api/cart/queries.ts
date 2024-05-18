import { createQuery } from 'react-query-kit';

import { getCartByCurrentUserRequest } from './requests';
import { type IGetCartByCurrentUserResponse } from './types';

export const useGetCartByCurrentUserQuery = createQuery<IGetCartByCurrentUserResponse>({
  primaryKey: '/api/v1/cart/user',
  queryFn: ({ queryKey: [,] }) => getCartByCurrentUserRequest(),
});
