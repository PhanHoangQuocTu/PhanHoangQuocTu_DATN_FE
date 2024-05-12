import { request } from '../axios';
import type {
  ICreateCategoryRequest,
  ICreateCategoryResponse,
  IDeleteCategoryParams,
  IDeleteCategoryResponse,
  IEditCategoryParams,
  IEditCategoryRequest,
  IEditCategoryResponse,
  IGetAllCategoryParams,
  IGetAllCategoryResponse,
  IGetDetailCategoryParams,
  IGetDetailCategoryResponse,
} from './types';

export const getAllCategoryRequest = async (params: IGetAllCategoryParams): Promise<IGetAllCategoryResponse> => {
  const { data } = await request({
    url: '/api/v1/category',
    method: 'GET',
    params,
  });

  return data;
};

export const getDetailCategoryRequest = async (
  params: IGetDetailCategoryParams
): Promise<IGetDetailCategoryResponse> => {
  const { data } = await request({
    url: `/api/v1/category/${params.id}`,
    method: 'GET',
    params,
  });

  return data;
};

export const deleteCategoryRequest = async (params: IDeleteCategoryParams): Promise<IDeleteCategoryResponse> => {
  const { data } = await request({
    url: `/api/v1/category/${params.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};

export const createCategoryRequest = async (body: ICreateCategoryRequest): Promise<ICreateCategoryResponse> => {
  const { data } = await request({
    url: '/api/v1/category',
    method: 'POST',
    data: body,
  });

  return data;
};

export const editCategoryRequest = async (req: {
  params: IEditCategoryParams;
  body: IEditCategoryRequest;
}): Promise<IEditCategoryResponse> => {
  const { data } = await request({
    url: `/api/v1/category/${req?.params?.id}`,
    method: 'PATCH',
    data: req?.body,
  });

  return data;
};
