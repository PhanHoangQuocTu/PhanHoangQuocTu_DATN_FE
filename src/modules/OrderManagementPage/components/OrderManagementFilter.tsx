import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';
import { defaultArray } from '@/lib/common';
import { ORDER_STATUS_OPTIONS } from '@/modules/MyOrderPage/types/const';

import { orderManagementFilterSchema, type OrderManagementFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: OrderManagementFilterType) => void;
}

const OrderManagementFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const form = useForm<OrderManagementFilterType>({
    resolver: zodResolver(orderManagementFilterSchema),
    defaultValues: {
      search: '',
      status: '',
    },
  });

  const handleResetForm = () => {
    form.reset({
      search: '',
      status: '',
    });
    handleSubmit({ ...form.getValues() });
  };

  const handleSubmit: SubmitHandler<OrderManagementFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 border-b border-b-border pb-2">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="col-span-1">
            <SelectField
              className="h-11"
              fullWidth
              control={form.control}
              label="Status"
              name="status"
              data={defaultArray(ORDER_STATUS_OPTIONS)}
              placeholder="Active"
            />
          </div>

          <div className="col-span-2">
            <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search" />
          </div>
        </div>

        <HStack spacing={16} pos={'right'}>
          <Button type="button" variant="outline" onClick={handleResetForm}>
            Clear Filter
          </Button>
          <Button type="submit">Apply Filter</Button>
        </HStack>
      </div>
    </FormWrapper>
  );
};

export default OrderManagementFilter;
