import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { deletePostRequest } from '@/api/post';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { onMutateError } from '@/lib/common';
import { usePostManagementStore } from '@/stores/PostManagementStore';
import { type FCC } from '@/types';

interface Props {
  postId: number;
  refetch: () => void;
}
const DeletePostDialog: FCC<Props> = ({ children, postId, refetch }) => {
  const setPostDeleteId = usePostManagementStore.use.setPostDeleteId();
  const postDeleteId = usePostManagementStore.use.postDeleteId();

  const handleCloseDialog = () => {
    setPostDeleteId('');
  };

  const { mutate: deletePost } = useMutation(deletePostRequest, {
    onSuccess: () => {
      refetch();
      toast.success('Delete post successfully!');
      handleCloseDialog();
    },
    onError: onMutateError,
  });

  const handleDeletePost = () => {
    deletePost({ id: String(postId) });
  };

  return (
    <Dialog open={+postDeleteId === postId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to delete this post?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button variant={'destructive'} onClick={handleDeletePost}>
              Yes
            </Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
