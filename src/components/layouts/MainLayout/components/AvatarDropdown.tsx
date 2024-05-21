import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

import { Icons } from '@/assets/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/stores';
import { type FCC, ROUTE } from '@/types';

const AvatarDropdown: FCC = ({ children }) => {
  const { user } = useAuth();
  const logout = useUserStore.use.logout();

  const handleLogout = () => {
    toast.success('Logout successfully!');
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <HStack noWrap spacing={16} className="p-2">
            <Icons.user size={16} />
            <span className="block truncate">{user?.email}</span>
          </HStack>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={ROUTE.PROFILE} className="flex items-center gap-2 p-2">
              <Icons.contact />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={ROUTE.PROFILE} className="flex items-center gap-2 p-2">
              <Icons.twitch />
              <span>My Post</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={ROUTE.MY_ORDER} className="flex items-center gap-2 p-2">
              <Icons.receipt />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={handleLogout} className="flex items-center gap-2 p-2">
              <Icons.logout />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
