// @flow
import { BookCopy, Contact, LayoutDashboard, ScrollText, SquareGantt, UserCheckIcon, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ROUTE } from '@/types';

import { SidebarItem } from './SidebarItem';

const SIDEBAR_LIST = [
  {
    name: 'DASHBOARD',
    href: ROUTE.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: 'USER MANAGEMENT',
    href: ROUTE.USER_MANAGEMENT,
    icon: Contact,
  },
  {
    name: 'BOOK MANAGEMENT',
    href: ROUTE.BOOK_MANAGEMENT,
    icon: BookCopy,
  },

  {
    name: 'CATEGORY MANAGEMENT',
    href: ROUTE.CATEGORY_MANAGEMENT,
    icon: SquareGantt,
  },
  {
    name: 'AUTHOR MANAGEMENT',
    href: ROUTE.AUTHOR_MANAGEMENT,
    icon: UserCheckIcon,
  },
  {
    name: 'PUBLISHER MANAGEMENT',
    href: ROUTE.PUBLIHSER_MANAGEMENT,
    icon: UserPlus,
  },
  {
    name: 'ORDER MANAGEMENT',
    href: ROUTE.ORDER_MANAGEMENT,
    icon: ScrollText,
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
