import React from 'react';

import { useGetAllAuthorQuery } from '@/api/author/queries';
import { type AuthorManagementFilterType } from '@/modules/AuthorManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllAuthor = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } =
    usePaging<AuthorManagementFilterType>(limit, {
      search: '',
    });

  const { data, ...rest } = useGetAllAuthorQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
    },
  });

  React.useEffect(() => {
    if (!data?.authors) return;

    if (data?.authors.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.authors, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: AuthorManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  return {
    data,
    authorList: data?.authors ?? [],
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
