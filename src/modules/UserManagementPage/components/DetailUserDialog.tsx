import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useGetUserDetailQuery } from '@/api/user/queries';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { TextField } from '@/components/ui/FormField';
import { useUserManagementStore } from '@/stores/UserManagementStore';
import { type FCC } from '@/types';

import { userDetailSchema, type UserDetailType } from '../types/schema';

interface Props {
  userId: number;
}
const DetailUserDialog: FCC<Props> = ({ children, userId }) => {
  const setUserDetailId = useUserManagementStore.use.setUserDetailId();
  const userDetailId = useUserManagementStore.use.userDetailId();

  const form = useForm<UserDetailType>({
    resolver: zodResolver(userDetailSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      gender: '',
      dateOfBirth: '',
    },
  });

  const handleCloseDialog = () => {
    setUserDetailId('');
  };

  const { data: userDetail, isSuccess } = useGetUserDetailQuery({
    variables: {
      id: userId,
    },
    enabled: +userDetailId === userId,
  });

  React.useEffect(() => {
    if (isSuccess) {
      form.reset({
        address: userDetail?.address || '',
        dateOfBirth: userDetail?.dateOfBirth ? format(new Date(userDetail?.dateOfBirth), 'yyyy-MM-dd') : '',
        email: userDetail?.email,
        firstName: userDetail?.firstName,
        gender: userDetail?.gender || '',
        lastName: userDetail?.lastName,
        phoneNumber: userDetail?.phoneNumber,
      });
    }
  }, [form, isSuccess, userDetail]);

  const handleSubmit: SubmitHandler<UserDetailType> = async () => {};

  return (
    <Dialog open={+userDetailId === userId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">User Detail</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit}>
          <TextField
            disabled
            control={form.control}
            name="firstName"
            label="First Name"
            placeholder="First Name"
            fullWidth
          />

          <TextField
            disabled
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            fullWidth
          />

          <TextField disabled control={form.control} name="email" label="Email" placeholder="Email" fullWidth />

          <TextField
            disabled
            control={form.control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            fullWidth
          />

          <TextField disabled control={form.control} name="gender" label="Gender" placeholder="Gender" fullWidth />

          <TextField
            type="date"
            disabled
            control={form.control}
            name="dateOfBirth"
            label="Date Of Birth"
            placeholder="Date Of Birth"
            fullWidth
          />

          <TextField disabled control={form.control} name="address" label="Address" placeholder="Address" fullWidth />
        </FormWrapper>
        <AlertDialogFooter>
          <Button variant={'outline'} onClick={handleCloseDialog}>
            Close
          </Button>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailUserDialog;
