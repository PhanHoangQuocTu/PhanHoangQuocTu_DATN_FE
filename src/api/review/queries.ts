import { createQuery } from 'react-query-kit';

import { getReviewByBookIdRequest } from './requests';
import { type IGetReviewByBookIdParams, type IGetReviewByBookIdResponse } from './types';

export const useGetReviewByBookIdQuery = createQuery<IGetReviewByBookIdResponse, IGetReviewByBookIdParams>({
  primaryKey: '/api/v1/review/:id',
  queryFn: ({ queryKey: [, params] }) => getReviewByBookIdRequest(params),
});
