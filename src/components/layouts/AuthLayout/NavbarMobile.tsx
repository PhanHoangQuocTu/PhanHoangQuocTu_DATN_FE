import { motion } from 'framer-motion';
import React from 'react';

import NavbarItemMobile from './components/NavbarItemMobile';
import { NavList } from './NavList';

const NavbarMobile = () => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: 'calc(100dvh - var(--header-h))',
      }}
      exit={{ height: 0, opacity: 0 }}
      className="absolute left-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] w-full overflow-hidden bg-white p-4"
    >
      <div className="flex flex-col items-start gap-4">
        {NavList.map((item, i) => (
          <NavbarItemMobile title={item.name} href={item.href} key={i} />
        ))}
      </div>
    </motion.div>
  );
};

export { NavbarMobile };
