import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';

import { postFilterSchema, type PostFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: PostFilterType) => void;
}

const PostFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const form = useForm<PostFilterType>({
    resolver: zodResolver(postFilterSchema),
    defaultValues: {
      search: '',
      isApprove: '',
    },
  });

  const handleSubmit: SubmitHandler<PostFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="flex flex-1 flex-wrap justify-between gap-4 border-b border-b-border pb-2">
        <div className="flex-1">
          <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search by title" />
        </div>

        <HStack spacing={16} align={'end'}>
          <Button type="submit">Search</Button>
        </HStack>
      </div>
    </FormWrapper>
  );
};

export default PostFilter;
