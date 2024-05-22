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
import { TextAreaField, TextField } from '@/components/ui/FormField';
import { InputFile } from '@/components/ui/inputFile';
import { VStack } from '@/components/ui/Utilities';
import { usePostStore } from '@/stores/PostStore';
import { type FCC } from '@/types';

import { useUploadPostImg } from '../../hooks/useUploadPostImg';
import { handlePostSchema, type HandlePostType } from '../../types/schema';

interface Props {
  refetch: () => void;
  bookId: number;
}

const EditPostDialog: FCC<Props> = ({ children, refetch, bookId }) => {
  const postEditId = usePostStore.use.postEditId();
  const isEdit = usePostStore.use.isEdit();
  const setPostEditId = usePostStore.use.setPostEditId();
  const setIsCreate = usePostStore.use.setIsCreate();
  const setIsEdit = usePostStore.use.setIsEdit();
  const postImg = usePostStore.use.postImg();
  const setPostImg = usePostStore.use.setPostImg();
  const { url } = useUploadPostImg();

  const { data, isSuccess } = useGetDetailProductQuery({
    variables: {
      id: bookId,
    },
    enabled: !!bookId && !!postEditId && isEdit,
  });

  const form = useForm<HandlePostType>({
    resolver: zodResolver(handlePostSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setPostEditId('');
    setIsEdit(false);
    setIsCreate(false);
    setPostImg('');
    form.reset({
      title: '',
      description: '',
    });
  };

  const { mutate: editProduct } = useMutation(editProductRequest, {
    onSuccess: () => {
      toast.success('Update book successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandlePostType> = async (formData) => {
    const bookImage = typeof postImg === 'string' ? postImg : url;

    const formValue = {
      title: formData.title,
      description: formData.description,
      images: [bookImage],
    };
  };

  const handleChangePostImg = (file: File | null) => {
    setPostImg(file);
  };

  React.useEffect(() => {
    if (isSuccess) {
      form.reset({
        title: data?.title,
        description: data?.description,
      });

      if (data?.images?.length > 0) {
        setPostImg(data?.images[0]);
      }
    }
  }, [data, form, isSuccess, setPostImg]);

  return (
    <Dialog open={+postEditId === bookId && isEdit} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Create Post</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <VStack spacing={4}>
            <InputFile className="w-full h-20" onChange={handleChangePostImg} preview={postImg} />
            <label className="text-sm font-medium">Post Image</label>
          </VStack>
          <TextField size={'sm'} control={form.control} name="title" label="Title" placeholder="Title" fullWidth />

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

export default EditPostDialog;
