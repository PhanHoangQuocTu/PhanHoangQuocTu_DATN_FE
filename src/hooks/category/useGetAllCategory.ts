import React from 'react';

import { useGetAllCategoryQuery } from '@/api/category/queries';
import { type CategoryManagementFilterType } from '@/modules/CategoryManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllCategory = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } =
    usePaging<CategoryManagementFilterType>(limit, {
      search: '',
    });

  const { data, ...rest } = useGetAllCategoryQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
    },
  });

  React.useEffect(() => {
    if (!data?.categories) return;

    if (data?.categories.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.categories, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: CategoryManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  return {
    data,
    categoryList: data?.categories ?? [],
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
