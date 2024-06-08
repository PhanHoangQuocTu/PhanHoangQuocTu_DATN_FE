import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Carousel } from '@/components/ui/carousel';
import { VStack } from '@/components/ui/Utilities';
import { ROUTE } from '@/types';

import ProductCarousel from './ProductCarousel';

const CarouselContainer = () => {
  return (
    <div className="bg-gradient-to-l from-[#ffefee] to-[#fff]">
      <VStack className="container py-16" align={'center'}>
        <span className="text-4xl font-semibold">New Arrivals</span>

        <Link href={ROUTE.BOOKS}>
          <Button variant={'outline'} className="w-fit border-primary flex gap-3 items-center">
            See More
          </Button>
        </Link>
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ playOnInit: false, delay: 3000 }) as any]}>
          <ProductCarousel />
        </Carousel>
      </VStack>
    </div>
  );
};

export default CarouselContainer;
