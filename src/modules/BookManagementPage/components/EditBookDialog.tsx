import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { editProductRequest } from '@/api/product';
import { useGetDetailProductQuery } from '@/api/product/queries';
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
  bookId: number;
}

const EditBookDialog: FCC<Props> = ({ children, refetch, bookId }) => {
  const bookEditId = useBookManagementStore.use.bookEditId();
  const isEdit = useBookManagementStore.use.isEdit();
  const setBookEditId = useBookManagementStore.use.setBookEditId();
  const setIsCreate = useBookManagementStore.use.setIsCreate();
  const setIsEdit = useBookManagementStore.use.setIsEdit();
  const productImg = useBookManagementStore.use.productImg();
  const setProductImg = useBookManagementStore.use.setProductImg();

  const { authorSelectOptions } = useGetAllAuthor(limit_infinite);
  const { categorySelectOptions } = useGetAllCategory(limit_infinite);
  const { publisherSelectOptions } = useGetAllPublisher(limit_infinite);
  const { url, isLoading } = useUploadBookImg();

  const {
    data,
    isSuccess,
    refetch: refetchProductDetail,
  } = useGetDetailProductQuery({
    variables: {
      id: bookId,
    },
    enabled: !!bookId,
  });

  const form = useForm<HandleBookManagementType>({
    resolver: zodResolver(handleBookManagementSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setBookEditId('');
    setIsEdit(false);
    setIsCreate(false);
  };

  const { mutate: editProduct } = useMutation(editProductRequest, {
    onSuccess: () => {
      toast.success('Update book successfully!');
      refetchProductDetail();
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandleBookManagementType> = async (formData) => {
    const bookImage = typeof productImg === 'string' ? productImg : url;

    const formValue = {
      title: formData.title,
      description: formData.description,
      price: +formData.price,
      discount: +formData.discount,
      stock: +formData.stock,
      authorId: +formData.authorId,
      publisherId: +formData.publisherId,
      categoryId: +formData.categoryId,
      images: [bookImage],
    };

    editProduct({
      params: { id: +bookEditId },
      body: formValue,
    });
  };

  const handleChangeProductImg = (file: File | null) => {
    if (isEdit) {
      setProductImg(file);
    }
  };

  React.useEffect(() => {
    if (isSuccess && +bookEditId === bookId) {
      form.reset({
        title: data?.title,
        description: data?.description,
        price: Number(data?.price),
        discount: Number(data?.discount),
        stock: data?.stock,
        authorId: String(data?.author?.id),
        publisherId: String(data?.publisher?.id),
        categoryId: String(data?.category?.id),
      });

      if (data?.images?.length > 0) {
        setProductImg(data?.images[0]);
      }
    }
  }, [bookEditId, bookId, data, form, isSuccess, setProductImg]);

  return (
    <Dialog open={+bookEditId === bookId && isEdit} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Edit Book</AlertDialogHeader>

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
              Save
            </Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookDialog;
