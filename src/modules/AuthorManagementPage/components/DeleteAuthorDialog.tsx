import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deleteAuthorRequest } from '@/api/author';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuthorManagementStore } from '@/stores/AuthorManagementStore';
import { type FCC } from '@/types';

interface Props {
  authorId: number;
  refetch: () => void;
}
const DeleteAuthorDialog: FCC<Props> = ({ children, authorId, refetch }) => {
  const setAuthorDeleteId = useAuthorManagementStore.use.setAuthorDeleteId();
  const authorDeleteId = useAuthorManagementStore.use.authorDeleteId();

  const handleCloseDialog = () => {
    setAuthorDeleteId('');
  };

  const { mutate: deleteAuthor } = useMutation(deleteAuthorRequest, {
    onSuccess: () => {
      toast.success('Delete author successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleDeleteAuthor = () => {
    deleteAuthor({ id: String(authorId) });
  };

  return (
    <Dialog open={+authorDeleteId === authorId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this author?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleDeleteAuthor}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAuthorDialog;
