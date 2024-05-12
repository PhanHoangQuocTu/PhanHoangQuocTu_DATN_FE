import { request } from '../axios';
import {
  type ICreateProductRequest,
  type ICreateProductResponse,
  type IGetAllProductParams,
  type IGetAllProductResponse,
} from './types';

export const getAllProductRequest = async (params: IGetAllProductParams): Promise<IGetAllProductResponse> => {
  const { data } = await request({
    url: '/api/v1/products',
    method: 'GET',
    params,
  });

  return data;
};

export const createProductRequest = async (body: ICreateProductRequest): Promise<ICreateProductResponse> => {
  const { data } = await request({
    url: '/api/v1/products',
    method: 'POST',
    data: body,
  });

  return data;
};
