import React from 'react';

import TabsV2 from '@/components/ui/Custom/TabV2';
import { Show, VStack } from '@/components/ui/Utilities';
import { useGetAllUser } from '@/hooks/user/useGetAllUser';
import { useGetAllUserDeleted } from '@/hooks/user/useGetAllUserDeleted';
import { type NextPageWithLayout } from '@/types';

import UserManagementFilter from './components/UserManagementFilter';
import UserManagementTable from './components/UserManagementTable';
import { USER_MANAGEMENT_TAB_OPTIONS, USER_MANAGEMENT_TAB_VALUE } from './types/const';

const UserManagementPage: NextPageWithLayout = () => {
  const [tab, setTab] = React.useState(USER_MANAGEMENT_TAB_VALUE.user);
  const { userList, isLoading, paging, onPageChange, handleSearchChange, refetch: refetchUserList } = useGetAllUser();
  const {
    userList: userListDeleted,
    isLoading: isLoadingDeleted,
    paging: pagingDeleted,
    onPageChange: onPageChangeDeleted,
    handleSearchChange: handleSearchChangeDeleted,
    refetch: refetchUserListDeleted,
  } = useGetAllUserDeleted();

  React.useEffect(() => {
    if (tab === USER_MANAGEMENT_TAB_VALUE.user) {
      refetchUserList();
      return;
    }

    refetchUserListDeleted();
  }, [refetchUserList, refetchUserListDeleted, tab]);

  return (
    <VStack>
      <TabsV2 data={USER_MANAGEMENT_TAB_OPTIONS} value={tab} onChange={setTab} />

      <Show when={USER_MANAGEMENT_TAB_VALUE.user === tab}>
        <VStack>
          <span className="text-3xl font-semibold">User Management</span>
          <UserManagementFilter handleSearchChange={handleSearchChange} />

          <UserManagementTable
            data={userList}
            paging={paging}
            isLoading={isLoading}
            onPageChange={onPageChange}
            refetch={refetchUserList}
          />
        </VStack>
      </Show>

      <Show when={USER_MANAGEMENT_TAB_VALUE.user !== tab}>
        <VStack>
          <span className="text-3xl font-semibold">User Deleted</span>
          <UserManagementFilter handleSearchChange={handleSearchChangeDeleted} />

          <UserManagementTable
            data={userListDeleted}
            paging={pagingDeleted}
            isLoading={isLoadingDeleted}
            onPageChange={onPageChangeDeleted}
            refetch={refetchUserListDeleted}
            isDeleted
          />
        </VStack>
      </Show>
    </VStack>
  );
};

export default UserManagementPage;
