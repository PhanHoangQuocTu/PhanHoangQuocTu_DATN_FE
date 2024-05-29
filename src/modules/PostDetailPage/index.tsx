import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { useGetCommentByPostIdQuery } from '@/api/comment/queries';
import { useGetAllPostByIdQuery } from '@/api/post/queries';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Show } from '@/components/ui/Utilities';
import { useAuth } from '@/hooks/useAuth';
import { limit_infinite } from '@/lib/const';
import { ROUTE } from '@/types';

import EditPostDialog from '../PostPage/components/PostList/EditPostDialog';
import CommentContainer from './components/CommentContainer';
import CommentForm from './components/CommentForm';
import DeletePostDialog from './components/DeletePostDialog';
import PostInfo from './components/PostInfo';

const PostAuthorInfo = dynamic(() => import('./components/PostAuthorInfo'), { ssr: false });

const PostDetailPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { postId } = useParams();
  const { data, refetch, isError } = useGetAllPostByIdQuery({
    variables: {
      id: String(postId),
    },
    enabled: !!postId,
  });

  const { data: commentList, refetch: refetchComment } = useGetCommentByPostIdQuery({
    variables: {
      postId: Number(postId),
      page: 1,
      limit: limit_infinite,
    },
    enabled: !!postId,
  });

  React.useEffect(() => {
    if (isError) {
      router.replace(ROUTE.POST);
    }
  }, [isError, router]);

  return (
    <div className="container py-8 space-y-10">
      <EditPostDialog postId={String(data?.id)} refetch={refetch} />
      <DeletePostDialog postId={data?.id as number} refetch={refetch} />

      <ShadowContainer className="space-y-5">
        <PostAuthorInfo data={data} />

        <PostInfo data={data} refetch={refetch} />
      </ShadowContainer>

      <Show when={isLoggedIn && data?.isApproved}>
        {!!commentList?.comments?.length && (
          <CommentContainer commentList={commentList} refetchComment={refetchComment} />
        )}

        <CommentForm refetch={refetchComment} />
      </Show>

      <Show when={!isLoggedIn}>
        <span className="text-base font-medium leading-loose">
          You need to be{' '}
          <Link href={ROUTE.LOGIN} className="underline text-blue-600">
            sign in
          </Link>{' '}
          to comment
        </span>
      </Show>
    </div>
  );
};

export default PostDetailPage;
