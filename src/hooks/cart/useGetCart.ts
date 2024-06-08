import React from 'react';

import { useGetCartByCurrentUserQuery } from '@/api/cart/queries';
import { prettyNumber, roundNumber } from '@/lib/common';

import { useAuth } from '../useAuth';

export const useGetCart = () => {
  const { isLoggedIn } = useAuth();
  const { data, ...rest } = useGetCartByCurrentUserQuery({
    enabled: !!isLoggedIn,
  });

  const cartData = React.useMemo(() => {
    if (!data?.cart?.items?.length) return [];

    return data?.cart?.items?.filter((item) => !!item?.product);
  }, [data?.cart?.items]);

  const bookPrices = React.useMemo(() => {
    if (!cartData?.length) return prettyNumber(roundNumber('0'));

    const total = cartData?.reduce((acc, item) => {
      return acc + Number(item?.product?.price) * item.quantity;
    }, 0);

    return total;
  }, [cartData]);

  const totalDiscountPrice = React.useMemo(() => {
    if (!cartData?.length) return prettyNumber(roundNumber('0'));

    const total = cartData?.reduce((acc, item) => {
      return acc + ((Number(item?.product?.price) * Number(item?.product?.discount)) / 100) * item.quantity;
    }, 0);

    return total;
  }, [cartData]);

  const totalPrice = React.useMemo(() => {
    if (!Number(bookPrices)) return prettyNumber(roundNumber('0'));

    if (!Number(totalDiscountPrice)) return prettyNumber(roundNumber(String(Number(bookPrices))));

    return prettyNumber(roundNumber(String(Number(bookPrices) - Number(totalDiscountPrice))));
  }, [bookPrices, totalDiscountPrice]);

  const totalPriceValue = React.useMemo(() => {
    if (!Number(bookPrices) || !Number(totalDiscountPrice)) return 0;

    return Number(bookPrices) - Number(totalDiscountPrice);
  }, [bookPrices, totalDiscountPrice]);

  const cartCheckout = React.useMemo(() => {
    if (!cartData?.length) return [];

    return cartData?.map((item) => ({
      id: item?.product?.id,
      product_unit_price: Number(item?.product?.price),
      product_quanity: Number(item?.quantity),
      title: item?.product?.title,
      description: item?.product?.description,
      discount: Number(item?.product?.discount),
      images: item?.product?.images,
    }));
  }, [cartData]);

  return {
    cart: cartData || [],
    bookPrices,
    totalDiscountPrice,
    totalPrice,
    cartCheckout,
    totalPriceValue,
    ...rest,
  };
};
