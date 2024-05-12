import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllCategory } from '@/hooks/category/useGetAllCategory';
import { type NextPageWithLayout } from '@/types';

import CategoryManagementFilter from './components/CategoryManagementFilter';
import CategoryManagementTable from './components/CategoryManagementTable';
import CreateCategoryDialog from './components/CreateCategoryDialog';

const CategoryManagementPage: NextPageWithLayout = () => {
  const { categoryList, paging, handleSearchChange, onPageChange, isLoading, refetch } = useGetAllCategory();

  return (
    <VStack>
      <CreateCategoryDialog refetch={refetch} />

      <CategoryManagementFilter handleSearchChange={handleSearchChange} />

      <CategoryManagementTable
        data={categoryList}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetch}
      />
    </VStack>
  );
};

export default CategoryManagementPage;
