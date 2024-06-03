import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createPostRequest } from '@/api/post';
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
}

const CreatePostDialog: FCC<Props> = ({ children, refetch }) => {
  const postEditId = usePostStore.use.postEditId();
  const isCreate = usePostStore.use.isCreate();
  const setPostEditId = usePostStore.use.setPostEditId();
  const setIsCreate = usePostStore.use.setIsCreate();
  const postImg = usePostStore.use.postImg();
  const setPostImg = usePostStore.use.setPostImg();

  const { url } = useUploadPostImg();
  const form = useForm<HandlePostType>({
    resolver: zodResolver(handlePostSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setPostEditId('');
    setPostImg('');
    setIsCreate(false);
    form.reset({
      title: '',
      description: '',
    });
  };

  const { mutate: createPost } = useMutation(createPostRequest, {
    onSuccess: () => {
      toast.success('Create post successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandlePostType> = async (formData) => {
    const formValue = {
      title: formData.title,
      description: formData.description,
      images: [url],
    };

    createPost(formValue);
  };

  const handleChangeProductImg = (file: File | null) => {
    setPostImg(file);
  };

  return (
    <Dialog open={isCreate && !postEditId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Create Post</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <VStack spacing={4}>
            <label className="text-sm font-medium">Post Image</label>
            <InputFile className="w-full h-[20rem]" onChange={handleChangeProductImg} preview={postImg} />
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

            <Button type="submit">Create</Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
