import { request } from '../axios';
import { type IGetAddressParams, type IGetAddressResponse, type IGetProvinceResponse } from './types';

export const getProvinceRequest = async (): Promise<IGetProvinceResponse> => {
  const { data } = await request({
    url: '/api/v1/metadata/provinces',
    method: 'GET',
  });

  return data;
};

export const getAddressRequest = async (params: IGetAddressParams): Promise<IGetAddressResponse> => {
  const { data } = await request({
    url: `/api/v1/metadata/${params.address}`,
    method: 'GET',
    params,
  });

  return data;
};
