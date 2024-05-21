import React from 'react';

import { useGetAllPostQuery } from '@/api/post/queries';
import { type PostManagementFilterType } from '@/modules/PostManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllPost = (limit = 10, defaultApprove = '') => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<PostManagementFilterType>(
    limit,
    {
      search: '',
      isApprove: defaultApprove,
    }
  );

  const isApproveValue = React.useMemo(() => {
    if (!filter.isApprove) return undefined;
    switch (filter.isApprove) {
      case 'true':
        return true;
      default:
        return false;
    }
  }, [filter.isApprove]);

  const { data, ...rest } = useGetAllPostQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
      isApprove: isApproveValue,
    },
  });

  React.useEffect(() => {
    if (!data?.posts) return;

    if (data?.posts.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.posts, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: PostManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  return {
    data,
    postList: data?.posts ?? [],
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
