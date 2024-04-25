import Link from 'next/link';
import React from 'react';

import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';
import { ROUTE } from '@/types';

const Header = () => {
  // const isMobile = useMobile();

  return (
    <header
      className={cn(
        'sticky left-0 right-0 top-0 z-50 flex h-header w-full items-center justify-between bg-white py-[12.96px]'
      )}
    >
      <div className={'flex items-center justify-between'}>
        <div className="flex gap-12">
          <Link href={ROUTE.HOME}>
            <Logo />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
