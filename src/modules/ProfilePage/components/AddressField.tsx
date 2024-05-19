import React from 'react';
import { useFormContext } from 'react-hook-form';

import { TextField } from '@/components/ui/FormField';
import { VStack } from '@/components/ui/Utilities';
import { useGetAddress } from '@/hooks/metadata/useGetAddress';

import { type EditProfileType } from '../types/schema';

const AddressField = () => {
  const [isBlurBox, setIsBlurBox] = React.useState(false);
  const { control, watch, setValue } = useFormContext<EditProfileType>();
  const [address] = watch(['address']);
  const { predictionsOptions } = useGetAddress(address);

  const handleSelectAddress = (value: string) => {
    setValue('address', value);
    setIsBlurBox(true);
  };

  const handleOnChange = (value: string) => {
    setValue('address', value);
    setIsBlurBox(false);
  };

  return (
    <div className="relative">
      <TextField
        control={control}
        size={'sm'}
        name="address"
        label="Address"
        onChange={(e) => handleOnChange(e.target.value)}
      />

      {!!predictionsOptions?.length && predictionsOptions?.length > 2 && !isBlurBox && (
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
