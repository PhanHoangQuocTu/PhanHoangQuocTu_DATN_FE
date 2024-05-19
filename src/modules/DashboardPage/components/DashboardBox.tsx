import React from 'react';

import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title: string;
  value: string;
}
const DashboardBox: React.FC<Props> = ({ className, title, value }) => {
  return (
    <ShadowContainer className={cn('w-full', className)}>
      <VStack spacing={20}>
        <span className="text-xl font-semibold text-white">{title}</span>

        <span className="text-base font-medium text-white">{value}</span>
      </VStack>
    </ShadowContainer>
  );
};

export default DashboardBox;
