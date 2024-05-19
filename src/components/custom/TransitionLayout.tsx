import { motion } from 'framer-motion';
import React from 'react';

import { type FCC } from '@/types';

const TransitionLayout: FCC = ({ children }) => {
  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const transition = {
    type: 'spring',
    stiffness: 100,
    damping: 10,
    when: 'beforeChildren',
    staggerChildren: 0.3,
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants} transition={transition}>
      {children}
    </motion.div>
  );
};

export default TransitionLayout;
