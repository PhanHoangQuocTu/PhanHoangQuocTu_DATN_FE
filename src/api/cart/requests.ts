import { request } from '../axios';
import type { IAddToCartParams, IAddToCartRequest, IAddToCartResponse } from './types';

export const addToCartRequest = async (req: {
  params: IAddToCartParams;
  body: IAddToCartRequest;
}): Promise<IAddToCartResponse> => {
  const { data } = await request({
    url: `/api/v1/cart/add/${req?.params?.productId}`,
    method: 'POST',
    data: req?.body,
    params: req?.params,
  });

  return data;
};
