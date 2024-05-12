import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { editCategoryRequest } from '@/api/category';
import { useGetDetailCategoryQuery } from '@/api/category/queries';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { TextAreaField, TextField } from '@/components/ui/FormField';
import { useCategoryManagementStore } from '@/stores/CategoryManagementStore';
import { type FCC } from '@/types';

import { handleCategoryManagementSchema, type HandleCategoryManagementType } from '../types/schema';

interface Props {
  categoryId: number;
  refetch: () => void;
}

const EditCategoryDialog: FCC<Props> = ({ children, categoryId, refetch }) => {
  const categoryEditId = useCategoryManagementStore.use.categoryEditId();
  const isEdit = useCategoryManagementStore.use.isEdit();
  const setCategoryEditId = useCategoryManagementStore.use.setCategoryEditId();
  const setIsEdit = useCategoryManagementStore.use.setIsEdit();

  const form = useForm<HandleCategoryManagementType>({
    resolver: zodResolver(handleCategoryManagementSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setCategoryEditId('');
    setIsEdit(false);
  };

  const { mutate: updateCategory } = useMutation(editCategoryRequest, {
    onSuccess: () => {
      toast.success('Update category successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const { data: categoryDetail, isSuccess } = useGetDetailCategoryQuery({
    variables: {
      id: categoryId,
    },
    enabled: !!categoryEditId && isEdit && +categoryEditId === categoryId,
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.reset({
        title: categoryDetail?.title || '',
        description: categoryDetail?.description || '',
      });
    }
  }, [categoryDetail?.description, categoryDetail?.title, form, isSuccess]);

  const handleSubmit: SubmitHandler<HandleCategoryManagementType> = async (formData) => {
    const formValue = {
      title: formData.title,
      description: formData.description,
    };

    updateCategory({
      params: {
        id: +categoryEditId,
      },
      body: formValue,
    });
  };

  return (
    <Dialog open={isEdit && +categoryEditId === categoryId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Edit Category</AlertDialogHeader>

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

            <Button type="submit">Save</Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
