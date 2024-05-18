import Link from 'next/link';
import React from 'react';

import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HStack } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { ROUTE } from '@/types';

import AvatarDropdown from './components/AvatarDropdown';

const Navbar = () => {
  const { isLoggedIn, firstLetterName } = useAuth();

  const renderNavbar = React.useMemo(() => {
    if (!isLoggedIn)
      return (
        <HStack noWrap>
          <Link href={ROUTE.LOGIN}>
            <Button>Sign In</Button>
          </Link>

          <Link href={ROUTE.REGISTER}>
            <Button>Sign Up</Button>
          </Link>
        </HStack>
      );

    return (
      <HStack noWrap spacing={16}>
        <AvatarDropdown>
          <Button className="flex items-center gap-2">
            <Icons.user size={16} />

            <span className="text-lg font-medium">{firstLetterName}</span>
          </Button>
        </AvatarDropdown>

        <Link href={ROUTE.CART} className="hover:opacity-70">
          <HStack spacing={8} noWrap>
            <Icons.shoppingCart size={16} />

            <span className="text-lg text-primary font-medium">Cart</span>
          </HStack>
        </Link>
      </HStack>
    );
  }, [firstLetterName, isLoggedIn]);

  return (
    <HStack spacing={16} noWrap>
      <Input size={'sm'} className="rounded-sm" suffix={<Icons.search size={16} />} placeholder="Search" />

      {renderNavbar}
    </HStack>
  );
};

export default Navbar;
