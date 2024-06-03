import React from 'react';

import { type IGetCommentByPostIdResponse } from '@/api/comment';
import { ShadowContainer } from '@/components/ShadowContainer';

import CommentItem from './CommentItem';

interface Props {
  commentList: IGetCommentByPostIdResponse | undefined;
  refetchComment: () => void;
}

const CommentContainer: React.FC<Props> = ({ commentList, refetchComment }) => {
  return (
    <ShadowContainer>
      {commentList?.comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} refetch={refetchComment} />
      ))}
    </ShadowContainer>
  );
};

export default CommentContainer;
