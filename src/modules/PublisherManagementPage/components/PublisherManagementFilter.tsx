import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';
import { usePublisherManagementStore } from '@/stores/PublisherManagementStore';

import { publisherManagementFilterSchema, type PublisherManagementFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: PublisherManagementFilterType) => void;
}

const PublisherManagementFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const setIsEdit = usePublisherManagementStore.use.setIsEdit();
  const setIsCreate = usePublisherManagementStore.use.setIsCreate();
  const setPublisherEditId = usePublisherManagementStore.use.setPublisherEditId();

  const form = useForm<PublisherManagementFilterType>({
    resolver: zodResolver(publisherManagementFilterSchema),
    defaultValues: {
      search: '',
    },
  });

  const handleResetForm = () => {
    form.reset({
      search: '',
    });
    handleSubmit({ ...form.getValues() });
  };

  const handleSubmit: SubmitHandler<PublisherManagementFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  const handleCreateCategory = () => {
    setIsEdit(false);
    setIsCreate(true);
    setPublisherEditId('');
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 border-b border-b-border pb-2">
        <HStack spacing={16} pos={'apart'} align={'end'}>
          <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search" />

          <HStack noWrap spacing={12}>
            <Button type="button" variant={'secondary'} onClick={handleCreateCategory}>
              Create Publisher
            </Button>
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

export default PublisherManagementFilter;
