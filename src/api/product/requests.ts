import { request } from '../axios';
import {
  type ICreateProductRequest,
  type ICreateProductResponse,
  type IDeleteProductParams,
  type IDeleteProductResponse,
  type IEditProductParams,
  type IEditProductRequest,
  type IEditProductResponse,
  type IGetAllProductParams,
  type IGetAllProductResponse,
  type IGetDetailBookParams,
  type IGetDetailBookResponse,
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

export const editProductRequest = async (req: {
  body: IEditProductRequest;
  params: IEditProductParams;
}): Promise<IEditProductResponse> => {
  const { data } = await request({
    url: `/api/v1/products/${req?.params?.id}`,
    method: 'PATCH',
    data: req?.body,
  });

  return data;
};

export const getDetailProductRequest = async (params: IGetDetailBookParams): Promise<IGetDetailBookResponse> => {
  const { data } = await request({
    url: `/api/v1/products/${params.id}`,
    method: 'GET',
    params,
  });

  return data;
};

export const deleteProductRequest = async (params: IDeleteProductParams): Promise<IDeleteProductResponse> => {
  const { data } = await request({
    url: `/api/v1/products/${params.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};
