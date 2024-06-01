import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

import { useGetDetailProductQuery } from '@/api/product/queries';
import { ROUTE } from '@/types';

export const useGetDetailBook = () => {
  const router = useRouter();
  const params = useParams();
  const bookId = params?.bookId;

  const { data, isError, ...rest } = useGetDetailProductQuery({
    variables: {
      id: +bookId,
    },
    enabled: !!bookId,
  });

  React.useLayoutEffect(() => {
    if (isError) {
      toast.error('Something went wrong, please try again later');
      router.push(ROUTE.HOME);
    }
  }, [isError, router]);

  return {
    data,
    bookName: data?.title || '',
    ...rest,
  };
};
