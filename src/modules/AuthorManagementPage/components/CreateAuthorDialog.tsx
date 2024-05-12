import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createAuthorRequest } from '@/api/author';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextField } from '@/components/ui/FormField';
import { useAuthorManagementStore } from '@/stores/AuthorManagementStore';
import { type FCC } from '@/types';

import { handleAuthorManagementSchema, type HandleAuthorManagementType } from '../types/schema';

interface Props {
  refetch: () => void;
}

const CreateAuthorDialog: FCC<Props> = ({ children, refetch }) => {
  const authorEditId = useAuthorManagementStore.use.authorEditId();
  const isCreate = useAuthorManagementStore.use.isCreate();
  const setAuthorEditId = useAuthorManagementStore.use.setAuthorEditId();
  const setIsCreate = useAuthorManagementStore.use.setIsCreate();

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
    setIsCreate(false);
  };

  const { mutate: createCategory } = useMutation(createAuthorRequest, {
    onSuccess: () => {
      toast.success('Create author successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleSubmit: SubmitHandler<HandleAuthorManagementType> = async (formData) => {
    const formValue = {
      name: formData.name,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
    };

    createCategory(formValue);
  };

  return (
    <Dialog open={isCreate && !authorEditId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Create Category</AlertDialogHeader>

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

            <Button type="submit">Create</Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAuthorDialog;
