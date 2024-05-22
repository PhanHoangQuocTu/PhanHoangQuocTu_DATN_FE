import { request } from '../axios';
import {
  type ICommentRequest,
  type IDeleteCommentParams,
  type IGetCommentByPostIdParams,
  type IGetCommentByPostIdResponse,
} from './types';

export const commentPostRequest = async (body: ICommentRequest): Promise<any> => {
  const { data } = await request({
    url: `/api/v1/comment/comment/${body?.postId}`,
    method: 'POST',
    data: body,
  });

  return data;
};

export const deleteCommentRequest = async (params: IDeleteCommentParams): Promise<any> => {
  const { data } = await request({
    url: `/api/v1/comment/${params?.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};

export const getCommentByPostIdRequest = async (
  params: IGetCommentByPostIdParams
): Promise<IGetCommentByPostIdResponse> => {
  const { data } = await request({
    url: `/api/v1/comment/by-post/${params?.postId}`,
    method: 'GET',
    params,
  });

  return data;
};
