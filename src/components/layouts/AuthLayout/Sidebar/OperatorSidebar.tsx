// @flow
import { ArrowUpFromDotIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ROUTE } from '@/types';

import { SidebarItem } from './SidebarItem';

const SIDEBAR_LIST = [
  {
    name: 'Book Management',
    href: ROUTE.DASHBOARD,
    icon: ArrowUpFromDotIcon,
  },
];

type Props = { opened: boolean };
export const OperatorSidebar = ({ opened }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <p className="text-xs font-semibold text-gray-300">Operator Settings</p>

      {SIDEBAR_LIST.map(({ href, name, icon }) => {
        const isActive = pathname.includes(href);

        return <SidebarItem key={href} href={href} name={name} opened={opened} icon={icon} isActive={isActive} />;
      })}
    </>
  );
};
