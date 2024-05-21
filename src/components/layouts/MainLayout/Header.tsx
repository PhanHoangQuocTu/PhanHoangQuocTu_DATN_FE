import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import Logo from '@/components/Logo';
import { HStack } from '@/components/ui/Utilities';
import { useMobile } from '@/hooks/breakpoint';
import { cn } from '@/lib/utils';
import { ROUTE } from '@/types';

import Sidebar from './Sidebar';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

const Header = () => {
  const isMobile = useMobile();

  return (
    <header
      className={cn(
        'h-header bg-secondary sticky left-0 right-0 top-0 z-50 flex w-full items-center justify-between py-4'
      )}
    >
      <div className={'container flex items-center justify-between'}>
        <HStack noWrap spacing={16}>
          <Link href={ROUTE.HOME}>
            <Logo />
          </Link>

          <Link className="text-primary text-lg font-medium hover:opacity-70" href={ROUTE.HOME}>
            Home
          </Link>

          <Link className="text-primary text-lg font-medium hover:opacity-70" href={ROUTE.BOOKS}>
            Books
          </Link>

          <Link className="text-primary text-lg font-medium hover:opacity-70" href={ROUTE.POST}>
            Community
          </Link>
        </HStack>
        <div className="">{isMobile ? <Sidebar /> : <Navbar />}</div>
      </div>
    </header>
  );
};

export default Header;
