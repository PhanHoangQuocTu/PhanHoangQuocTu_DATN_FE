import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllBook } from '@/hooks/product/useGetAllBook';
import { type NextPageWithLayout } from '@/types';

import BookManagementFilter from './components/BookManagementFilter';
import BookManagementTable from './components/BookManagementTable';
import CreateBookDialog from './components/CreateBookDialog';

const BookManagementPage: NextPageWithLayout = () => {
  const { productList, paging, handleSearchChange, onPageChange, isLoading, refetch } = useGetAllBook();

  return (
    <VStack>
      <CreateBookDialog refetch={refetch} />

      <BookManagementFilter handleSearchChange={handleSearchChange} />

      <BookManagementTable
        data={productList}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetch}
      />
    </VStack>
  );
};

export default BookManagementPage;
