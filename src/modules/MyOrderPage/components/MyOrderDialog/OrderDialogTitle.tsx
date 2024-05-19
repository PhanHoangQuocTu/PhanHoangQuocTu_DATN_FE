import React from 'react';

import { HStack } from '@/components/ui/Utilities';

interface Props {
  icon: React.ReactNode;
  title: string;
}

const OrderDialogTitle: React.FC<Props> = ({ icon, title }) => {
  return (
    <HStack noWrap>
      {icon}
      <span className="text-lg font-semibold">{title}</span>
    </HStack>
  );
};

export default OrderDialogTitle;
