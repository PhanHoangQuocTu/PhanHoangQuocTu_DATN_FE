import { createQuery } from 'react-query-kit';

import { getCommentByPostIdRequest } from './requests';
import { type IGetCommentByPostIdParams, type IGetCommentByPostIdResponse } from './types';

export const useGetCommentByPostIdQuery = createQuery<IGetCommentByPostIdResponse, IGetCommentByPostIdParams>({
  primaryKey: '/api/v1/comment/by-post/:id',
  queryFn: ({ queryKey: [, params] }) => getCommentByPostIdRequest(params),
});
