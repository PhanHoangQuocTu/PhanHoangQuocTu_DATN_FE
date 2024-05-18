import React from 'react';
import { useFormContext } from 'react-hook-form';

import { TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { useGetAddress } from '@/hooks/metadata/useGetAddress';

import { type checkoutType } from '../types/schema';

const AddressField = () => {
  const { control, watch, setValue } = useFormContext<checkoutType>();
  const [address] = watch(['address']);
  const { predictionsOptions } = useGetAddress(address);

  const handleSelectAddress = (value: string) => {
    setValue('address', value);
  };

  return (
    <div className="relative">
      <TextField control={control} size={'sm'} name="address" label="Address" />

      {!!predictionsOptions?.length && predictionsOptions?.length > 2 && (
        <VStack
          justify={'between'}
          align={'start'}
          spacing={2}
          className="absolute p-1 z-50 top-20 left-0 bg-slate-200 w-full rounded"
        >
          {predictionsOptions?.map((item) => (
            <button
              key={item.value}
              onClick={() => handleSelectAddress(item.value)}
              className="line-clamp-1 py-1 px-2 bg-white truncate max-w-full hover:opacity-70 w-full text-left rounded-sm"
            >
              {item.label}
            </button>
          ))}
          <button>{}</button>
        </VStack>
      )}
    </div>
  );
};

export default AddressField;
