import React from 'react';

import { useGetMonthlyReportQuery } from '@/api/order/queries';
import usePaging from '@/hooks/usePaging';
import { type CategoryManagementFilterType } from '@/modules/CategoryManagementPage/types/schema';

export const useGetMonthlyReport = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<any>(limit, {});

  const { data, ...rest } = useGetMonthlyReportQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
    },
  });

  React.useEffect(() => {
    if (!data?.data) return;

    if (data?.data.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.data, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: CategoryManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  const totalRevenue = React.useMemo(() => {
    return data?.data.reduce((acc, item) => {
      return acc + Number(item.totalRevenue);
    }, 0);
  }, [data?.data]);

  return {
    data,
    monthlyList: data?.data ?? [],
    meta: data?.meta,
    paging,
    onTotalItemsChange,
    onPageChange,
    handleFilterChange,
    handleSearchChange,
    filter,
    totalRevenue,
    ...rest,
  };
};