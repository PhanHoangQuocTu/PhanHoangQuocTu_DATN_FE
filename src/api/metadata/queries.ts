import { createQuery } from 'react-query-kit';

import { getAddressRequest, getProvinceRequest } from './requests';
import { type IGetAddressParams, type IGetAddressResponse, type IGetProvinceResponse } from './types';

export const useGetProvinceQuery = createQuery<IGetProvinceResponse>({
  primaryKey: '/api/v1/metadata/provinces',
  queryFn: ({ queryKey: [,] }) => getProvinceRequest(),
});

export const useGetAddressQuery = createQuery<IGetAddressResponse, IGetAddressParams>({
  primaryKey: '/api/v1/metadata/address',
  queryFn: ({ queryKey: [, params] }) => getAddressRequest(params),
});
