import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deleteCategoryRequest } from '@/api/category';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCategoryManagementStore } from '@/stores/CategoryManagementStore';
import { type FCC } from '@/types';

interface Props {
  categoryId: number;
  refetch: () => void;
}
const DeleteCategoryDialog: FCC<Props> = ({ children, categoryId, refetch }) => {
  const setCategoryDeleteId = useCategoryManagementStore.use.setCategoryDeleteId();
  const categoryDeleteId = useCategoryManagementStore.use.categoryDeleteId();

  const handleCloseDialog = () => {
    setCategoryDeleteId('');
  };

  const { mutate: deleteCategory } = useMutation(deleteCategoryRequest, {
    onSuccess: () => {
      toast.success('Delete category successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleDeleteCategory = () => {
    deleteCategory({ id: +categoryId });
  };

  return (
    <Dialog open={+categoryDeleteId === categoryId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this category?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleDeleteCategory}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
