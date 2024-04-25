import Link from 'next/link';
import React from 'react';

const NavbarItemMobile = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link href={href}>
      <p>{title}</p>
    </Link>
  );
};

export default NavbarItemMobile;
