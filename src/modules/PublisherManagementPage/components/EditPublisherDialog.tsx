import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { editPublisherRequest } from '@/api/publisher';
import { useGetDetailPublisherQuery } from '@/api/publisher/queries';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { TextAreaField, TextField } from '@/components/ui/FormField';
import { usePublisherManagementStore } from '@/stores/PublisherManagementStore';
import { type FCC } from '@/types';

import { handlePublisherManagementSchema, type HandlePublisherManagementType } from '../types/schema';

interface Props {
  publisherId: number;
  refetch: () => void;
}

const EditPublisherDialog: FCC<Props> = ({ children, publisherId, refetch }) => {
  const publisherEditId = usePublisherManagementStore.use.publisherEditId();
  const isEdit = usePublisherManagementStore.use.isEdit();
  const setPublisherEditId = usePublisherManagementStore.use.setPublisherEditId();
  const setIsEdit = usePublisherManagementStore.use.setIsEdit();

  const form = useForm<HandlePublisherManagementType>({
    resolver: zodResolver(handlePublisherManagementSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleCloseDialog = () => {
    setPublisherEditId('');
    setIsEdit(false);
  };

  const { mutate: updatePublisher } = useMutation(editPublisherRequest, {
    onSuccess: () => {
      toast.success('Update category successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const { data: publisherDetail, isSuccess } = useGetDetailPublisherQuery({
    variables: {
      id: String(publisherId),
    },
    enabled: !!publisherEditId && isEdit && +publisherEditId === publisherId,
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.reset({
        name: publisherDetail?.name || '',
        description: publisherDetail?.description || '',
      });
    }
  }, [publisherDetail, form, isSuccess]);

  const handleSubmit: SubmitHandler<HandlePublisherManagementType> = async (formData) => {
    const formValue = {
      name: formData.name,
      description: formData.description,
    };

    updatePublisher({
      params: {
        id: publisherEditId,
      },
      body: formValue,
    });
  };

  return (
    <Dialog open={isEdit && +publisherEditId === publisherId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Edit Category</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <TextField control={form.control} name="name" label="Title" placeholder="Title" fullWidth />

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

export default EditPublisherDialog;
