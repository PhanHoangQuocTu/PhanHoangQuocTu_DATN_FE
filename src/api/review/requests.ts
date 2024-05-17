import { request } from '../axios';
import type {
  ICreateReviewRequest,
  ICreateReviewResponse,
  IDeleteReviewParams,
  IDeleteReviewResponse,
  IGetReviewByBookIdParams,
  IGetReviewByBookIdResponse,
} from './types';

export const getReviewByBookIdRequest = async (
  params: IGetReviewByBookIdParams
): Promise<IGetReviewByBookIdResponse> => {
  const { data } = await request({
    url: `/api/v1/reviews/${params.productId}`,
    method: 'GET',
    params,
  });

  return data;
};

export const createReviewRequest = async (body: ICreateReviewRequest): Promise<ICreateReviewResponse> => {
  const { data } = await request({
    url: '/api/v1/reviews',
    method: 'POST',
    data: body,
  });

  return data;
};

export const deleteReviewRequest = async (params: IDeleteReviewParams): Promise<IDeleteReviewResponse> => {
  const { data } = await request({
    url: `/api/v1/reviews/${params.id}`,
    method: 'DELETE',
    params,
  });

  return data;
};
