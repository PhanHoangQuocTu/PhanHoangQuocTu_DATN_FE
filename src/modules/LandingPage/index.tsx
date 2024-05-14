import dynamic from 'next/dynamic';
import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import type { NextPageWithLayout } from '@/types';

const BannerSection = dynamic(() => import('./components/BannerSection'), { ssr: false });

const LandingPage: NextPageWithLayout = () => {
  return (
    <VStack spacing={0}>
      <BannerSection />
    </VStack>
  );
};

export default LandingPage;
