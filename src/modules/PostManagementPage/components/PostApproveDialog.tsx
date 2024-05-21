import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

import { approvePostRequest } from '@/api/post';
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
const PostApproveDialog: FCC<Props> = ({ children, postId, refetch }) => {
  const setPostApproveId = usePostManagementStore.use.setPostApproveId();
  const postApproveId = usePostManagementStore.use.postApproveId();

  const handleCloseDialog = () => {
    setPostApproveId('');
  };

  const { mutate: approve } = useMutation(approvePostRequest, {
    onSuccess: () => {
      toast.success('Approve post successfully!');
      handleCloseDialog();
      refetch();
    },
    onError: onMutateError,
  });
  const handleApprovePost = () => {
    approve({
      id: String(postId),
    });
  };

  return (
    <Dialog open={+postApproveId === postId} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem]">
        <AlertDialogHeader className="text-2xl font-semibold">Notification</AlertDialogHeader>

        <span>Do you want to approve this post?</span>
        <AlertDialogFooter>
          <div className="space-x-3">
            <Button variant={'outline'} onClick={handleCloseDialog}>
              Back
            </Button>

            <Button onClick={handleApprovePost}>Yes</Button>
          </div>
        </AlertDialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostApproveDialog;
