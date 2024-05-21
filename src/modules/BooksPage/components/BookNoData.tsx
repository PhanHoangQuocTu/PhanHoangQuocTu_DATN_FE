import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';

interface Props {
  emptyText?: string;
  className?: string;
}

const BookNoData: React.FC<Props> = ({ emptyText, className }) => {
  return (
    <VStack align={'center'} justify={'center'} className={cn('w-full min-h-32 select-none  text-gray-400', className)}>
      <GalleryVerticalEnd size={50} />

      <p>{emptyText ?? 'No data'}</p>
    </VStack>
  );
};

export default BookNoData;
