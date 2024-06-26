import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createProductRequest } from '@/api/product';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextAreaField, TextField } from '@/components/ui/FormField';
import { InputFile } from '@/components/ui/inputFile';
import { VStack } from '@/components/ui/Utilities';
import { useGetAllAuthor } from '@/hooks/author/useGetAllAuthor';
import { useGetAllCategory } from '@/hooks/category/useGetAllCategory';
import { useGetAllPublisher } from '@/hooks/publisher/useGetAllPublisher';
import { limit_infinite } from '@/lib/const';
import { useBookManagementStore } from '@/stores/BookManagementStore';
import { type FCC } from '@/types';

import { useUploadBookImg } from '../hooks/useUploadBookImg';
import { handleBookManagementSchema, type HandleBookManagementType } from '../types/schema';

interface Props {
  refetch: () => void;
}

const CreateBookDialog: FCC<Props> = ({ children, refetch }) => {
  const bookEditId = useBookManagementStore.use.bookEditId();
  const isCreate = useBookManagementStore.use.isCreate();
  const setBookEditId = useBookManagementStore.use.setBookEditId();
  const setIsCreate = useBookManagementStore.use.setIsCreate();
  const productImg = useBookManagementStore.use.productImg();
  const setProductImg = useBookManagementStore.use.setProductImg();

  const { authorSelectOptions, refetch: refetchAuthor } = useGetAllAuthor(limit_infinite);
  const { categorySelectOptions, refetch: refetchCategory } = useGetAllCategory(limit_infinite);
  const { publisherSelectOptions, refetch: refetchPublisher } = useGetAllPublisher(limit_infinite);
  const { url, isLoading } = useUploadBookImg();
  const form = useForm<HandleBookManagementType>({
    resolver: zodResolver(handleBookManagementSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleRefetchData = React.useCallback(() => {
    refetchAuthor();
    refetchCategory();
    refetchPublisher();
  }, [refetchAuthor, refetchCategory, refetchPublisher]);

  React.useEffect(() => {
    handleRefetchData();

    return () => handleRefetchData();
  }, [handleRefetchData]);

  const handleCloseDialog = () => {
    setBookEditId('');
    setIsCreate(false);
  };

  const { mutate: createBook } = useMutation(createProductRequest, {
    onSuccess: () => {
      toast.success('Create book successfully!');
      handleCloseDialog();
      form.reset({
        title: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
      });
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandleBookManagementType> = async (formData) => {
    const formValue = {
      title: formData.title,
      description: formData.description,
      price: +formData.price,
      discount: +formData.discount,
      stock: +formData.stock,
      authorId: +formData.authorId,
      publisherId: +formData.publisherId,
      categoryId: +formData.categoryId,
      images: [url],
    };

    createBook(formValue);
  };

  const handleChangeProductImg = (file: File | null) => {
    if (isCreate) {
      setProductImg(file);
    }
  };

  React.useEffect(() => {
    if (!isCreate) {
      form.reset({
        title: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
      });
    }
  }, [form, isCreate]);

  return (
    <Dialog open={isCreate && !bookEditId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Create Book</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <VStack spacing={4}>
            <label className="text-sm font-medium">Book Image</label>
            <InputFile className="w-full h-60" onChange={handleChangeProductImg} preview={productImg} />
          </VStack>
          <TextField size={'sm'} control={form.control} name="title" label="Title" placeholder="Title" fullWidth />

          <TextAreaField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Description"
            fullWidth
          />

          <TextField size={'sm'} control={form.control} name="price" label="Price" placeholder="Price" fullWidth />

          <TextField
            size={'sm'}
            control={form.control}
            name="discount"
            label="Discount"
            placeholder="Discount"
            fullWidth
          />

          <TextField size={'sm'} control={form.control} name="stock" label="Stock" placeholder="Stock" fullWidth />

          <SelectField
            className="h-11"
            fullWidth
            control={form.control}
            label="Author"
            name="authorId"
            data={authorSelectOptions}
            placeholder="Author"
          />

          <SelectField
            className="h-11"
            fullWidth
            control={form.control}
            label="Category"
            name="categoryId"
            data={categorySelectOptions}
            placeholder="Category"
          />

          <SelectField
            className="h-11"
            fullWidth
            control={form.control}
            label="Publisher"
            name="publisherId"
            data={publisherSelectOptions}
            placeholder="Publisher"
          />

          <AlertDialogFooter>
            <Button type="button" variant={'outline'} onClick={handleCloseDialog}>
              Close
            </Button>

            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Create
            </Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookDialog;
