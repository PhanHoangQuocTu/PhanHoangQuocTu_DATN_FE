import { useGetCartByCurrentUserQuery } from '@/api/cart/queries';

export const useGetCart = () => {
  const { data, ...rest } = useGetCartByCurrentUserQuery();

  return {
    cart: data?.cart?.items || [],
    ...rest,
  };
};
