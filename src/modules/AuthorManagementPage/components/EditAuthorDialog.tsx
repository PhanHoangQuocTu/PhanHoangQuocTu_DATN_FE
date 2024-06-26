import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { editAuthorRequest } from '@/api/author';
import { useGetDetailAuthorQuery } from '@/api/author/queries';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { useAuthorManagementStore } from '@/stores/AuthorManagementStore';
import { type FCC } from '@/types';

import { handleAuthorManagementSchema, type HandleAuthorManagementType } from '../types/schema';

interface Props {
  authorId: number;
  refetch: () => void;
}

const EditAuthorDialog: FCC<Props> = ({ children, authorId, refetch }) => {
  const authorEditId = useAuthorManagementStore.use.authorEditId();
  const isEdit = useAuthorManagementStore.use.isEdit();
  const setAuthorEditId = useAuthorManagementStore.use.setAuthorEditId();
  const setIsEdit = useAuthorManagementStore.use.setIsEdit();

  const form = useForm<HandleAuthorManagementType>({
    resolver: zodResolver(handleAuthorManagementSchema),
    defaultValues: {
      name: '',
      gender: '',
      dateOfBirth: '',
    },
  });

  const handleCloseDialog = () => {
    setAuthorEditId('');
    setIsEdit(false);
  };

  const { mutate: updateAuthor } = useMutation(editAuthorRequest, {
    onSuccess: () => {
      toast.success('Update author successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const { data: authorDetail, isSuccess } = useGetDetailAuthorQuery({
    variables: {
      id: String(authorId),
    },
    enabled: !!authorEditId && isEdit && +authorEditId === authorId,
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.reset({
        name: authorDetail?.name || '',
        gender: authorDetail?.gender || '',
        dateOfBirth: authorDetail?.dateOfBirth ? format(new Date(authorDetail?.dateOfBirth), 'yyyy-MM-dd') : '',
      });
    }
  }, [authorDetail, form, isSuccess]);

  const handleSubmit: SubmitHandler<HandleAuthorManagementType> = async (formData) => {
    const formValue = {
      name: formData.name,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
    };

    updateAuthor({
      params: {
        id: String(authorEditId),
      },
      body: formValue,
    });
  };

  return (
    <Dialog open={isEdit && +authorEditId === authorId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Edit Author</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <TextField size={'sm'} control={form.control} name="name" label="Name" placeholder="Name" fullWidth />

          <SelectField
            className="h-11"
            data={[
              {
                label: 'Male',
                value: 'Male',
              },
              {
                label: 'Female',
                value: 'Female',
              },
            ]}
            control={form.control}
            name="gender"
            label="Gender"
            placeholder="Gender"
            fullWidth
          />

          <TextField
            size={'sm'}
            type="date"
            control={form.control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Date of Birth"
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

export default EditAuthorDialog;
