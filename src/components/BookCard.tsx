import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { prettyNumber, roundNumber } from '@/lib/common';
import { cn } from '@/lib/utils';
import { ROUTE } from '@/types';

import { VStack } from './ui/Utilities';

interface Props {
  id: number;
  image: string;
  name: string;
  desc: string;
  price: number;
  discount: number;
  className?: string;
}

const BookCard: React.FC<Props> = ({ id, image, name, desc, price, discount, className }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/${ROUTE.BOOKS}/${id}`);
  };

  const priveValue = React.useMemo(() => {
    if (!discount) return String(price);

    return String(price - (price * discount) / 100);
  }, [discount, price]);

  return (
    <VStack
      onClick={handleNavigate}
      className={cn('w-full shadow-md hover:shadow-active hover:cursor-pointer opacity-90 rounded-md p-4', className)}
      align={'center'}
    >
      <div className="relative w-full h-48 rounded-md overflow-hidden">
        <Image src={image} alt={name} fill unoptimized />
      </div>

      <VStack spacing={4} align={'center'}>
        <span className="text-primary text-lg font-medium text-center">{name}</span>

        <p className="text-base text-gray-400 font-medium line-clamp-1	">{desc}</p>

        <VStack spacing={0}>
          {!!discount && (
            <span className="text-lg text-gray-400 line-through font-medium">
              {prettyNumber(roundNumber(String(price)))} đ
            </span>
          )}
          <span className="text-lg text-[#ED553B] font-medium">{prettyNumber(roundNumber(String(priveValue)))} đ</span>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default BookCard;
