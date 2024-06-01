import React from 'react';

import { type IReview } from '@/api/review';
import { Show, VStack } from '@/components/ui/Utilities';

import RatingItem from './RatingItem';
import ReviewNoData from './ReviewNoData';

interface Props {
  reviewList: IReview[];
}

const RatingList: React.FC<Props> = ({ reviewList }) => {
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
