import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { removeRoleRequest } from '@/api/user';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAdminManagementStore } from '@/stores/AdminManagementStore';
import { type FCC } from '@/types';

interface Props {
  userId: number;
  refetch: () => void;
}
const DeleteRoleDialog: FCC<Props> = ({ children, userId, refetch }) => {
  const setUserDeleteId = useAdminManagementStore.use.setUserDeleteId();
  const userDeleteId = useAdminManagementStore.use.userDeleteId();

  const handleCloseDialog = () => {
    setUserDeleteId('');
  };

  const { mutate: deleteRole, isLoading } = useMutation(removeRoleRequest, {
    onSuccess: () => {
      toast.success('Delete role successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleDeleteRole = () => {
    deleteRole({
      body: {
        role: 'admin',
      },
      params: {
        id: Number(userId),
      },
    });
  };

  return (
    <Dialog open={+userDeleteId === userId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this role?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button disabled={isLoading} variant={'destructive'} onClick={handleDeleteRole}>
              Yes
            </Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoleDialog;
