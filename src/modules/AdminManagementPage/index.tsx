import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllAdmin } from '@/hooks/user/useGetAllAdmin';
import { type NextPageWithLayout } from '@/types';

import AdminManagementFilter from './components/AdminManagementFilter';
import AdminManagementTable from './components/AdminManagementTable';

const AdminManagementPage: NextPageWithLayout = () => {
  const { userList, isLoading, paging, onPageChange, handleSearchChange, refetch: refetchUserList } = useGetAllAdmin();

  return (
    <VStack>
      <AdminManagementFilter handleSearchChange={handleSearchChange} />

      <AdminManagementTable
        data={userList}
        paging={paging}
        isLoading={isLoading}
        onPageChange={onPageChange}
        refetch={refetchUserList}
      />
    </VStack>
  );
};

export default AdminManagementPage;
