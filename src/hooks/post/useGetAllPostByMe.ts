import React from 'react';

import { useGetAllPostByMeQuery } from '@/api/post/queries';
import { type PostManagementFilterType } from '@/modules/PostManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllPostByMe = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<PostManagementFilterType>(
    limit,
    {
      search: '',
      isApprove: '',
    }
  );

  const { data, ...rest } = useGetAllPostByMeQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
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
