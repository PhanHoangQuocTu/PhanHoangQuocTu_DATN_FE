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

  const { authorSelectOptions } = useGetAllAuthor(limit_infinite);
  const { categorySelectOptions } = useGetAllCategory(limit_infinite);
  const { publisherSelectOptions } = useGetAllPublisher(limit_infinite);
  const { url } = useUploadBookImg();
  const form = useForm<HandleBookManagementType>({
    resolver: zodResolver(handleBookManagementSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setBookEditId('');
    setIsCreate(false);
  };

  const { mutate: createBook } = useMutation(createProductRequest, {
    onSuccess: () => {
      toast.success('Create book successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandleBookManagementType> = async (formData) => {
    const formValue = {
      title: formData.title,
      description: formData.description,
      price: +formData.price,
      stock: +formData.stock,
      authorId: +formData.authorId,
      publisherId: +formData.publisherId,
      categoryId: +formData.categoryId,
      images: [url],
    };

    createBook(formValue);
  };

  const handleChangeProductImg = (file: File | null) => {
    setProductImg(file);
  };

  return (
    <Dialog open={isCreate && !bookEditId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Create Category</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <VStack spacing={4}>
            <InputFile className="w-full h-20" onChange={handleChangeProductImg} preview={productImg} />
            <label className="text-sm font-medium">Book Image</label>
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

            <Button type="submit">Create</Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookDialog;
