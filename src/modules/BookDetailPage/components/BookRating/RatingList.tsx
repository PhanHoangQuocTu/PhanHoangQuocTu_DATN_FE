import React from 'react';

import { Show, VStack } from '@/components/ui/Utilities';
import { useGetReviewByBookId } from '@/hooks/review/useGetReviewByBookId';

import RatingItem from './RatingItem';
import ReviewNoData from './ReviewNoData';

const RatingList = () => {
  const { reviewList } = useGetReviewByBookId();
  const [reviewDeleteId, setReviewDeleteId] = React.useState('');

  return (
    <VStack spacing={16} className="max-h-96 overflow-auto">
      <Show when={reviewList?.length === 0}>
        <ReviewNoData emptyText="No review" />
      </Show>
      {reviewList?.map((review) => (
        <RatingItem
          key={review.id}
          user={review.user}
          review={review}
          reviewDeleteId={reviewDeleteId}
          setReviewDeleteId={setReviewDeleteId}
        />
      ))}
    </VStack>
  );
};

export default RatingList;
