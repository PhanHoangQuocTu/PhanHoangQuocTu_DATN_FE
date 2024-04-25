// @flow
import * as React from 'react';

import { cn } from '@/lib/utils';
import { type FCC } from '@/types';

type Props = {
  opened: boolean;
};
export const SidebarLayout: FCC<Props> = ({ children, opened }) => {
  return (
    <aside
      className={cn(
        'relative z-50 flex w-full min-w-sidebar max-w-sidebar bg-black text-white shadow-md transition-all duration-200',
        {
          'max-w-sidebar-expand': opened,
        }
      )}
    >
      {children}
    </aside>
  );
};
