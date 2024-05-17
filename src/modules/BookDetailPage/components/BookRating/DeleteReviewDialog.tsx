import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deleteReviewRequest } from '@/api/review';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useGetReviewByBookId } from '@/hooks/review/useGetReviewByBookId';
import { type FCC } from '@/types';

interface Props {
  id: string;
  reviewDeleteId: string;
  setReviewDeleteId: React.Dispatch<React.SetStateAction<string>>;
}

const DeleteReviewDialog: FCC<Props> = ({ id, children, reviewDeleteId, setReviewDeleteId }) => {
  const { refetch } = useGetReviewByBookId();

  const handleCloseDialog = () => {
    setReviewDeleteId('');
  };

  const { mutate: deleteReview } = useMutation(deleteReviewRequest, {
    onSuccess: () => {
      toast.success('Delete review successfully!');
      refetch();
      setReviewDeleteId('');
      handleCloseDialog();
    },
  });

  const handleDeleteReview = () => {
    deleteReview({ id });
  };

  return (
    <Dialog open={id === reviewDeleteId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span className="text-lg font-medium">Are you sure you want to delete this review?</span>
        <AlertDialogFooter>
          <Button type="button" variant={'outline'} onClick={handleCloseDialog}>
            Close
          </Button>

          <Button onClick={handleDeleteReview}>Delete</Button>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReviewDialog;
