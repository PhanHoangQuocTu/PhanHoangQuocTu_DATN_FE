import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ShadowContainer } from '@/components/ShadowContainer';
import { RadioGroupField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { cn } from '@/lib/utils';

import { PAYMENT_METHOD_OPTIONS } from '../types/const';
import { type checkoutType } from '../types/schema';

interface Props {
  className?: string;
}
const PaymentMethod: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext<checkoutType>();

  return (
    <ShadowContainer className={cn('h-fit space-y-5', className)}>
      <VStack spacing={2}>
        <span className="text-xl font-semibold">Payment Method</span>
        <span className="text-xs font-medium text-slate-400">
          Please select the preferred payment method to use on this order.
        </span>

        <RadioGroupField control={control} name="paymentMethod" data={PAYMENT_METHOD_OPTIONS} />
      </VStack>
    </ShadowContainer>
  );
};

export default PaymentMethod;
