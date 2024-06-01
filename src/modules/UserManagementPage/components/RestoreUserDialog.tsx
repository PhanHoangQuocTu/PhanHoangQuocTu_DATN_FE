import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { restoreUserRequest } from '@/api/user';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUserManagementStore } from '@/stores/UserManagementStore';
import { type FCC } from '@/types';

interface Props {
  userId: number;
  refetch: () => void;
}
const RestoreUserDialog: FCC<Props> = ({ children, userId, refetch }) => {
  const setUserRestoreId = useUserManagementStore.use.setUserRestoreId();
  const userRestoreId = useUserManagementStore.use.userRestoreId();

  const handleCloseDialog = () => {
    setUserRestoreId('');
  };

  const { mutate: restoreUser } = useMutation(restoreUserRequest, {
    onSuccess: () => {
      toast.success('Restore user successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleRestoreUser = () => {
    restoreUser({ id: +userId });
  };

  return (
    <Dialog open={+userRestoreId === userId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to restore this user?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleRestoreUser}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreUserDialog;
