import Image from 'next/image';
import React from 'react';

const BannerSection = () => {
  return (
    <div className="w-full min-h-[calc(100vh-55px)] relative">
      <Image src={'/images/homePage/banner.webp'} fill alt="banner" priority unoptimized />
    </div>
  );
};

export default BannerSection;
