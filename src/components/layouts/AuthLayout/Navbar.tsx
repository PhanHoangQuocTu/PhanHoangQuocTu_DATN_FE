import Link from 'next/link';

import { HStack } from '@/components/ui/Utilities';

import { NavList } from './NavList';

const Navbar = () => {
  return (
    <HStack spacing={16}>
      {NavList.map((item, i) => (
        <Link key={i} href={item.href}>
          {item.name}
        </Link>
      ))}
    </HStack>
  );
};

export default Navbar;
