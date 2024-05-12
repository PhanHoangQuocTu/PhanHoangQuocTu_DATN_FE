import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { HStack } from '@/components/ui/Utilities';
import { useCategoryManagementStore } from '@/stores/CategoryManagementStore';

import { categoryManagementFilterSchema, type CategoryManagementFilterType } from '../types/schema';

interface Props {
  handleSearchChange: (formData: CategoryManagementFilterType) => void;
}

const CategoryManagementFilter: React.FC<Props> = ({ handleSearchChange }) => {
  const setIsEdit = useCategoryManagementStore.use.setIsEdit();
  const setIsCreate = useCategoryManagementStore.use.setIsCreate();
  const setCategoryEditId = useCategoryManagementStore.use.setCategoryEditId();

  const form = useForm<CategoryManagementFilterType>({
    resolver: zodResolver(categoryManagementFilterSchema),
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

  const handleSubmit: SubmitHandler<CategoryManagementFilterType> = async (formData) => {
    handleSearchChange(formData);
  };

  const handleCreateCategory = () => {
    setIsEdit(false);
    setIsCreate(true);
    setCategoryEditId('');
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit}>
      <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 border-b border-b-border pb-2">
        <HStack spacing={16} pos={'apart'}>
          <TextField size={'sm'} control={form.control} label="Search" name="search" placeholder="Search" />

          <HStack noWrap spacing={12}>
            <Button type="button" variant={'secondary'} onClick={handleCreateCategory}>
              Create Category
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

export default CategoryManagementFilter;
