import React from 'react';

import { PostManagementLayout } from '@/components/layouts/PostManagementLayout';
import { VStack } from '@/components/ui/Utilities';
import { useGetAllPost } from '@/hooks/post/useGetAllPost';
import { type NextPageWithLayout } from '@/types';

import PostManagementFilter from './components/PostManagementFilter';
import PostManagementTable from './components/PostManagementTable';

const PostManagementPage: NextPageWithLayout = () => {
  const { postList, paging, handleSearchChange, onPageChange, isLoading, refetch } = useGetAllPost();

  return (
    <VStack>
      <PostManagementFilter handleSearchChange={handleSearchChange} />

      <PostManagementTable
        data={postList}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetch}
      />
    </VStack>
  );
};

export default PostManagementPage;

PostManagementPage.getLayout = (page) => {
  return <PostManagementLayout>{page}</PostManagementLayout>;
};
