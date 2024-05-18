import { request } from '../axios';
import type {
  IAddToCartParams,
  IAddToCartRequest,
  IAddToCartResponse,
  IDeleteCartItemParams,
  IDeleteCartItemResponse,
  IGetCartByCurrentUserResponse,
  IUpdateCartParams,
  IUpdateCartRequest,
  IUpdateCartResponse,
} from './types';

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

export const getCartByCurrentUserRequest = async (): Promise<IGetCartByCurrentUserResponse> => {
  const { data } = await request({
    url: '/api/v1/cart/user',
    method: 'GET',
  });

  return data;
};

export const updateCartRequest = async (req: {
  params: IUpdateCartParams;
  body: IUpdateCartRequest;
}): Promise<IUpdateCartResponse> => {
  const { data } = await request({
    url: `/api/v1/cart/items/${req.params.cartItemId}/update`,
    method: 'PATCH',
    params: req.params,
    data: req.body,
  });

  return data;
};

export const deleteCartItemRequest = async (params: IDeleteCartItemParams): Promise<IDeleteCartItemResponse> => {
  const { data } = await request({
    url: `/api/v1/cart/items/${params.cartItemId}`,
    method: 'DELETE',
    params,
  });

  return data;
};
