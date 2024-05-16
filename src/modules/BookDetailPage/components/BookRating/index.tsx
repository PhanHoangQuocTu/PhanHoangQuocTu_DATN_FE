import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/Utilities';

import RatingList from './RatingList';

const BookRating: React.FC = () => {
  return (
    <ShadowContainer className="flex flex-col gap-4">
      <HStack pos={'apart'}>
        <span className="text-xl font-semibold">{"Book's Review"}</span>
        <Button>Write your review</Button>
      </HStack>

      <RatingList />
    </ShadowContainer>
  );
};

export default BookRating;
