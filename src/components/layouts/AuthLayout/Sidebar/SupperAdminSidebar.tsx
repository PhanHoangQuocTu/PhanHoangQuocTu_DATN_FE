// @flow
import { UserCog } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ROUTE } from '@/types';

import { SidebarItem } from './SidebarItem';

const SIDEBAR_SUPPER_ADMIN_LIST = [
  {
    name: 'Admin Management',
    href: ROUTE.DASHBOARD,
    icon: UserCog,
  },
];

type Props = { opened: boolean };
export const SupperAdminSidebar = ({ opened }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <p className="text-xs font-semibold text-gray-300">Supper Admin Settings</p>

      <div>
        {SIDEBAR_SUPPER_ADMIN_LIST.map(({ href, name, icon }) => {
          const isActive = pathname.includes(href);

          return <SidebarItem key={href} href={href} name={name} opened={opened} icon={icon} isActive={isActive} />;
        })}
      </div>
    </>
  );
};
