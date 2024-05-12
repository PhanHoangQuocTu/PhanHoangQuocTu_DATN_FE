import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deletePublisherRequest } from '@/api/publisher';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { usePublisherManagementStore } from '@/stores/PublisherManagementStore';
import { type FCC } from '@/types';

interface Props {
  publisherId: number;
  refetch: () => void;
}
const DeletePublisherDialog: FCC<Props> = ({ children, publisherId, refetch }) => {
  const setPublisherDeleteId = usePublisherManagementStore.use.setPublisherDeleteId();
  const publisherDeleteId = usePublisherManagementStore.use.publisherDeleteId();

  const handleCloseDialog = () => {
    setPublisherDeleteId('');
  };

  const { mutate: deletePublisher } = useMutation(deletePublisherRequest, {
    onSuccess: () => {
      toast.success('Delete publisher successfully!');
      handleCloseDialog();
      refetch();
    },
  });

  const handleDeletePublisher = () => {
    deletePublisher({ id: String(publisherId) });
  };

  return (
    <Dialog open={+publisherDeleteId === publisherId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this category?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleDeletePublisher}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePublisherDialog;
