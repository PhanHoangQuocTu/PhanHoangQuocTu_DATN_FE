import { request } from '../axios';
import type { IGetReviewByBookIdParams, IGetReviewByBookIdResponse } from './types';

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
