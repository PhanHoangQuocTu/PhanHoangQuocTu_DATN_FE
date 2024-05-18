import React from 'react';

import { useGetCartByCurrentUserQuery } from '@/api/cart/queries';
import { prettyNumber, roundNumber } from '@/lib/common';

export const useGetCart = () => {
  const { data, ...rest } = useGetCartByCurrentUserQuery();

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

  return {
    cart: data?.cart?.items || [],
    bookPrices,
    totalDiscountPrice,
    totalPrice,
    ...rest,
  };
};
