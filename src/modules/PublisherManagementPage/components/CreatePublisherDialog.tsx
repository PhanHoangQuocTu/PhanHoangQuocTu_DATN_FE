import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createPublisherRequest } from '@/api/publisher';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { TextAreaField, TextField } from '@/components/ui/FormField';
import { usePublisherManagementStore } from '@/stores/PublisherManagementStore';
import { type FCC } from '@/types';

import { handlePublisherManagementSchema, type HandlePublisherManagementType } from '../types/schema';

interface Props {
  refetch: () => void;
}

const CreatePublisherDialog: FCC<Props> = ({ children, refetch }) => {
  const publisherEditId = usePublisherManagementStore.use.publisherEditId();
  const isCreate = usePublisherManagementStore.use.isCreate();
  const setPublisherEditId = usePublisherManagementStore.use.setPublisherEditId();
  const setIsCreate = usePublisherManagementStore.use.setIsCreate();

  const form = useForm<HandlePublisherManagementType>({
    resolver: zodResolver(handlePublisherManagementSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setPublisherEditId('');
    setIsCreate(false);
  };

  const { mutate: createPublisher } = useMutation(createPublisherRequest, {
    onSuccess: () => {
      toast.success('Create category successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandlePublisherManagementType> = async (formData) => {
    const formValue = {
      name: formData.name,
      description: formData.description,
    };

    createPublisher(formValue);
  };

  return (
    <Dialog open={isCreate && !publisherEditId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Create Category</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <TextField control={form.control} name="name" label="Name" placeholder="Name" fullWidth />

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

export default CreatePublisherDialog;
