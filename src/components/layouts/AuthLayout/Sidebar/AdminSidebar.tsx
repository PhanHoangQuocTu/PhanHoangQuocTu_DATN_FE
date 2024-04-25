// @flow
import { BadgeDollarSign } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ROUTE } from '@/types';

import { SidebarItem } from './SidebarItem';

const SIDEBAR_LIST = [
  {
    name: 'DASHBOARD',
    href: ROUTE.DASHBOARD,
    icon: BadgeDollarSign,
  },
];

type Props = { opened: boolean };
export const AdminSidebar = ({ opened }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {SIDEBAR_LIST.map(({ href, name, icon }) => {
        const isActive = pathname.includes(href);

        return <SidebarItem key={href} href={href} name={name} opened={opened} icon={icon} isActive={isActive} />;
      })}
    </>
  );
};
