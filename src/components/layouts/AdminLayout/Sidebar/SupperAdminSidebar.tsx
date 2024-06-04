// @flow
import { LayoutDashboard, Receipt, Twitch } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { VStack } from '@/components/ui/Utilities';
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
  {
    name: 'BLOG MANAGEMENT',
    href: ROUTE.POST_MANAGEMENT,
    icon: Twitch,
  },
];

type Props = { opened: boolean };
export const SupperAdminSidebar = ({ opened }: Props) => {
  const pathname = usePathname();

  return (
    <VStack>
      {SIDEBAR_SUPPER_ADMIN_LIST.map(({ href, name, icon }) => {
        const isActive = pathname.includes(href);

        return <SidebarItem key={href} href={href} name={name} opened={opened} icon={icon} isActive={isActive} />;
      })}
    </VStack>
  );
};
