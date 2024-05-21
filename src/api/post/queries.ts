import { createQuery } from 'react-query-kit';

import { getAllPostRequest } from './requests';
import { type IGetAllPostParams, type IGetAllPostResponse } from './types';

export const useGetAllPostQuery = createQuery<IGetAllPostResponse, IGetAllPostParams>({
  primaryKey: 'api/v1/post',
  queryFn: ({ queryKey: [, params] }) => getAllPostRequest(params),
});
