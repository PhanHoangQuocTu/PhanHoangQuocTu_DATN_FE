import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';
import { defaultArray } from '@/lib/common';

import { APPROVE_STATUS_OPTIONS } from '../types/const';
import { postManagementFilterSchema, type PostManagementFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: PostManagementFilterType) => void;
}

const PostManagementFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const form = useForm<PostManagementFilterType>({
    resolver: zodResolver(postManagementFilterSchema),
    defaultValues: {
      search: '',
      isApprove: '',
    },
  });

  const handleResetForm = () => {
    form.reset({
      search: '',
      isApprove: '',
    });
    handleSubmit({ ...form.getValues() });
  };

  const handleSubmit: SubmitHandler<PostManagementFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 border-b border-b-border pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <SelectField
              className="h-11"
              fullWidth
              control={form.control}
              label="Approve status"
              name="isApprove"
              data={defaultArray(APPROVE_STATUS_OPTIONS)}
              placeholder="Approve status"
            />
          </div>

          <div className="col-span-3">
            <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search" />
          </div>
        </div>

        <HStack spacing={16} pos={'right'} align={'end'}>
          <HStack noWrap spacing={12}>
            <Button type="button" variant="outline" onClick={handleResetForm}>
              Clear Filter
            </Button>

            <Button type="submit">Apply Filter</Button>
          </HStack>
        </HStack>
      </div>
    </FormWrapper>
  );
};

export default PostManagementFilter;
