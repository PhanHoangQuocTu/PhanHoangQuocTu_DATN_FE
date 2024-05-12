import { request } from '../axios';
import type {
  ICreateAuthorRequest,
  ICreateAuthorResponse,
  IDeleteAuthorParams,
  IDeleteAuthorResponse,
  IEditAuthorParams,
  IEditAuthorRequest,
  IEditAuthorResponse,
  IGetAllAuthorParams,
  IGetAllAuthorResponse,
  IGetDetailAuthorParams,
  IGetDetailAuthorResponse,
} from './types';

export const getAllAuthorRequest = async (params: IGetAllAuthorParams): Promise<IGetAllAuthorResponse> => {
  const { data } = await request({
    url: '/api/v1/authors',
    method: 'GET',
    params,
  });

  return data;
};

export const getDetailAuthorRequest = async (params: IGetDetailAuthorParams): Promise<IGetDetailAuthorResponse> => {
  const { data } = await request({
    url: `/api/v1/authors/${params.id}`,
    method: 'GET',
    params,
  });

  return data;
};

export const deleteAuthorRequest = async (params: IDeleteAuthorParams): Promise<IDeleteAuthorResponse> => {
  const { data } = await request({
    url: `/api/v1/authors/${params.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};

export const createAuthorRequest = async (body: ICreateAuthorRequest): Promise<ICreateAuthorResponse> => {
  const { data } = await request({
    url: '/api/v1/authors',
    method: 'POST',
    data: body,
  });

  return data;
};

export const editAuthorRequest = async (req: {
  params: IEditAuthorParams;
  body: IEditAuthorRequest;
}): Promise<IEditAuthorResponse> => {
  const { data } = await request({
    url: `/api/v1/authors/${req?.params?.id}`,
    method: 'PATCH',
    data: req?.body,
  });

  return data;
};
