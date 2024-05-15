import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  totalIems: number;
}
const BookListSkeleton: React.FC<Props> = ({ totalIems }) => {
  return new Array(totalIems).fill(0).map((_, index) => {
    return <Skeleton className="w-[20rem]" key={index} />;
  });
};

export default BookListSkeleton;
