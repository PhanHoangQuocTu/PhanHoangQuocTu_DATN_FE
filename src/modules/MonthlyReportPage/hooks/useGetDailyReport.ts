import React from 'react';

import { useGetDailyReportQuery } from '@/api/order/queries';
import usePaging from '@/hooks/usePaging';
import { type CategoryManagementFilterType } from '@/modules/CategoryManagementPage/types/schema';
import { type IChartData } from '@/modules/DashboardPage/components/AreaChartComp';

export const useGetDailyReport = (limit = 10) => {
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<any>(limit, {});

  const { data, ...rest } = useGetDailyReportQuery();

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

  const chartData = React.useMemo(() => {
    if (!data) return [];

    return data?.data?.map((item) => {
      return {
        date: item?.date,
        value: Number(item?.totalRevenue),
      } as IChartData;
    });
  }, [data]);

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
    chartData,
    ...rest,
  };
};
