import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deleteUserRequest } from '@/api/user';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUserManagementStore } from '@/stores/UserManagementStore';
import { type FCC } from '@/types';

interface Props {
  userId: number;
  refetch: () => void;
}
const DeleteUserDialog: FCC<Props> = ({ children, userId, refetch }) => {
  const setUserDeleteId = useUserManagementStore.use.setUserDeleteId();
  const userDeleteId = useUserManagementStore.use.userDeleteId();

  const handleCloseDialog = () => {
    setUserDeleteId('');
  };

  const { mutate: deleteUser } = useMutation(deleteUserRequest, {
    onSuccess: () => {
      toast.success('Delete user successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleDeleteUser = () => {
    deleteUser({ id: +userId });
  };

  return (
    <Dialog open={+userDeleteId === userId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this user?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleDeleteUser}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
