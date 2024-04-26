import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';
import { ROUTE } from '@/types';

const Introducing = () => {
  return (
    <div className="bg-black text-white">
      <div className="container flex flex-col items-start gap-1 py-4 text-sm lg:flex-row lg:items-center lg:justify-center lg:gap-4 lg:py-2">
        <p>Introducing The Vaporfund Ecosystem</p>

        <Link href={ROUTE.HOME} className="inline-flex items-center font-medium hover:underline">
          Learn more <Icons.chevronRight size="1rem" />
        </Link>
      </div>
    </div>
  );
};

export { Introducing };
