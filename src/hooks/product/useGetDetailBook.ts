import { useParams } from 'next/navigation';

import { useGetDetailProductQuery } from '@/api/product/queries';

export const useGetDetailBook = () => {
  const params = useParams();
  const bookId = params?.bookId;

  const { data, ...rest } = useGetDetailProductQuery({
    variables: {
      id: +bookId,
    },
    enabled: !!bookId,
  });

  return {
    data,
    bookName: data?.title || '',
    ...rest,
  };
};
