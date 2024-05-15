import React from 'react';

import { HStack } from '@/components/ui/Utilities';

const BooksPageHeading = () => {
  return (
    <HStack noWrap pos={'center'} className="py-5 bg-gradient-to-r from-[#fee8e8] to-white">
      <span className="text-primary font-medium">HOME / BOOKS</span>
    </HStack>
  );
};

export default BooksPageHeading;
