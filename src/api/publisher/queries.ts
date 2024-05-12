import { createQuery } from 'react-query-kit';

import { getAllPublisherRequest, getDetailPublisherRequest } from './requests';
import {
  type IGetAllPublisherParams,
  type IGetAllPublisherResponse,
  type IGetPublisherDetailParams,
  type IGetPublisherDetailResponse,
} from './types';

export const useGetAllPublisherQuery = createQuery<IGetAllPublisherResponse, IGetAllPublisherParams>({
  primaryKey: 'api/v1/publisher',
  queryFn: ({ queryKey: [, params] }) => getAllPublisherRequest(params),
});

export const useGetDetailPublisherQuery = createQuery<IGetPublisherDetailResponse, IGetPublisherDetailParams>({
  primaryKey: 'api/v1/publisher/:id',
  queryFn: ({ queryKey: [, params] }) => getDetailPublisherRequest(params),
});
