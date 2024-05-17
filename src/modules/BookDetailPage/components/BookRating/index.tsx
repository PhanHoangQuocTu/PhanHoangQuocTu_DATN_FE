import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/Utilities';
import { useIntersectionStore } from '@/stores';

import CreateBookReviewDialog from './CreateBookReviewDialog';
import RatingList from './RatingList';

const BookRating: React.FC = () => {
  const setTargetInView = useIntersectionStore.use.setTargetInView();

  const handleCreateReview = () => {
    setTargetInView('createReview');
  };

  return (
    <ShadowContainer className="flex flex-col gap-4">
      <HStack pos={'apart'}>
        <span className="text-xl font-semibold">{"Book's Review"}</span>

        <CreateBookReviewDialog />
        <Button onClick={handleCreateReview}>Write your review</Button>
      </HStack>

      <RatingList />
    </ShadowContainer>
  );
};

export default BookRating;
