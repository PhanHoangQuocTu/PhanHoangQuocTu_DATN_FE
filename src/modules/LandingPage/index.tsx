import dynamic from 'next/dynamic';
import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import type { NextPageWithLayout } from '@/types';

const BannerSection = dynamic(() => import('./components/BannerSection'), { ssr: false });
const UniqueSection = dynamic(() => import('./components/UniqueSection'), { ssr: false });
const BlogSection = dynamic(() => import('./components/BlogSection'), { ssr: false });
const CarouselContainer = dynamic(() => import('./components/CarouselContainer'), { ssr: false });

const LandingPage: NextPageWithLayout = () => {
  return (
    <VStack spacing={0}>
      <BannerSection />
      <CarouselContainer />
      <BlogSection />
      <UniqueSection />
    </VStack>
  );
};

export default LandingPage;
