import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deleteProductRequest } from '@/api/product';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useBookManagementStore } from '@/stores/BookManagementStore';
import { type FCC } from '@/types';

interface Props {
  bookId: number;
  refetch: () => void;
}
const DeleteBookDialog: FCC<Props> = ({ children, bookId, refetch }) => {
  const bookDeleteId = useBookManagementStore.use.bookDeleteId();
  const setBookDeleteId = useBookManagementStore.use.setBookDeleteId();

  const handleCloseDialog = () => {
    setBookDeleteId('');
  };

  const { mutate: deleteBook } = useMutation(deleteProductRequest, {
    onSuccess: () => {
      toast.success('Delete book successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleDeleteBook = () => {
    deleteBook({ id: +bookId });
  };

  return (
    <Dialog open={+bookDeleteId === bookId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this book?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleDeleteBook}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookDialog;
