import { BaggageClaim, BookCopy, CreditCard, HeartHandshake } from 'lucide-react';
import React from 'react';

import { HStack, VStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';

const UniqueSection = () => {
  return (
    <VStack className="container min-h-96 py-10 gap-10" align={'center'}>
      <span className="text-4xl font-semibold">Exceptional Customer Experience</span>
      <HStack noWrap align={'center'} className="grid grid-cols-4 gap-5 w-full">
        <UniqueBoxItem title="Book Packing" description="Careful and precise packaging" icon={<BookCopy size={60} />} />
        <UniqueBoxItem
          title="24/7 Support"
          description="Always available customer care"
          icon={<HeartHandshake size={60} />}
        />
        <UniqueBoxItem
          title="Delivery in 4 Days"
          description="Fast and reliable delivery"
          icon={<BaggageClaim size={60} />}
        />
        <UniqueBoxItem
          title="Payment Secure"
          description="Safe and encrypted transactions"
          icon={<CreditCard size={60} />}
        />
      </HStack>
    </VStack>
  );
};

export default UniqueSection;

interface IUniqueBoxItemProps {
  className?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const UniqueBoxItem: React.FC<IUniqueBoxItemProps> = ({ className, title, description, icon }) => {
  return (
    <VStack className={cn('w-full bg-[#F7F7F8] p-5 border border-border rounded-md h-fit', className)} align={'center'}>
      {icon}

      <span className="text-xl font-semibold">{title}</span>
      <span className="text-base font-medium">{description}</span>
    </VStack>
  );
};
