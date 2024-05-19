import React from 'react';

import { useGetAllOrdersQuery } from '@/api/order/queries';
import { type OrderManagementFilterType } from '@/modules/OrderManagementPage/types/schema';

import { useAuth } from '../useAuth';
import usePaging from '../usePaging';

export const useGetAllOrder = (limit = 10) => {
  const { isLoggedIn } = useAuth();
  const { paging, filter, onPageChange, handleFilterChange, onTotalItemsChange } = usePaging<OrderManagementFilterType>(
    limit,
    {
      search: '',
      status: '',
    }
  );

  const { data, ...rest } = useGetAllOrdersQuery({
    variables: {
      limit: paging.limit,
      page: paging.page,
      search: filter.search,
      status: filter.status,
    },
    enabled: !!isLoggedIn,
  });

  React.useEffect(() => {
    if (!data?.orders) return;

    if (data?.orders.length === 0 && paging.page > 1) {
      onPageChange(paging.page - 1);
    } else {
      onTotalItemsChange(data?.meta.totalItems ?? 0);
    }
  }, [data?.meta.totalItems, data?.orders, onPageChange, onTotalItemsChange, paging.page]);

  const handleSearchChange = (values: OrderManagementFilterType) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
      handleFilterChange(key, values[key]);
    });
    onPageChange(1);
  };

  const totalPriceList = React.useMemo(() => {
    if (!data) return [];

    return data?.orders?.map((item) => {
      const priceOrigin = item?.products?.reduce((acc, book) => {
        const bookPrice =
          Number(book.product_unit_price) - (Number(book.product_unit_price) * Number(book.discount)) / 100;
        return acc + bookPrice * Number(book.product_quantity);
      }, 0);

      return {
        id: item?.id,
        price: priceOrigin,
      };
    });
  }, [data]);

  return {
    paging,
    filter,
    onTotalItemsChange,
    handleSearchChange,
    handleFilterChange,
    onPageChange,
    data: data?.orders ?? [],
    meta: data?.meta,
    totalPriceList,
    ...rest,
  };
};
