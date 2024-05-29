import { request } from '../axios';
import {
  type IApprovePostParams,
  type IApprovePostResponse,
  type ICreatePostRequest,
  type IDeletePostParams,
  type IEditPostParams,
  type IEditPostRequest,
  type IGetAllPostByMeParams,
  type IGetAllPostByMeResponse,
  type IGetAllPostParams,
  type IGetAllPostResponse,
  type IGetPostByIdParams,
  type IGetPostByIdResponse,
  type ILikePostParams,
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

export const editPostRequest = async (req: { body: IEditPostRequest; params: IEditPostParams }): Promise<any> => {
  const { data } = await request({
    url: `/api/v1/post/${req?.params?.id}`,
    method: 'PATCH',
    data: req.body,
    params: req.params,
  });

  return data;
};

export const deletePostRequest = async (params: IDeletePostParams): Promise<any> => {
  const { data } = await request({
    url: `/api/v1/post/${params?.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};

export const getPostByIdRequest = async (params: IGetPostByIdParams): Promise<IGetPostByIdResponse> => {
  const { data } = await request({
    url: `/api/v1/post/${params?.id}`,
    method: 'GET',
    params,
  });

  return data;
};

export const likePostRequest = async (params: ILikePostParams): Promise<IGetPostByIdResponse> => {
  const { data } = await request({
    url: `/api/v1/post/like/${params?.id}`,
    method: 'POST',
    params,
  });

  return data;
};
