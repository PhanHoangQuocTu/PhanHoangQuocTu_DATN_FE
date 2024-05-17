import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createReviewRequest } from '@/api/review';
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormWrapper } from '@/components/ui/form';
import { SelectField, TextAreaField } from '@/components/ui/FormField';
import { useGetReviewByBookId } from '@/hooks/review/useGetReviewByBookId';
import { useIntersectionStore } from '@/stores';
import { type FCC } from '@/types';

import { DEFAULT_FORM_REVIEW, RATING_OPTIONS } from '../../types/const';
import { createBookReviewSchema, type CreateBookReviewType } from '../../types/schema';

const CreateBookReviewDialog: FCC = ({ children }) => {
  const params = useParams();
  const { bookId } = params;
  const targetInView = useIntersectionStore.use.targetInView();
  const setTargetInView = useIntersectionStore.use.setTargetInView();
  const form = useForm<CreateBookReviewType>({
    resolver: zodResolver(createBookReviewSchema),
    defaultValues: DEFAULT_FORM_REVIEW,
  });

  const { refetch } = useGetReviewByBookId();

  const handleCloseDialog = () => {
    setTargetInView('');
    form.reset(DEFAULT_FORM_REVIEW);
  };

  const { mutate: createReview } = useMutation(createReviewRequest, {
    onSuccess: () => {
      toast.success('Create review successfully!');
      refetch();
      handleCloseDialog();
    },
  });

  const handleSubmit: SubmitHandler<CreateBookReviewType> = async (formData) => {
    createReview({
      productId: Number(bookId),
      comment: formData.comment,
      ratings: Number(formData.ratings),
    });
  };

  return (
    <Dialog open={targetInView === 'createReview'} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[35rem] max-h-[30rem] overflow-auto">
        <AlertDialogHeader className="text-2xl font-semibold">Write your review</AlertDialogHeader>

        <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
          <SelectField
            className="h-11"
            fullWidth
            control={form.control}
            label="Ratings"
            name="ratings"
            data={RATING_OPTIONS}
            placeholder="Ratings"
          />

          <TextAreaField control={form.control} name="comment" label="Comment" placeholder="Comment" fullWidth />

          <AlertDialogFooter>
            <Button type="button" variant={'outline'} onClick={handleCloseDialog}>
              Close
            </Button>

            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBookReviewDialog;
