import React from 'react';

import { useGetAllProductQuery } from '@/api/product/queries';
import { type BookManagementFilterType } from '@/modules/BookManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllBook = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<BookManagementFilterType>(
    limit,
    {
      search: '',
      maxRating: '',
      minRating: '',
      maxPrice: '',
      minPrice: '',
      publisherId: '',
      authorId: '',
      categoryId: '',
    }
  );

  const { data, ...rest } = useGetAllProductQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
      maxRating: !filter.maxRating ? undefined : +filter.maxRating,
      minRating: !filter.minRating ? undefined : +filter.minRating,
      maxPrice: !filter.maxPrice ? undefined : +filter.maxPrice,
      minPrice: !filter.minPrice ? undefined : +filter.minPrice,
      publisherId: !filter.publisherId ? undefined : +filter.publisherId,
      authorId: !filter.authorId ? undefined : +filter.authorId,
      categoryId: !filter.categoryId ? undefined : +filter.categoryId,
    },
  });

  React.useEffect(() => {
    if (!data?.products) return;

    if (data?.products.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.products, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: BookManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  return {
    data,
    productList: data?.products ?? [],
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
