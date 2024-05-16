import React from 'react';

import { type IGetDetailBookResponse } from '@/api/product';
import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';

interface Props {
  data: IGetDetailBookResponse | undefined;
}

const BookDescription: React.FC<Props> = ({ data }) => {
  return (
    <ShadowContainer className="flex flex-col gap-4">
      <span className="text-xl font-semibold">{"Book's Description"}</span>

      <div className="grid grid-cols-4">
        <VStack className="col-span-1 text-sm text-gray-500">
          <span>Book id</span>
          <span>Book name</span>
          <span>Author Name</span>
          <span>Publisher Name</span>
          <span>Description</span>
        </VStack>

        <VStack className="col-span-3 text-base font-medium text-justify">
          <span>{data?.id}</span>
          <span>{data?.title}</span>
          <span>{data?.author?.name}</span>
          <span>{data?.publisher?.name}</span>
          <span>{data?.description}</span>
        </VStack>
      </div>
    </ShadowContainer>
  );
};

export default BookDescription;
