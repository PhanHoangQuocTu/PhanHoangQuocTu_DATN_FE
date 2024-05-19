// @flow
import { LayoutDashboard, Receipt } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ROUTE } from '@/types';

import { SidebarItem } from './SidebarItem';

const SIDEBAR_SUPPER_ADMIN_LIST = [
  {
    name: 'DASHBOARD',
    href: ROUTE.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: 'MONTHLY REPORTS',
    href: ROUTE.MONTHLY_REPORTS,
    icon: Receipt,
  },
];

type Props = { opened: boolean };
export const SupperAdminSidebar = ({ opened }: Props) => {
  const pathname = usePathname();

  return (
    <div>
      {SIDEBAR_SUPPER_ADMIN_LIST.map(({ href, name, icon }) => {
        const isActive = pathname.includes(href);

        return <SidebarItem key={href} href={href} name={name} opened={opened} icon={icon} isActive={isActive} />;
      })}
    </div>
  );
};
