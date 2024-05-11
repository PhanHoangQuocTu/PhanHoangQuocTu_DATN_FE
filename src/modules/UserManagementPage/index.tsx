import React from 'react';

import { VStack } from '@/components/ui/Utilities';
import { useGetAllUser } from '@/hooks/user/useGetAllUser';
import { type NextPageWithLayout } from '@/types';

import UserManagementFilter from './components/UserManagementFilter';
import UserManagementTable from './components/UserManagementTable';

const UserManagementPage: NextPageWithLayout = () => {
  const { userList, isLoading, paging, onPageChange, handleSearchChange } = useGetAllUser();

  return (
    <VStack>
      <UserManagementFilter handleSearchChange={handleSearchChange} />

      <UserManagementTable data={userList} paging={paging} isLoading={isLoading} onPageChange={onPageChange} />
    </VStack>
  );
};

export default UserManagementPage;
