import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createCategoryRequest } from '@/api/category';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { TextAreaField, TextField } from '@/components/ui/FormField';
import { useCategoryManagementStore } from '@/stores/CategoryManagementStore';
import { type FCC } from '@/types';

import { handleCategoryManagementSchema, type HandleCategoryManagementType } from '../types/schema';

interface Props {
  refetch: () => void;
}

const CreateCategoryDialog: FCC<Props> = ({ children, refetch }) => {
  const categoryEditId = useCategoryManagementStore.use.categoryEditId();
  const isCreate = useCategoryManagementStore.use.isCreate();
  const setCategoryEditId = useCategoryManagementStore.use.setCategoryEditId();
  const setIsCreate = useCategoryManagementStore.use.setIsCreate();

  const form = useForm<HandleCategoryManagementType>({
    resolver: zodResolver(handleCategoryManagementSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setCategoryEditId('');
    setIsCreate(false);
  };

  const { mutate: createCategory } = useMutation(createCategoryRequest, {
    onSuccess: () => {
      toast.success('Create category successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandleCategoryManagementType> = async (formData) => {
    const formValue = {
      title: formData.title,
      description: formData.description,
    };

    createCategory(formValue);
  };

  return (
    <Dialog open={isCreate && !categoryEditId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Create Category</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <TextField control={form.control} name="title" label="Title" placeholder="Title" fullWidth />

          <TextAreaField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            fullWidth
          />
          <AlertDialogFooter>
            <Button type="button" variant={'outline'} onClick={handleCloseDialog}>
              Close
            </Button>

            <Button type="submit">Create</Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
