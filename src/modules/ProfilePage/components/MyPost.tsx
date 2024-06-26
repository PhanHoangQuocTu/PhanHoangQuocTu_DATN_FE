import React from 'react';

import TransitionLayout from '@/components/custom/TransitionLayout';
import { PaginationList } from '@/components/pagination';
import PostItem from '@/components/PostItem';
import { ShadowContainer } from '@/components/ShadowContainer';
import { Show, VStack } from '@/components/ui/Utilities';
import { useGetAllPostByMe } from '@/hooks/post/useGetAllPostByMe';
import BookNoData from '@/modules/BooksPage/components/BookNoData';

const MyPost = () => {
  const { postList, paging, onPageChange, isSuccess, refetch } = useGetAllPostByMe(3);

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  return (
    <TransitionLayout>
      <ShadowContainer>
        <Show when={!postList?.length && isSuccess}>
          <BookNoData emptyText={'No Blog'} className="py-20" />
        </Show>

        <VStack className="min-h-screen">
          {postList?.map((post) => (
            <PostItem key={post.id} data={post} />
          ))}
        </VStack>

        {postList?.length > 0 && (
          <PaginationList
            pageSize={paging.limit}
            currentPage={paging.page}
            onPageChange={(newPage) => onPageChange(newPage)}
            siblingCount={1}
            totalCount={paging.total ?? 0}
          />
        )}
      </ShadowContainer>
    </TransitionLayout>
  );
};

export default MyPost;
