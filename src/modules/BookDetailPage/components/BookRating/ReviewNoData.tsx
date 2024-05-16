import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

import { VStack } from '@/components/ui/Utilities';

interface Props {
  emptyText?: string;
}

const ReviewNoData: React.FC<Props> = ({ emptyText }) => {
  return (
    <VStack align={'center'} justify={'center'} className="w-full min-h-32 select-none  text-gray-400">
      <GalleryVerticalEnd size={50} />

      <p>{emptyText ?? 'No data'}</p>
    </VStack>
  );
};

export default ReviewNoData;
