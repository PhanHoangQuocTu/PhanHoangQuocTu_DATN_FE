import React from 'react';
import { useFormContext } from 'react-hook-form';

import { ShadowContainer } from '@/components/ShadowContainer';
import { SelectField, TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { useGetProvince } from '@/hooks/metadata/useGetProvince';
import { cn } from '@/lib/utils';

import { type checkoutType } from '../types/schema';
import AddressField from './AddressField';

interface Props {
  className?: string;
}

const CheckoutDetail: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext<checkoutType>();
  const { proviceOptions } = useGetProvince();

  return (
    <ShadowContainer className={cn('space-y-5 flex flex-col', className)}>
      <span className="text-xl font-semibold">Billing Detail</span>

      <VStack spacing={12}>
        <TextField control={control} size={'sm'} name="name" label="Name" />

        <TextField control={control} size={'sm'} name="phoneNumber" label="Phone Number" />

        <AddressField />

        <SelectField control={control} name="city" label="City" data={proviceOptions} className="w-full h-11" />

        <TextField control={control} size={'sm'} name="postCode" label="Post Code" fullWidth />
      </VStack>
    </ShadowContainer>
  );
};

export default CheckoutDetail;
