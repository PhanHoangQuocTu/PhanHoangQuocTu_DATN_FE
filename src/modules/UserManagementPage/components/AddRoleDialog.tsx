import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { addRoleRequest } from '@/api/user';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useUserManagementStore } from '@/stores/UserManagementStore';
import { type FCC } from '@/types';

interface Props {
  userId: number;
  refetch: () => void;
}
const AddRoleDialog: FCC<Props> = ({ children, userId, refetch }) => {
  const setUserAddRoleId = useUserManagementStore.use.setUserAddRoleId();
  const userAddRoleId = useUserManagementStore.use.userAddRoleId();

  const handleCloseDialog = () => {
    setUserAddRoleId('');
  };

  const { mutate: addRole, isLoading } = useMutation(addRoleRequest, {
    onSuccess: () => {
      toast.success('Delete user successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleAddRole = () => {
    addRole({ body: { role: 'admin' }, params: { id: Number(userId) } });
  };

  return (
    <Dialog open={+userAddRoleId === userId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to add role admin to this user?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button disabled={isLoading} onClick={handleAddRole}>
              Yes
            </Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoleDialog;
