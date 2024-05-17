import { useParams } from 'next/navigation';

import { useGetReviewByBookIdQuery } from '@/api/review/queries';
import { limit_infinite } from '@/lib/const';

export const useGetReviewByBookId = () => {
  const params = useParams();
  const { bookId } = params;
  const { data, ...rest } = useGetReviewByBookIdQuery({
    variables: {
      productId: Number(bookId),
      limit: limit_infinite,
      page: 1,
    },
    enabled: !!Number(bookId),
  });

  return {
    data,
    reviewList: data?.reviews || [],
    ...rest,
  };
};
