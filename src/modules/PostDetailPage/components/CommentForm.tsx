import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { commentPostRequest } from '@/api/comment';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { TextAreaField } from '@/components/ui/FormField';

import { handleCommentSchema, type HandleCommentType } from '../types/schema';

interface Props {
  refetch: () => void;
}

const CommentForm: React.FC<Props> = ({ refetch }) => {
  const { postId } = useParams();

  const form = useForm<HandleCommentType>({
    resolver: zodResolver(handleCommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const { mutate: comment } = useMutation(commentPostRequest, {
    onSuccess: () => {
      refetch();
      form.reset();
    },
  });

  const handleSubmit: SubmitHandler<HandleCommentType> = async (formData) => {
    comment({
      content: formData.content,
      postId: Number(postId),
    });
  };

  return (
    <FormWrapper form={form} onSubmit={handleSubmit} className="space-y-2">
      <TextAreaField control={form.control} name="content" placeholder="Please enter your comment" fullWidth />

      <Button type="submit">Comment</Button>
    </FormWrapper>
  );
};

export default CommentForm;
