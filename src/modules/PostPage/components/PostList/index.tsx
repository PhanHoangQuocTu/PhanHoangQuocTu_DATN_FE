import React from 'react';

import { PaginationList } from '@/components/pagination';
import { ShadowContainer } from '@/components/ShadowContainer';
import { VStack } from '@/components/ui/Utilities';
import { useGetAllPost } from '@/hooks/post/useGetAllPost';

import PostFilter from '../PostFilter';
import CreatePost from './CreatePost';
import CreatePostDialog from './CreatePostDialog';
import PostApprovedItem from './PostApprovedItem';

const PostList = () => {
  const { postList, paging, onPageChange, refetch, handleSearchChange } = useGetAllPost(4, 'true');

  React.useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  return (
    <VStack className="col-span-2">
      <CreatePostDialog refetch={refetch} />

      <CreatePost />

      <ShadowContainer className="flex-1 space-y-5">
        <PostFilter handleSearchChange={handleSearchChange} />
        <VStack className="min-h-[60rem]">
          {postList?.map((post) => (
            <PostApprovedItem post={post} key={post.id} />
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
    </VStack>
  );
};

export default PostList;
