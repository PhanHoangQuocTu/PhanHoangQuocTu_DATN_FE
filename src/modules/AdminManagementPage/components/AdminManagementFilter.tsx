import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';

import { USER_MANAGEMENT_ACTIVE_OPTIONS } from '../types/const';
import { userManagementFilterSchema, type UserManagementFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: UserManagementFilterType) => void;
}

const AdminManagementFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const form = useForm<UserManagementFilterType>({
    resolver: zodResolver(userManagementFilterSchema),
    defaultValues: {
      search: '',
      isActive: '',
    },
  });

  const handleResetForm = () => {
    form.reset({
      search: '',
      isActive: undefined,
    });
    handleSubmit({ ...form.getValues() });
  };

  const handleSubmit: SubmitHandler<UserManagementFilterType> = async (formData) => {
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
              label="Active"
              name="isActive"
              data={USER_MANAGEMENT_ACTIVE_OPTIONS}
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

export default AdminManagementFilter;
