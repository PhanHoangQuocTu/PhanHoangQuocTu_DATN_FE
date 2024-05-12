import React from 'react';

import { useGetAllPublisherQuery } from '@/api/publisher/queries';
import { type PublisherManagementFilterType } from '@/modules/PublisherManagementPage/types/schema';

import usePaging from '../usePaging';

export const useGetAllPublisher = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } =
    usePaging<PublisherManagementFilterType>(limit, {
      search: '',
    });

  const { data, ...rest } = useGetAllPublisherQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
    },
  });

  React.useEffect(() => {
    if (!data?.publishers) return;

    if (data?.publishers.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.publishers, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: PublisherManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  return {
    data,
    publisherList: data?.publishers ?? [],
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
