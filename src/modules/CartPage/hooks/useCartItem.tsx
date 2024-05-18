import React from 'react';

import { type ICartProductByCurrentUser } from '@/api/cart';
import { prettyNumber, roundNumber } from '@/lib/common';

export const useCartItem = (book: ICartProductByCurrentUser) => {
  const bookImage = React.useMemo(() => {
    if (!book?.images?.length) return '';
    return book?.images[0];
  }, [book?.images]);

  const bookName = React.useMemo(() => {
    if (!book?.title) return '';

    return book?.title;
  }, [book?.title]);

  const bookDiscount = React.useMemo(() => {
    if (!Number(book?.discount)) return 0;

    return Number(book?.discount);
  }, [book?.discount]);

  const bookPriceOrigin = React.useMemo(() => {
    if (!Number(book?.price)) return 0;

    return Number(book?.price);
  }, [book?.price]);

  const currentPrice = React.useMemo(() => {
    if (!bookDiscount) return prettyNumber(roundNumber(String(bookPriceOrigin)));

    return prettyNumber(roundNumber(String(bookPriceOrigin - (bookPriceOrigin * bookDiscount) / 100)));
  }, [bookDiscount, bookPriceOrigin]);

  return {
    bookImage,
    bookName,
    bookDiscount,
    bookPriceOrigin,
    currentPrice,
  };
};
