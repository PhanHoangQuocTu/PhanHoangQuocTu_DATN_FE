import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllAuthor } from '@/hooks/author/useGetAllAuthor';
import { type NextPageWithLayout } from '@/types';

import AuthorManagementFilter from './components/AuthorManagementFilter';
import AuthorManagementTable from './components/AuthorManagementTable';
import CreateAuthorDialog from './components/CreateAuthorDialog';

const AuthorManagementPage: NextPageWithLayout = () => {
  const { authorList, paging, handleSearchChange, onPageChange, isLoading, refetch } = useGetAllAuthor();

  return (
    <VStack>
      <CreateAuthorDialog refetch={refetch} />

      <AuthorManagementFilter handleSearchChange={handleSearchChange} />

      <AuthorManagementTable
        data={authorList}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetch}
      />
    </VStack>
  );
};

export default AuthorManagementPage;
