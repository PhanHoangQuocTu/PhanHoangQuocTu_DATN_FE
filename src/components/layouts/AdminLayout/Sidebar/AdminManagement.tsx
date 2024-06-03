// @flow
import { UserCog } from 'lucide-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { ROUTE } from '@/types';

import { SidebarItem } from './SidebarItem';

const SIDEBAR_SUPPER_ADMIN_LIST = [
  {
    name: 'ADMIN MANAGEMENT',
    href: ROUTE.ADMIN_MANAGEMENT,
    icon: UserCog,
  },
];

type Props = { opened: boolean };
export const AdminManagement = ({ opened }: Props) => {
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
