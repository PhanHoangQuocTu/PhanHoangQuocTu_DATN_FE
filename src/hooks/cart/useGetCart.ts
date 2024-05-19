import React from 'react';

import { useGetCartByCurrentUserQuery } from '@/api/cart/queries';
import { prettyNumber, roundNumber } from '@/lib/common';

import { useAuth } from '../useAuth';

export const useGetCart = () => {
  const { isLoggedIn } = useAuth();
  const { data, ...rest } = useGetCartByCurrentUserQuery({
    enabled: !!isLoggedIn,
  });

  const bookPrices = React.useMemo(() => {
    if (!data?.cart?.items?.length) return prettyNumber(roundNumber('0'));

    const total = data?.cart?.items?.reduce((acc, item) => {
      return acc + Number(item?.product?.price) * item.quantity;
    }, 0);

    return total;
  }, [data?.cart?.items]);

  const totalDiscountPrice = React.useMemo(() => {
    if (!data?.cart?.items?.length) return prettyNumber(roundNumber('0'));

    const total = data?.cart?.items?.reduce((acc, item) => {
      return acc + ((Number(item?.product?.price) * Number(item?.product?.discount)) / 100) * item.quantity;
    }, 0);

    return total;
  }, [data?.cart?.items]);

  const totalPrice = React.useMemo(() => {
    if (!Number(bookPrices) || !Number(totalDiscountPrice)) return prettyNumber(roundNumber('0'));

    return prettyNumber(roundNumber(String(Number(bookPrices) - Number(totalDiscountPrice))));
  }, [bookPrices, totalDiscountPrice]);

  const cartCheckout = React.useMemo(() => {
    if (!data?.cart?.items?.length) return [];

    return data?.cart?.items?.map((item) => ({
      id: item?.product?.id,
      product_unit_price: Number(item?.product?.price),
      product_quanity: Number(item?.quantity),
      title: item?.product?.title,
      description: item?.product?.description,
      discount: Number(item?.product?.discount),
      images: item?.product?.images,
    }));
  }, [data?.cart?.items]);

  return {
    cart: data?.cart?.items || [],
    bookPrices,
    totalDiscountPrice,
    totalPrice,
    cartCheckout,
    ...rest,
  };
};
