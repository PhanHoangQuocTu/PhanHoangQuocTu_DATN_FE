import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/Utilities';
import { useGetReviewByBookId } from '@/hooks/review/useGetReviewByBookId';
import { useIntersectionStore } from '@/stores';

import CreateBookReviewDialog from './CreateBookReviewDialog';
import RatingList from './RatingList';

const BookRating: React.FC = () => {
  const setTargetInView = useIntersectionStore.use.setTargetInView();

  const handleCreateReview = () => {
    setTargetInView('createReview');
  };

  const { reviewList, refetch } = useGetReviewByBookId();

  return (
    <ShadowContainer className="flex flex-col gap-4">
      <HStack pos={'apart'}>
        <span className="text-xl font-semibold">{"Book's Review"}</span>

        <CreateBookReviewDialog refetch={refetch} />
        <Button onClick={handleCreateReview}>Write your review</Button>
      </HStack>

      <RatingList reviewList={reviewList} />
    </ShadowContainer>
  );
};

export default BookRating;
