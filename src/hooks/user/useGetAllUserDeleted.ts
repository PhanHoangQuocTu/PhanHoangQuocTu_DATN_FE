import React from 'react';

import { useGetAllUserDeletedQuery } from '@/api/user/queries';
import { type UserManagementFilterType } from '@/modules/UserManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllUserDeleted = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<UserManagementFilterType>(
    limit,
    {
      search: '',
      isActive: undefined,
    }
  );

  const isActiveValue = React.useMemo(() => {
    if (!filter.isActive) return undefined;

    switch (filter.isActive) {
      case 'true':
        return true;
      default:
        return false;
    }
  }, [filter.isActive]);

  const { data, ...rest } = useGetAllUserDeletedQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
      isActive: isActiveValue,
    },
  });

  React.useEffect(() => {
    if (!data?.users) return;

    if (data?.users.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.users, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: UserManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  return {
    data,
    userList: data?.users ?? [],
    meta: data?.meta,
    paging,
    onTotalItemsChange,
    onPageChange,
    handleFilterChange,
    handleSearchChange,
    filter,
    ...rest,
  };
};
