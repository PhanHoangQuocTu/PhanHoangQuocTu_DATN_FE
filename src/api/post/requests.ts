import { request } from '../axios';
import {
  type IApprovePostParams,
  type IApprovePostResponse,
  type ICreatePostRequest,
  type IGetAllPostByMeParams,
  type IGetAllPostByMeResponse,
  type IGetAllPostParams,
  type IGetAllPostResponse,
} from './types';

export const getAllPostRequest = async (params: IGetAllPostParams): Promise<IGetAllPostResponse> => {
  const { data } = await request({
    url: '/api/v1/post',
    method: 'GET',
    params,
  });

  return data;
};

export const approvePostRequest = async (params: IApprovePostParams): Promise<IApprovePostResponse> => {
  const { data } = await request({
    url: `/api/v1/post/approve/${params.id}`,
    method: 'PATCH',
    params,
  });

  return data;
};

export const getAllPostByMeRequest = async (params: IGetAllPostByMeParams): Promise<IGetAllPostByMeResponse> => {
  const { data } = await request({
    url: '/api/v1/post/me',
    method: 'GET',
    params,
  });

  return data;
};

export const createPostRequest = async (body: ICreatePostRequest): Promise<any> => {
  const { data } = await request({
    url: '/api/v1/post/create',
    method: 'POST',
    data: body,
  });

  return data;
};
