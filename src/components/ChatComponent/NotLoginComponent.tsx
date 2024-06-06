import { Info } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { ROUTE } from '@/types';

import { ShadowContainer } from '../ShadowContainer';
import { HStack } from '../ui/Utilities';

const NotLoginComponent = () => {
  return (
    <ShadowContainer className="w-[35rem]">
      <HStack pos={'center'} align={'center'} spacing={20}>
        <Info />
        <span className="text-lg font-medium">
          Please{' '}
          <Link href={ROUTE.LOGIN} className="underline text-primary">
            login
          </Link>{' '}
          to chat
        </span>
      </HStack>
    </ShadowContainer>
  );
};

export default NotLoginComponent;
