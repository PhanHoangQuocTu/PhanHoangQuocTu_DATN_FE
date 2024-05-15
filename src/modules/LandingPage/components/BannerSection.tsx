import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { VStack } from '@/components/ui/Utilities';
import { ROUTE } from '@/types';

const BannerSection = () => {
  return (
    <div className="w-full h-[calc(100vh-55px)] relative">
      <div className="container w-full h-full relative z-10">
        <VStack className="w-1/2 h-full text-primary" justify={'center'}>
          <span className="text-3xl font-semibold leading-normal">Unleash Your Imagination</span>
          <span className="text-xl font-medium leading-normal text-justify">
            Dive into worlds of wonder with our curated collection of tales. Find your next adventure today!
          </span>

          <Link href={ROUTE.BOOKS}>
            <Button variant={'outline'} className="w-fit border-primary flex gap-3 items-center">
              <span>Read More</span>
              <Icons.arrowRight size={16} />
            </Button>
          </Link>
        </VStack>
      </div>

      <Image src={'/images/homePage/banner.webp'} fill alt="banner" priority unoptimized />
    </div>
  );
};

export default BannerSection;
